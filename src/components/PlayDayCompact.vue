<script lang="ts" setup>
import { Match } from '~/types/match'
import { formatDate } from '~/helpers/formatDate'

const props = defineProps<{
  date: Date;
  matches: Match[];
}>()

const normalizeName = (name: string): string => {
  const filteredName = name.replace('Rijp (de) ', '')
  if (!isNaN(parseInt(filteredName, 10))) {
    return `${filteredName}e elftal`
  }
  return filteredName
}

const isTheDay = computed(() => (
    formatDate(props.date, 'EEEE') === formatDate(new Date(), 'EEEE')
))

const matches = computed(() => {
  return props.matches.map(match => {
    if(match.home?.name === 'Rijp (de) VR2') {
      return {
        ...match,
        status: 'cancelled',
      }
    }
    return match
  })
})

</script>

<template>
  <section class="p-8 bg-white rounded-md mb-8">
    <h2 class="font-bold text-3xl text-center mb-8 text-primary-400">Thuisprogramma {{ formatDate(date, 'EEEE') }}</h2>
    <table class="">
      <thead>
        <tr>
          <th class="text-left">Start</th>
          <th class="text-left min-w-[170px]" colspan="2">Thuis</th>
          <th class="text-left">
            <Icon name="fluent:conference-room-20-regular" size="22" class="relative -left-1" />
          </th>
          <th v-if="isTheDay">Tijd</th>
          <th v-else></th>
          <th class="text-left min-w-[170px]" colspan="2">Uit</th>
          <th>
            <Icon name="fluent:conference-room-20-regular" size="22" />
          </th>
          <th class="pl-8">
              <Icon name="game-icons:soccer-field" size="30" class="mt-[2px]" color=""/>
          </th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="item in matches" :key="item.code" :class="{ 'font-light': item.status === 'cancelled' }">
        <td class="py-2 pr-8" v-if="item.status !== 'cancelled'">
          {{ formatDate(item.startsAt, 'HH:mm')}}
        </td>
        <td class="py-2 pr-8" v-else-if="item.home.name === 'Rijp (de) VR2'">
          Speelt uit
        </td>
        <td class="py-2 pr-8" v-else>
          Afgelast
        </td>
        <td>
          <NuxtImg :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.home.clubCode}`"
                   class="max-w-[100px] text-xs max-h-[25px] m-auto object-fill" />
        </td>
        <td class="p-2 whitespace-nowrap pr-6 items-center" :class="{ 'line-through': item.status === 'cancelled' }">
          {{ normalizeName(item.home.name) }}
        </td>
        <td class="py-2 whitespace-nowrap">
          {{ item.home.room && item.status !== 'cancelled' ? item.home.room : '...' }}
        </td>

        <td class="py-2 px-8 text-center" >
          <Livestamp :startsAt="item.startsAt" :duration="item.duration" v-if="isTheDay && item.status !== 'cancelled'" />
        </td>

        <td class="">
          <NuxtImg v-if="item.away"
                   :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.away.clubCode}`"
                    class="max-w-[100px] text-xs max-h-[25px] m-auto object-fill" />
        </td>

        <td class="p-2 flex pr-6 items-center" :class="{ 'line-through': item.status === 'cancelled' }">
          {{ item.away.name }}
        </td>

        <td class="p-2 whitespace-nowrap items-center" v-if="item.away">
            {{ item.away.room && item.status !== 'cancelled' ? item.away.room : '...' }}
        </td>
        <td v-else>

        </td>
        <td class="py-2 pl-8" :class="{ 'line-through': item.status === 'cancelled' }">
          {{ item.field && item.field.replace('veld ', '') }}
        </td>

      </tr>
      </tbody>
    </table>
  </section>
</template>