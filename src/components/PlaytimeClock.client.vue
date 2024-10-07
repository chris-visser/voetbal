<script setup lang="ts">
import { formatDate } from '~/helpers/formatDate'

const now = ref(new Date())

onMounted(async () => {
  await nextTick()
  setInterval(() => now.value = new Date(), 1000)
})
</script>

<template>
  <time
    :datetime="now.toLocaleString()"
    class="text-shadow w-32 text-white font-bold flex justify-center items-center flex-col text-5xl"
  >
    <slot />
    {{ formatDate(now, 'HH:mm:ss') }}
  </time>
</template>

<style scoped>
.text-shadow {
  text-shadow: 1px 1px 2px black;
}
</style>
