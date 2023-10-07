import { getProgram } from '~/server/client'
import { addMinutes, differenceInDays, differenceInMinutes, isSameDay, nextSunday } from 'date-fns'
import { Match } from '~/types/match'
import { DressingRoom, getDressingRooms } from '~/server/client/dressingRooms'
import { getTeams } from '~/server/client/teams'
import { getDurationByTeamName } from '~/server/data/ageCategoryDurations'

const filterMatchesByDate = (date: string, matches: Match[]) => {

    return matches.filter(item => isSameDay(new Date(item.startsAt), new Date(date)))
}

const matchRooms = [{
    from: '09:30',
    till: '11:00', // 70 minutes + 20 minutes
    teams: [{
        name: 'JO11'
    }]

}]

export type MatchRoom = DressingRoom & {
    from?: Date;
    till?: Date;
    teams: { name: string }[];
}

type Team = {
    name: string;
    isYouth: boolean;
    isFemale: boolean;
    isHome: boolean;
    startTime: Date;
    endTime: Date;
}

type CategoryInfo = {
    isFemale: boolean;
    isYouth: boolean
}

const nameToCategoryInfo = (name: string): CategoryInfo => {
    const teamName = name.replace('Rijp (de) ', '')
    const isFemale = teamName.startsWith('MO') || teamName.startsWith('VR')
    const isYouth = teamName.startsWith('MO') || teamName.startsWith('JO')

    return { isFemale, isYouth }
}


const assignRooms = (matches: Match[], dressingRooms: DressingRoom[]) => {

    const teams = matches.reduce<Team[]>((list, match) => {
        const categoryInfo = nameToCategoryInfo(match.home.name)
        const duration = getDurationByTeamName(match.home.name)

        const startTime = addMinutes(match.startsAt, -duration.roomMinutesBeforeMatch)
        const endTime = addMinutes(match.startsAt, duration.minutesTotal + 30)

        return [
            ...list,
            {
                name: match.home.name,
                ...categoryInfo,
                isHome: true,
                startTime,
                endTime
            },
            {
                name: match?.away?.name || 'unknown',
                ...categoryInfo,
                isHome: false,
                startTime,
                endTime
            }
        ]
    }, [])

    teams.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())

    const roomAssignments = new Map<string, Team[]>()

    return teams.map(team => {
        const assignedRoom = dressingRooms.find(room => {
            const assignment = roomAssignments.get(room.name)

            // No teams in this room. Assign it
            if (!assignment?.length) {
                roomAssignments.set(room.name, [team])
                return true
            }

            // Either 2 youth teams or 1 adult team are allowed in one room
            const isOccupied = assignment[1] || !assignment[0].isYouth
            if (isOccupied) {
                return false
            }

            // Youth teams can share a room
            const bothYouth = team.isYouth && assignment[0].isYouth
            const bothFemale = team.isFemale && assignment[0].isFemale
            const bothMale = !team.isFemale && !assignment[0].isFemale
            const sameSex = bothFemale || bothMale

            const bothHome = team.isHome && assignment[0].isHome
            const bothAway = !team.isHome && !assignment[0].isHome
            const notOpponents = bothHome || bothAway

// console.log(team.name, assignment[0].name,  { bothMale, bothYouth, bothFemale })
            if (bothYouth && sameSex && notOpponents) {
                assignment.push(team)
                return true
            }
        })

        if(!assignedRoom) {
            return team
        }

        return {
            ...team,
            room: {
                number: assignedRoom.number,
                name: assignedRoom.name
            }
        }

    })



    const assignments = []
    for (let [roomName, teams] of roomAssignments) {
        assignments.push({
            ...teams[0],
            room: roomName
        })
        if(teams[1]) {
            assignments.push({
                ...teams[1],
                room: roomName
            })
        }
    }

    return assignments

}

export default defineEventHandler(async (event) => {

    const { date } = getQuery<{
        date?: string
    }>(event)

    const now = new Date()
    const tillDate = date ? new Date(date) : nextSunday(new Date())

    const list = await getProgram({
        days: differenceInDays(tillDate, now) + 1, // Increment by one, because we also include "less than full days"
        away: false
    })

    const matches = date ? filterMatchesByDate(date, list) : list

    const dressingRooms = await getDressingRooms()
    const teams = await getTeams()

    return {
        matches: assignRooms(matches, dressingRooms)
    }
})