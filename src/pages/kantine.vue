<script setup lang="ts">
useHead({
  title: 'Kantine - SV de Rijp',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Kantine overzicht - SV de Rijp',
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Kantine overzicht - SV de Rijp',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Kantine - SV de Rijp',
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
</script>

<template>
  <main class="relative flex gap-16 justify-between items-start w-full p-8 h-screen max-w-screen overflow-hidden">
    <BackgroundVideo />
    <div class="h-full flex flex-col justify-between relative">
      <PlayDayCompact
        :date="day.date"
        :matches="day.matches"
      />

      <MainSponsors :day-number="day.day" />
    </div>

    <div class="h-full flex flex-col justify-center">
      <img
        src="https://data.sportlink.com/clublogo?client_id=1VZsDN7ueJ"
        :alt="`Clublogo van SV de Rijp`"
        class="w-42 relative -top-[20%]"
      >
    </div>
    <div class="flex-1 h-full relative">
      <!-- <div class="flex gap-8 mb-8">
        <TeamRankingSummaryPanel
          class="flex-1"
          name="De Rijp 1"
          team-id=""
        />
        <TeamRankingSummaryPanel
          class="flex-1"
          name="De Rijp 2"
          team-id=""
        />
      </div> -->
      <ClubSponsorsPanel />
    </div>
  </main>
</template>

<style lang="postcss" scoped>
.text-shadow {
  text-shadow: 1px 1px 2px black;
}
</style>
