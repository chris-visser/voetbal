<script setup lang="ts">
import { getDay } from 'date-fns'
import { Match } from '~/types/match'
import BallSponsor from '~/components/BallSponsor.vue'

const { data: program, refresh } = await useFetch<{ matches: Match[] }>('/api/program', {
  query: {
    days: 6,
    away: false
  }
})

onMounted(() => {
  setInterval(() => {
    refresh()
  }, 1000 * 60 * 10) // 10 minutes
})

type MatchDay = {
  matches: Match[];
  day: number;
  date: Date;
}

const days = computed(() => {
  if (!program.value?.matches) {
    return []
  }

  return program.value?.matches?.reduce<MatchDay[]>((list, match) => {
    const date = new Date(match.startsAt)
    const day = getDay(date)

    const dayIndex = list.findIndex((item) => item.day === day)

    if (dayIndex === -1) {
      return [
        ...list,
        {
          day,
          date,
          matches: [{
            ...match,
            startsAt: date
          }]
        }
      ]
    }

    list[dayIndex].matches.push({
      ...match,
      startsAt: date
    })

    return list
  }, [])
})

const sponsorLeft = computed(() => {
  if(!days.value[1]?.matches?.length) {
    return false
  }
  return days.value[0]?.matches.length < days.value[1]?.matches.length
})

</script>

<template>
  <main
      class="relative flex flex-wrap justify-between items-start w-full p-8 max-h-screen max-w-screen overflow-hidden">
    <div>
      <PlayDay
          :date="days[0].date"
          :matches="days[0].matches"
      />
      <BallSponsor v-if="sponsorLeft" />
    </div>

    <div class="max-w-1/3">
      <PlayDay
          v-if="days[1]"
          :date="days[1].date"
          :matches="days[1].matches"
      />
      <BallSponsor v-if="!sponsorLeft" />
    </div>
  </main>
</template>