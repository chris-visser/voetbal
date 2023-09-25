<script setup lang="ts">
const { startsAt } = defineProps<{
  startsAt: Date
}>()
import { differenceInSeconds, addSeconds } from 'date-fns'

// const now = (incrementSeconds: number = 0) => addSeconds(new Date('2023-09-30T11:50:45'), incrementSeconds)
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

    const totalSeconds = differenceInSeconds(now(), startsAt)

    // Match finished. Stop counter, but do flash time red for 6 minutes to indicate potential extra time
    if(totalSeconds > (90 + 15) * 60) { // 90 minutes playtime + 15 minutes break
      animate.value = 'flash'
      livestamp.value = '90:00'

      // Taking into account regular playtime, 15 minutes halftime and 6 minutes  extra time.
      // Mark game as finished after 111 minutes
      if(totalSeconds > (90 + 15 + 6) * 60) {
        animate.value = ''
        livestamp.value = 'klaar'
        clearInterval(intervalRef.value)
        return
      }
      return
    }

    const minutes = Math.floor(totalSeconds / 60)

    // Do not increment counter during halftime
    if(minutes > 45 && minutes < 60) {
      livestamp.value = 'rust'
      return
    }

    const seconds = totalSeconds % 60

    // We want 'actual' minutes played, remove 15 minutes halftime
    if(minutes > 60) {
      livestamp.value = `${doubleDigit(minutes - 15)}:${doubleDigit(seconds)}`
      return
    }

    livestamp.value = `${doubleDigit(minutes)}:${doubleDigit(seconds)}`
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