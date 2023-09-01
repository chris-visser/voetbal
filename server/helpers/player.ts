import { type RawPlayer } from './client';

export type Player = {
    relationCode: string;
    name: string;
    gender: string;
    group: string;
    role: string;
}

export const sanitizePlayers = (players: RawPlayer[]): Player[] => players
    .filter(
        player => [
            player.naam !== 'Afgeschermd'
        ].every(Boolean),
    ).map(normalizePlayer)

export const normalizePlayer = (player: RawPlayer): Player => ({
    relationCode: player.relatiecode,
    name: player.naam,
    gender: player.geslacht,
    group: player.rol,
    role: player.functie
})