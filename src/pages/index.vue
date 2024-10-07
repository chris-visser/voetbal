<script setup lang="ts">
useHead({
  title: 'Speeldag overzicht - SV de Rijp',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Speeldag overzicht - SV de Rijp',
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Speeldag overzicht - SV de Rijp',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Programma en kleedkameroverzicht SV de Rijp',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: `https://logoapi.voetbal.nl/logo.php?clubcode=BBFW72Z`,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: 'https://voetbal-app.netlify.app',
    },
  ],
})

const { days, refresh } = await useSchedule()

onMounted(() => {
  setInterval(() => {
    refresh()
  }, 1000 * 60 * 10) // 10 minutes
})

const day = computed(() => {
  return days.value[0]
})

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

  const dayItems = items.filter(item => item.dayNumber === days.value[0].day)

  return dayItems.length > 0 ? dayItems : [items[0], items[1]]
})
</script>

<template>
  <main class="relative flex justify-between gap-8 items-start w-full p-8 h-screen max-w-screen overflow-hidden">
    <div class="overflow-hidden h-screen w-screen inset-0 fixed">
      <BackgroundVideo />
    </div>
    <div class="h-full flex flex-col gap-8 items-start justify-between relative">
      <MainSponsors
        :day-number="day.day"
        class="w-full"
      />

      <PlayDayCompact
        :date="day.date"
        :matches="day.matches"
        class="w-full"
      />
    </div>

    <div class="flex-1 max-w-[650px] h-full relative">
      <BallSponsor class="h-full" />
    </div>
  </main>
</template>
