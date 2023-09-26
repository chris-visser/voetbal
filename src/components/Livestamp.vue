<script setup lang="ts">
// import { addSeconds } from 'date-fns'
import { Duration } from '~/types/match'

const { startsAt, duration } = defineProps<{
  duration: Duration
  startsAt: Date
}>()
import { differenceInSeconds } from 'date-fns'

// const now = (incrementSeconds: number = 0) => addSeconds(new Date('2023-09-30T11:55:45'), incrementSeconds)
const now = () => new Date()

const livestamp = ref('--:--')
const animate = ref('')
const intervalRef = ref()

const doubleDigit = (value: number) => value < 10 ? `0${value}` : value

let count = 0

onMounted(() => {
  if(!startsAt) {
    console.error('Crash prevented. Livestamp required on Livestamp component')
    return
  }

  intervalRef.value = setInterval(() => {
    // Match not yet started
    if(startsAt > now()) {
      return
    }

    const totalSecondsPlayed = differenceInSeconds(now(), startsAt)
    const minutesPlaytime = duration.minutesTotal - duration.minutesRest
// count++
    // Match finished. Stop counter, but do flash time red for 6 minutes to indicate potential extra time
    if(totalSecondsPlayed > duration.minutesTotal * 60) { // 90 minutes playtime + 15 minutes break
      animate.value = 'flash'
      livestamp.value = `${minutesPlaytime}:00`

      // Taking into account total time, + 6 minutes potential extra time.
      // After that mark game as finished. 6 minutes extra time is an estimation. It's not the end of the world
      // if the screen gives inaccurate timing for a few minutes since the match
      // is about to finish anyway and its not live TV
      if(totalSecondsPlayed > (duration.minutesTotal + 6) * 60) {
        animate.value = ''
        livestamp.value = 'klaar'
        clearInterval(intervalRef.value)
        return
      }
      return
    }

    const minutesPlayed = Math.floor(totalSecondsPlayed / 60)

    const minutesToHalfTime = minutesPlaytime / 2

    // Do not increment counter during halftime
    const minutesHalfTimeFinished = minutesToHalfTime + duration.minutesRest
    if(minutesPlayed > minutesToHalfTime && minutesPlayed < minutesHalfTimeFinished) {
      livestamp.value = 'rust'
      return
    }

    const seconds = totalSecondsPlayed % 60

    // We want 'actual' minutes played, remove halftime minutes
    if(minutesPlayed > minutesHalfTimeFinished) {
      livestamp.value = `${doubleDigit(minutesPlayed - duration.minutesRest)}:${doubleDigit(seconds)}`
      return
    }

    livestamp.value = `${doubleDigit(minutesPlayed)}:${doubleDigit(seconds)}`
  }, 1000)
})

</script>

<template>
  <span :class="animate">
    {{ livestamp }}
  </span>
</template>

<style lang="postcss" scoped>
@keyframes color_change {
  from { @apply text-black }
  to { @apply text-primary }
}

.flash {
  animation: color_change 1s infinite alternate
}
</style>