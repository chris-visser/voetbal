export type MatchParticipant = {
    name: string;
    room: string | null;
}

export type MatchType = 'practice' | 'competition' | 'cup' | 'tournament' | 'other'

export type Match = {
    code: number;
    startsAt: Date;
    field: string
    accomodation: string
    location: string
    home: MatchParticipant & { clubCode: string };
    away: MatchParticipant & { clubCode: string };
    referee: MatchParticipant | null;
    type: MatchType
}