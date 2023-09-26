export type MatchParticipant = {
    name: string;
    room?: string;
}

export type MatchTeam = MatchParticipant & {
    teamId?: number;
    clubCode?: string;
}

export type EventType = 'practice' | 'training' | 'competition' | 'cup' | 'tournament' | 'other'

export type Duration = {
    minutesTotal: number
    minutesRest: number
}

export type Match = {
    code?: number;
    startsAt: Date;
    field?: string;
    duration: Duration;
    accomodation?: string;
    location?: string;
    isHome?: boolean;
    home: MatchTeam;
    away?: MatchTeam;
    participants?: MatchTeam[];
    referee?: MatchParticipant;
    type: EventType;
}