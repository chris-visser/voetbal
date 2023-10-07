export type DressingRoomSide = {
    label: 'L' | 'R';
    description: string;
}

export type DressingRoom = {
    number: number;
    name: string
    avoid: number[];
    // sides: DressingRoomSide[];
}

const sides: DressingRoomSide[] = [{
    label: 'L',
    description: 'Links'
}, {
    label: 'R',
    description: 'Rechts'
}]

export const getDressingRooms = (): Promise<DressingRoom[]> => (
    Promise.resolve([{
        number: 1,
        name: 'Wapen van Munster',
        avoid: [2, 8],
        // sides: sides
    }, {
        number: 2,
        name: 'Oudejans',
        avoid: [1, 3, 7, 8],
        // sides
    }, {
        number: 3,
        name: 'LWM-Ned',
        avoid: [2, 4, 6, 7, 8],
        // sides
    }, {
        number: 4,
        name: 'Medec',
        avoid: [3, 5, 6, 7],
        // sides
    }, {
        number: 5,
        name: 'ING',
        avoid: [4, 6],
        // sides
    }, {
        number: 6,
        name: 'Davibouw',
        avoid: [3, 4, 5, 7],
        // sides
    }, {
        number: 7,
        name: 'Dekker BV',
        avoid: [2, 3, 4, 8, 6],
        // sides
    }, {
        number: 8,
        name: 'Dijkstra Kolbe',
        avoid: [1, 2, 3, 7],
        // sides
    }])
)