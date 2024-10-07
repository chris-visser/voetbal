<script setup lang="ts">
const { dayNumber } = defineProps<{
  dayNumber: number
}>()

const sponsorLogos = computed(() => {
  const items = [{
    src: '/sponsors/ranko.png',
    alt: 'Logo co-hoofdsponsor Ranko',
    dayNumber: 0,
  }, {
    src: '/sponsors/plus.png',
    alt: 'Logo co-hoofdsponsor Plus Supermarkt',
    dayNumber: 0,
  }, {
    src: '/sponsors/duinmaijer.png',
    alt: 'Logo sponsor Duinmaijer',
    dayNumber: 6,
  }, {
    src: '/sponsors/roelofsen.png',
    alt: 'Logo sponsor Roelofsen',
    dayNumber: 6,
  }]

  const dayItems = items.filter(item => item.dayNumber === dayNumber)

  return dayItems.length > 0 ? dayItems : [items[0], items[1]]
})
</script>

<template>
  <ul class="flex flex-1 content-center items-end gap-8 justify-between self-end w-full">
    <li class="bg-white rounded-lg h-[120px] py-8 flex-1 max-w-[280px] flex items-center justify-center">
      <img
        :src="sponsorLogos[0].src"
        :alt="sponsorLogos[0].alt"
        class="object-fill p-8"
      >
    </li>
    <li class="text-4xl text-shadow h-[120px] w-32 text-white font-bold flex justify-center items-center flex-col">
      <Icon
        name="ic:baseline-access-time"
        size="60"
      />
      <PlaytimeClock />
    </li>
    <li class="bg-white rounded-lg h-[120px] py-8 flex-1 max-w-[280px] flex items-center justify-center">
      <img
        :src="sponsorLogos[1].src"
        :alt="sponsorLogos[1].alt"
        class="object-fill p-8"
      >
    </li>
  </ul>
</template>
