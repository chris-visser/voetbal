import { Match, MatchType } from "~/types/match"
import { splFetch } from "./fetch"

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

const matchTypeMap: Record<string, MatchType> = {
     'competitie': 'competition',
     'beker': 'cup',
     'oefen': 'practice',
     'toernooi': 'tournament',
     'overig': 'other'
}

type RawMatchType = keyof typeof matchTypeMap

const normalizeMatchType = (type: RawMatchType): MatchType => {
     return matchTypeMap[type.toLowerCase()] || 'other'
}

// SV de Rijp
const clubCode = 'BBFW72Z'

export const getProgram = async (): Promise<Match[]> => {
     const result = await splFetch<RawMatch[]>('/programma', {
          query: {
               aantaldagen: '7',
               spelsoort: 've' // ve = veld, za = zaal, re = regulier
          }
     })

     if(!result?.length) {
          return []
     }

     return result.map((item) => ({
          code: item.wedstrijdcode,
          startsAt: new Date(item.wedstrijddatum),
          type: normalizeMatchType(item.competitiesoort),
          field: item.veld,
          accomodation: item.accommodatie,
          location: item.plaats,
          home: {
               clubCode: item.thuisteamclubrelatiecode,
               name: item.thuisteam,
               room: item.kleedkamerthuisteam || null,
          },
          away: {
                // Away relation code can be empty for practice matches
               clubCode: item.uitteamclubrelatiecode || item.thuisteamclubrelatiecode,
               name: item.uitteam,
               room: item.kleedkameruitteam || null,
          },
          referee: (item.scheidsrechter ? {
               name: item.scheidsrechter,
               room: item.kleedkamerscheidsrechter || null,
          } : null)
     })).filter((match) => match.home.clubCode === clubCode)
}