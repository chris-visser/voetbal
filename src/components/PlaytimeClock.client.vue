<script setup lang="ts">
import { formatDate } from '~/helpers/formatDate'

const now = ref(new Date())

onMounted(async () => {
  await nextTick()
  setInterval(() => now.value = new Date(), 1000)
})
</script>

<template>
  <time :datetime="now.toLocaleString()">
    {{ formatDate(now, 'HH:mm:ss') }}
  </time>
</template>
