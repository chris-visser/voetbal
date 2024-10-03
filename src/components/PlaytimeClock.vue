<script setup lang="ts">
import { formatDate } from '~/helpers/formatDate'

const now = ref(new Date())

onMounted(() => {
  setInterval(() => now.value = new Date(), 1000)
})
</script>

<template>
  {{ formatDate(now, 'HH:mm:ss') }}
</template>
