<script setup lang="ts">
import { MatchParticipant } from '~/types/match'

const { days, refresh } = await useSchedule()

onMounted(() => {
  setInterval(() => {
    refresh()
  }, 1000 * 60 * 10) // 10 minutes
})

const day = computed(() => {
  return days.value[1]
})

const teams = computed(() => {
  return day.value.matches.reduce<MatchParticipant[]>((list, match) => {
    return [
        ...list,
        match.home,
        ...(match.away ? [match.away] : [])
    ]
  }, [])
})
console.log(teams.value)
</script>

<template>
  <main>

  </main>
</template>