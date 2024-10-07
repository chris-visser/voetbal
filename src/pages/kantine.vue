<script setup lang="ts">
import { renderSVG } from 'uqr'
import ClubSponsorsPanel from '~/components/ClubSponsorsPanel.vue'

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

const qrCodeSvg = renderSVG('https://svderijp.nl')
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

    <div class="flex-1 max-w-[900px] flex flex-col justify-between h-full relative">
      <ClubSponsorsPanel />
      <section class="text-right text-shadow text-3xl flex gap-8 pt-4 items-center justify-end">
        <p class="text-white">
          Meer info te vinden op
          <a
            href="https://svderijp.nl"
            class="underline text-red-600"
          >svderijp.nl
          </a>
        </p>
        <div
          class="w-full max-w-24"
          v-html="qrCodeSvg"
        />
      </section>
    </div>
  </main>
</template>
