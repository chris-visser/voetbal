<script setup lang="ts">
const sponsors = [{
  name: 'Davibouw',
  logo: '/sponsors/davibouw.webp',
}, {
  name: 'Ranko',
  logo: '/sponsors/ranko.png',
}, {
  name: 'Plus Supermarkt',
  logo: '/sponsors/plus.png',
}, {
  name: 'ING',
  logo: '/sponsors/ing.png',
}, {
  name: 'Roelofsen',
  logo: '/sponsors/roelofsen.png',
}, {
  name: 'Oudejans Administratie & Advies',
  logo: '/sponsors/oudejans-administratie-advies.jpg',
}, {
  name: 'Duinmaijer',
  logo: '/sponsors/duinmaijer.png',
}, {
  name: 'LMW',
  logo: '/sponsors/lmw.jpg',
}, {
  name: 'Restaurant Oudejans',
  logo: '/sponsors/restaurant-oudejans.webp',
}, {
  name: 'Medec',
  logo: '/sponsors/medec.png',
}]
</script>

<template>
  <PagePanel>
    <h2 class="font-bold text-3xl mb-8 text-center text-primary-400">
      Sponsors
    </h2>
    <ul class="grid grid-cols-3 gap-8 w-full">
      <li
        v-for="({ name, logo }) in sponsors"
        :key="name"
        class="flex items-center justify-center"
      >
        <NuxtImg
          :src="logo"
          :alt="`Logo van ${name}`"
          class="object-fill w-full"
        />
      </li>
    </ul>
  </PagePanel>
</template>
