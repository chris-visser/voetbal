import type { Duration } from '~/types/match'

type AgeCategoryDurations = {
  category: string
  roomMinutesBeforeMatch: number // Number of minutes team is expected to use dressing room before the match
} & Duration

export const ageCategoryMatchDurations: AgeCategoryDurations[] = [
  { category: 'JO6', minutesTotal: 40, minutesRest: 0, roomMinutesBeforeMatch: 60 },
  { category: 'JO7', minutesTotal: 40, minutesRest: 0, roomMinutesBeforeMatch: 60 },
  { category: 'JO8', minutesTotal: 40, minutesRest: 10, roomMinutesBeforeMatch: 60 },
  { category: 'MO8', minutesTotal: 40, minutesRest: 10, roomMinutesBeforeMatch: 60 },
  { category: 'JO9', minutesTotal: 40, minutesRest: 10, roomMinutesBeforeMatch: 60 },
  { category: 'MO9', minutesTotal: 40, minutesRest: 10, roomMinutesBeforeMatch: 60 },
  { category: 'JO10', minutesTotal: 60, minutesRest: 10, roomMinutesBeforeMatch: 60 },
  { category: 'MO10', minutesTotal: 60, minutesRest: 10, roomMinutesBeforeMatch: 60 },
  { category: 'JO11', minutesTotal: 70, minutesRest: 10, roomMinutesBeforeMatch: 60 },
  { category: 'MO11', minutesTotal: 70, minutesRest: 10, roomMinutesBeforeMatch: 60 },
  { category: 'JO12', minutesTotal: 70, minutesRest: 10, roomMinutesBeforeMatch: 60 },
  { category: 'MO12', minutesTotal: 70, minutesRest: 10, roomMinutesBeforeMatch: 60 },
  { category: 'JO13', minutesTotal: 75, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'MO13', minutesTotal: 75, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'JO14', minutesTotal: 85, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'MO14', minutesTotal: 85, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'JO15', minutesTotal: 85, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'MO15', minutesTotal: 85, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'MO15', minutesTotal: 85, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'JO16', minutesTotal: 95, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'MO16', minutesTotal: 95, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'JO17', minutesTotal: 95, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'MO17', minutesTotal: 95, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'JO18', minutesTotal: 105, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'MO18', minutesTotal: 105, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'JO19', minutesTotal: 105, minutesRest: 15, roomMinutesBeforeMatch: 60 },
  { category: 'MO19', minutesTotal: 105, minutesRest: 15, roomMinutesBeforeMatch: 60 },
]

export const getDurationByTeamName = (teamName: string): AgeCategoryDurations => {
  const duration = ageCategoryMatchDurations.find(item => (
    teamName.includes(item.category)
  ))

  if (!duration) {
    return { category: 'default', minutesTotal: 105, minutesRest: 15, roomMinutesBeforeMatch: 60 }
  }

  return duration
}
