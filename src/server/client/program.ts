import { eachDayOfInterval, isTuesday, isThursday } from 'date-fns'
import { Match, EventType } from '~/types/match'
import { splFetch } from './fetch'

// SV de Rijp
const clubCode = 'BBFW72Z'

export type RawMatch = {
     wedstrijddatum: string;
     wedstrijdcode: number;
     wedstrijdnummer: number;
     teamnaam: string;
     thuisteamclubrelatiecode: string;
     uitteamclubrelatiecode: string;
     thuisteamid: number;
     thuisteam: string;
     uitteamid: number;
     uitteam: string;
     teamvolgorde: number;
     competitiesoort: string;
     competitie: string;
     klasse: string;
     poule: string;
     klassepoule: string;
     kaledatum: string;
     datum: string;
     vertrektijd: string;
     verzameltijd: string;
     aanvangstijd: string;
     wedstrijd: string;
     status: string;
     scheidsrechters: string;
     scheidsrechter: string;
     accommodatie: string;
     veld: string;
     locatie: string;
     plaats: string;
     rijders: string;
     kleedkamerthuisteam: string;
     kleedkameruitteam: string;
     kleedkamerscheidsrechter: string;
     meer: string;
}

const matchTypeMap: Record<string, EventType> = {
     'regulier': 'competition',
     'beker': 'cup',
     'oefen': 'practice',
     'toernooi': 'tournament',
     'training': 'training',
     'overig': 'other'
}

type RawMatchType = keyof typeof matchTypeMap

const normalizeMatchType = (type: RawMatchType): EventType => {
     return matchTypeMap[type.toLowerCase()] || 'other'
}

export type GetProgramParams = {
     days?: number;
     teamCode?: number;
     home?: boolean;
     away?: boolean
}

export const getProgram = async ({
     days = 7,
     teamCode,
     home = true,
     away = true
}: GetProgramParams = {}): Promise<Match[]> => {
     const query = {
          ...(days ? { aantaldagen: `${days}` } : {}),
          ...(teamCode ? { teamcode: `${teamCode}` } : {}),
          ...(home ? { thuis: 'JA' } : {}),
          ...(away ? { uit: 'JA' } : {})
          // spelsoort: 've' // ve = veld, za = zaal, re = regulier  
     }

     const result = await splFetch<RawMatch[]>('/programma', {
          query
     })

     if (!result?.length) {
          return []
     }

     const matches = result.map((item) => ({
          code: item.wedstrijdcode,
          startsAt: new Date(item.wedstrijddatum),
          type: normalizeMatchType(item.competitiesoort),
          field: item.veld,
          accomodation: item.accommodatie,
          location: item.plaats,
          isNextMatch: false,
          isHome: item.thuisteamclubrelatiecode === clubCode,
          home: {
               teamId: item.thuisteamid,
               clubCode: item.thuisteamclubrelatiecode,
               name: item.thuisteam,
               room: item.kleedkamerthuisteam || undefined,
          },
          away: {
               // Away relation code can be empty for practice matches
               teamId: item.uitteamid || undefined,
               clubCode: item.uitteamclubrelatiecode || item.thuisteamclubrelatiecode,
               name: item.uitteam,
               room: item.kleedkameruitteam || undefined,
          },
          referee: (item.scheidsrechter ? {
               name: item.scheidsrechter,
               room: item.kleedkamerscheidsrechter || undefined,
          } : undefined)
     }))

     return matches
}

export type GetProgramsParams = Omit<GetProgramParams, 'teamCode'> & {
     teamCodes?: number[];
}

const getPracticeEvents = (from: Date, till: Date) => {
     // Create an array of all dates within the specified interval
     const allDates = eachDayOfInterval({ start: from, end: till });

     // Filter the dates to keep only Tuesdays and Thursdays
     return allDates.filter((date) => isTuesday(date) || isThursday(date));
}

export const getPrograms = async ({
     days = 7,
     teamCodes = [],
     home = true,
     away = true
}: GetProgramsParams = {}): Promise<Match[]> => {
     const practiceEvents = getPracticeEvents(new Date(), new Date('2024-06-01'))
     const programs = await Promise.all(teamCodes.map((teamCode) => (
          getProgram({ days, teamCode, home, away })
     )))

     programs[programs.length] = practiceEvents.map((date) => {
          date.setTime(date.getTime() + 20 * 60 * 60 * 1000)
          return {
               startsAt: date,
               type: 'training',
               home: {
                    name: 'Selectie',
               }
          }
     })

     const list: Match[] = []

     // Flatten the programs
     for (let i = 0; i < programs.length; i++) {
          const program = programs[i]
          // Practice matches can have the same code
          // so we need to check if the code is already in the list
          // and only include it if it's not
          for (let j = 0; j < program.length; j++) {
               const event = program[j]

               // if (!list.find((item) => item.startsAt === item.startsAt && item.home.name === event.home.name)) {
                    list.push(event)
               // }
          }
     }

     return list.sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime())

}