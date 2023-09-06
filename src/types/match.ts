export type MatchParticipant = {
    name: string;
    room?: string;
}

export type MatchTeam = MatchParticipant & {
    teamId?: number;
    clubCode?: string;
}

export type EventType = 'practice' | 'training' | 'competition' | 'cup' | 'tournament' | 'other'

export type Match = {
    code?: number;
    startsAt: Date;
    field?: string;
    accomodation?: string;
    location?: string;
    isHome?: boolean;
    home: MatchTeam;
    away?: MatchTeam;
    referee?: MatchParticipant;
    type: EventType;
}