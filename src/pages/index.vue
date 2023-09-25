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

const compactScreen = computed(() => {
  if (days.value[0].matches.length > 9) {
    return days.value[0].matches
  }
})

// const sponsorLeft = computed(() => {
//   if(!days.value[1]?.matches?.length) {
//     return false
//   }
//   return days.value[0]?.matches.length < days.value[1]?.matches.length
// })

</script>

<template>
  <main
      class="relative flex flex-wrap justify-between items-start w-full p-8 h-screen max-w-screen overflow-hidden">
    <div class="h-full flex flex-col justify-between">
      <PlayDayCompact
          v-if="compactScreen"
          :date="days[0].date"
          :matches="days[0].matches"
      />
      <PlayDay
          v-else
          :date="days[0].date"
          :matches="days[0].matches"
      />
      <!--      <BallSponsor v-if="sponsorLeft" />-->

      <ul class="flex flex-1 content-center items-end gap-8 justify-between self-end w-full">
        <li class="bg-white rounded-lg h-[120px] py-8 flex-1 max-w-[300px] flex items-center justify-center">
          <img src="/sponsors/plus.png" alt="Logo co-hoofdsponsor Plus Supermarkt" class="w-[70%]"/>
        </li>
        <li class="text-4xl text-shadow h-[120px] text-white font-bold flex justify-center items-center flex-col">
          <Icon name="ic:baseline-access-time" size="60" />
          <Clock />
        </li>
        <li class="bg-white rounded-lg h-[120px] py-8 flex-1 max-w-[300px] flex items-center justify-center">
          <img src="/sponsors/ranko.png" alt="Logo co-hoofdsponsor Ranko" class="w-[70%]"/>
        </li>
      </ul>
    </div>

    <div class="h-full flex flex-col justify-center">
      <img src="https://data.sportlink.com/clublogo?client_id=1VZsDN7ueJ"
           :alt="`Clublogo van SV de Rijp`" class="w-42 relative -top-[20%]"/>
    </div>

    <div class="max-w-1/3 h-full">
      <!--      <PlayDay-->
      <!--          v-if="days[1]"-->
      <!--          :date="days[1].date"-->
      <!--          :matches="days[1].matches"-->
      <!--      />-->
      <BallSponsor class="h-full"/>
    </div>
  </main>
</template>

<style lang="postcss" scoped>
.text-shadow {
  text-shadow: 1px 1px 2px black;
}
</style>