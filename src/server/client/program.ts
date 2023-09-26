// import { eachDayOfInterval, isTuesday, isThursday, setHours } from 'date-fns'
import { utcToZonedTime, format } from 'date-fns-tz'
import { Match, EventType, Duration } from '~/types/match'
import { splFetch } from './fetch'

// SV de Rijp
const clubCode = 'BBFW72Z'
const clubName = 'Rijp (de)'

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


type AgeCategoryTimes = {
     category: string;
} & Duration

const ageCategoriesTimes: AgeCategoryTimes[] = [
     { category: 'JO6', minutesTotal: 40, minutesRest: 0 },
     { category: 'JO7', minutesTotal: 40, minutesRest: 0 },
     { category: 'JO8', minutesTotal: 40, minutesRest: 10 },
     { category: 'MO8', minutesTotal: 40, minutesRest: 10 },
     { category: 'JO9', minutesTotal: 40, minutesRest: 10 },
     { category: 'MO9', minutesTotal: 40, minutesRest: 10 },
     { category: 'JO10', minutesTotal: 60, minutesRest: 10 },
     { category: 'MO10', minutesTotal: 60, minutesRest: 10 },
     { category: 'JO11', minutesTotal: 70, minutesRest: 10 },
     { category: 'MO11', minutesTotal: 70, minutesRest: 10 },
     { category: 'JO12', minutesTotal: 70, minutesRest: 10 },
     { category: 'MO12', minutesTotal: 70, minutesRest: 10 },
     { category: 'JO13', minutesTotal: 75, minutesRest: 15 },
     { category: 'MO13', minutesTotal: 75, minutesRest: 15 },
     { category: 'JO14', minutesTotal: 85, minutesRest: 15 },
     { category: 'MO14', minutesTotal: 85, minutesRest: 15 },
     { category: 'JO15', minutesTotal: 85, minutesRest: 15 },
     { category: 'MO15', minutesTotal: 85, minutesRest: 15 },
     { category: 'JO16', minutesTotal: 95, minutesRest: 15 },
     { category: 'MO16', minutesTotal: 95, minutesRest: 15 },
     { category: 'JO17', minutesTotal: 95, minutesRest: 15 },
     { category: 'MO17', minutesTotal: 95, minutesRest: 15 },
     { category: 'JO18', minutesTotal: 105, minutesRest: 15 },
     { category: 'MO18', minutesTotal: 105, minutesRest: 15 },
     { category: 'JO19', minutesTotal: 105, minutesRest: 15 },
     { category: 'MO19', minutesTotal: 105, minutesRest: 15 }
];

const getDuration = (teamNameWithClubName: string): Duration => {
     const teamName = teamNameWithClubName
         .replace(`${clubName} `, '')
     const category = teamName.split('-')[0] || teamName

     const duration = ageCategoriesTimes.find(item => item.category === category)

     if(!duration) {
          return {
               minutesTotal: 105,
               minutesRest: 15
          }
     }
     return duration
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

const standardizeDressingRoom = (name: string | undefined): string | undefined => {
     return name?.split(' - ')[0] || undefined
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
          ...(home ? { thuis: 'JA' } : { thuis: 'NEE' }),
          ...(away ? { uit: 'JA' } : { uit: 'NEE' }),
          spelsoort: 've' // ve = veld, za = zaal, re = regulier  
     }

     const result = await splFetch<RawMatch[]>('/programma', {
          query
     })

     if (!result?.length) {
          return []
     }
     const now = new Date().getTime() - (1000 * 60 * 60 * 1.5)

     const matches = result.filter(item => new Date(item.wedstrijddatum).getTime() > now).map((item) => ({
          code: item.wedstrijdcode,
          startsAt: new Date(item.wedstrijddatum),
          type: normalizeMatchType(item.competitiesoort),
          field: item.veld,
          accomodation: item.accommodatie,
          location: item.plaats,
          isNextMatch: false,
          duration: getDuration(item.thuisteam),
          isHome: item.thuisteamclubrelatiecode === clubCode,
          home: {
               teamId: item.thuisteamid,
               clubCode: item.thuisteamclubrelatiecode,
               name: item.thuisteam,
               room: standardizeDressingRoom(item.kleedkamerthuisteam),
          },
          away: {
               // Away relation code can be empty for practice matches
               teamId: item.uitteamid || undefined,
               clubCode: item.uitteamclubrelatiecode || item.thuisteamclubrelatiecode,
               name: item.uitteam,
               room: standardizeDressingRoom(item.kleedkameruitteam),
          },
          referee: (item.scheidsrechter ? {
               name: item.scheidsrechter,
               room: standardizeDressingRoom(item.kleedkamerscheidsrechter),
          } : undefined)
     }))

     return matches
}

export type GetProgramsParams = Omit<GetProgramParams, 'teamCode'> & {
     teamCodes?: number[];
}

const fixTime = (date: Date) => {
     const targetTime = '20:00:00.000'
     const dutchTime = utcToZonedTime(date, "Europe/Amsterdam")
     const dateStr = format(dutchTime, 'yyyy-MM-dd')
     const targetDateTime = new Date(`${dateStr}T${targetTime}+02:00`)

     return targetDateTime
}

// const getPracticeEvents = (from: Date, till: Date) => {
//      // Create an array of all dates within the specified interval
//      const allDates = eachDayOfInterval({ start: from, end: till })
//
//      // Filter the dates to keep only Tuesdays and Thursdays
//      return allDates.filter((date) => isTuesday(date) || isThursday(date)).map(fixTime)
// }

// const freeDates = []
//
// const events = [{
//      startsAt: new Date('2023-10-21T00:00:00Z'),
//      endsAt: new Date('2023-10-22T00:00:00Z'),
//      time: undefined,
//      type: 'catchUpCup',
// },{
//      startsAt: new Date('2023-12-16T00:00:00Z'),
//      endsAt: new Date('2023-12-17T00:00:00Z'),
//      time: undefined,
//      type: 'catchUpCup',
// },{
//      startsAt: new Date('2023-12-23T00:00:00Z'),
//      endsAt: new Date('2023-12-24T00:00:00Z'),
//      time: undefined,
//      type: 'free',
// },{
//      startsAt: new Date('2023-12-30T00:00:00Z'),
//      endsAt: new Date('2024-01-05T00:00:00Z'),
//      time: undefined,
//      type: 'free',
// },{
//      startsAt: new Date('2024-01-06T00:00:00Z'),
//      endsAt: new Date('2024-01-07T00:00:00Z'),
//      time: undefined,
//      type: 'free',
// },{
//      startsAt: new Date('2024-01-13T00:00:00Z'),
//      endsAt: new Date('2024-01-14T00:00:00Z'),
//      time: undefined,
//      type: 'catchUpCup',
// },{
//      startsAt: new Date('2024-02-10T00:00:00Z'),
//      endsAt: new Date('2024-02-11T00:00:00Z'),
//      time: undefined,
//      type: 'catchUpCup',
// },{
//      startsAt: new Date('2024-02-17T00:00:00Z'),
//      endsAt: new Date('2024-02-18T00:00:00Z'),
//      time: undefined,
//      type: 'catchUpCup',
// },{
//      startsAt: new Date('2024-03-30T00:00:00Z'),
//      endsAt: new Date('2024-03-30T00:00:00Z'),
//      time: undefined,
//      type: 'catchUpCup',
// },{
//      startsAt: new Date('2024-04-01T00:00:00Z'),
//      endsAt: new Date('2024-04-01T00:00:00Z'),
//      time: undefined,
//      type: 'catchUpCup',
// },{
//      startsAt: new Date('2024-05-05T00:00:00Z'),
//      endsAt: new Date('2024-05-05T00:00:00Z'),
//      time: undefined,
//      type: 'catchUpCup',
// },{
//      startsAt: new Date('2024-06-01T00:00:00Z'),
//      endsAt: new Date('2024-06-02T00:00:00Z'),
//      time: undefined,
//      type: 'postCompetition',
// },{
//      startsAt: new Date('2024-06-08T00:00:00Z'),
//      endsAt: new Date('2024-06-09T00:00:00Z'),
//      time: undefined,
//      type: 'postCompetition',
// },{
//      startsAt: new Date('2024-06-15T00:00:00Z'),
//      endsAt: new Date('2024-06-16T00:00:00Z'),
//      time: undefined,
//      type: 'postCompetition',
// }]


export const getPrograms = async ({
     days = 7,
     teamCodes = [],
     home = true,
     away = true
}: GetProgramsParams = {}): Promise<Match[]> => {

     const from = fixTime(new Date())
     // const practiceEvents = getPracticeEvents(from, new Date('2024-06-01T00:00:00Z'))
     const programs = await Promise.all(teamCodes.map((teamCode) => (
          getProgram({ days, teamCode, home, away })
     )))

     // programs[programs.length] = practiceEvents.map((startsAt) => ({
     //      startsAt,
     //      type: 'training',
     //      home: {
     //           name: 'Selectie',
     //      }
     // }))

     // programs[programs.length] = events.map((event) => ({
     //      startsAt: event.startsAt,
     //      endsAt: event.endsAt,
     //      type: event.type,
     //      home: {
     //           name: 'Selectie'
     //      },
     //      participants: [],
     // }))

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