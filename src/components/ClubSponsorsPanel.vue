<script setup lang="ts">
import { useConvexQuery } from '@convex-vue/core'
import { api } from '~~/convex/_generated/api'

const { data, suspense } = useConvexQuery(api.sponsors.get, {})
const sponsors = useSponsors()
watchEffect(() => {
  console.log(data.value)
})
await suspense()
</script>

<template>
  <PagePanel>
    <h2 class="font-bold text-3xl mb-8 text-center text-primary-400">
      Sponsors
    </h2>
    <ul class="grid grid-cols-3 gap-8 w-full">
      <li
        v-for="({ name, logoUrl }) in data"
        :key="name"
        class="flex items-center justify-center"
      >
        <NuxtImg
          v-if="logoUrl"
          :src="logoUrl"
          preload
          :alt="`Logo van ${name}`"
          class="object-fill w-full"
        />
        <span v-else>{{ name }}</span>
      </li>
    </ul>
  </PagePanel>
</template>
