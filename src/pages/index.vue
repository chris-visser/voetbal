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
    <div class="h-full flex flex-col justify-between relative">
      <PlayDayCompact
        :date="day.date"
        :matches="day.matches"
      />

      <ul class="flex flex-1 content-center items-end gap-8 justify-between self-end w-full">
        <li class="bg-white rounded-lg h-[120px] py-8 flex-1 max-w-[280px] flex items-center justify-center">
          <img
            :src="sponsorLogos[0].src"
            :alt="sponsorLogos[0].alt"
            class="object-fill p-8"
          >
        </li>
        <li class="text-4xl text-shadow h-[120px] text-white font-bold flex justify-center items-center flex-col">
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
    </div>

    <div class="h-full flex items-center">
      <img
        src="https://data.sportlink.com/clublogo?client_id=1VZsDN7ueJ"
        :alt="`Clublogo van SV de Rijp`"
        class="w-full relative -top-[20%]"
      >
    </div>

    <div class="flex-1 max-w-[650px] h-full relative">
      <BallSponsor class="h-full" />
    </div>
  </main>
</template>

<style lang="postcss" scoped>
.text-shadow {
  text-shadow: 1px 1px 2px black;
}
</style>
