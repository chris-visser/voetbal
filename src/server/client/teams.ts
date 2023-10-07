import { splFetch } from '~/server/client/fetch'

type RawTeam = {
    teamcode: number;
    lokaleteamcode: number;
    poulecode: number;
    teamnaam: string;
    competitienaam: string;
    klasse: string;
    poule: string;
    klassepoule: string;
    spelsoort: string;
    competitiesoort: string;
    geslacht: string;
    teamsoort: string;
    leeftijdscategorie: string;
    kalespelsoort: string;
    speeldag: string;
    speeldagteam: string;
    more: string;
};

export type Team = {
    code: number;
    name: string;
    priority?: number;
    defaultRoom?: number;
    altRoom?: number;
    opponentRoom?: number;
}

const teamPriorities: Team[] = [
    {
        code: 123668,
        name: 'Zondag 1',
        priority: 1,
        defaultRoom: 1,
        altRoom: 2,
        opponentRoom: 5,
    },
    {
        code: 123683,
        name: 'Zondag 2',
        priority: 2,
        defaultRoom: 2,
        altRoom: 8,
        opponentRoom: 6
    },
    {
        code: 276482,
        name: 'Zaterdag 2',
        priority: 10,
        defaultRoom: 1,
        altRoom: 5
    },
    {
        code: 123688,
        name: 'Zondag 3',
        priority: 3
        // defaultRoom: 3,
        // altRoom: 4
    },
    {
        code: 123685,
        name: 'Zondag 4',
        priority: 4
    },
    {
        code: 379854,
        name: 'Vrijdag 35+1'
    },
    {
        code: 231030,
        name: 'Zondag 45+1',
        priority: 5
    },
    {
        code: 227585,
        name: 'Zondag 45+2',
        priority: 6
    },
    {
        code: 376320,
        name: 'JO18-1'
    },
    {
        code: 376321,
        name: 'JO18-2'
    },
    {
        code: 263213,
        name: 'JO15-1'
    },
    {
        code: 345534,
        name: 'JO14-1'
    },
    {
        code: 354632,
        name: 'JO14-2'
    },
    {
        code: 263217,
        name: 'JO13-1'
    },
    {
        code: 335251,
        name: 'JO12-1'
    },
    {
        code: 337739,
        name: 'JO12-2'
    },
    {
        code: 263221,
        name: 'JO11-1'
    },
    {
        code: 263222,
        name: 'JO11-2'
    },
    {
        code: 288440,
        name: 'JO10-1'
    },
    {
        code: 316823,
        name: 'JO10-2'
    },
    {
        code: 263225,
        name: 'JO9-1'
    },
    {
        code: 263226,
        name: 'JO9-2'
    },
    {
        code: 292973,
        name: 'JO8-1'
    },
    {
        code: 316821,
        name: 'JO8-2'
    },
    {
        code: 210253,
        name: 'VR1',
        priority: 7
    },
    {
        code: 251645,
        name: 'VR2',
        priority: 8
    },
    {
        code: 370287,
        name: 'VR30+1',
        priority: 9
    },
    {
        code: 263232,
        name: 'MO17-1 (9-tal)'
    },
    {
        code: 263233,
        name: 'MO15-1 (9-tal)'
    },
    {
        code: 263235,
        name: 'MO11-1'
    }
]

const createTeamName = (teamNameWithClubName: string, playDay: string) => {
    const teamName = teamNameWithClubName.replace('Rijp (de) ', '')
    if (!isNaN(parseInt(teamName))) {
        return `${playDay} ${teamName}`
    }
    return teamName
}

export const getTeams = async () => {
    // const result = await splFetch<RawTeam[]>('/teams', {
    //     query: {
    //         competitiesoort: 'regulier',
    //         spelsoort: 've'
    //     }
    // })
    return [...teamPriorities].sort((a, b) => {
        if (a.priority === undefined && b.priority === undefined) {
            return 0; // Leave undefined values where they are
        } else if (a.priority === undefined) {
            return 1; // Move undefined values to the end
        } else if (b.priority === undefined) {
            return -1; // Move undefined values to the end
        } else {
            return a.priority - b.priority; // Sort by priority in ascending order
        }
    });
}