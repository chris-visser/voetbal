import { getDay } from 'date-fns'
import type { Match, MatchDay } from '~/types/match'

export const useSchedule = async () => {
  const { data: program, refresh } = await useFetch<{ matches: Match[] }>('/api/program', {
    query: {
      days: 6,
      away: false,
    },
  })

  const days = computed(() => {
    if (!program.value?.matches) {
      return []
    }

    return program.value?.matches?.reduce<MatchDay[]>((list, match) => {
      const date = new Date(match.startsAt)
      const day = getDay(date)

      const dayIndex = list.findIndex(item => item.day === day)

      if (dayIndex === -1) {
        return [
          ...list,
          {
            day,
            date,
            matches: [{
              ...match,
              startsAt: date,
            }],
          },
        ]
      }

      list[dayIndex].matches.push({
        ...match,
        startsAt: date,
      })

      return list
    }, [])
  })

  return { days, refresh }
}
