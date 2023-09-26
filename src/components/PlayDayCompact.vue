<script lang="ts" setup>
import { Match } from '~/types/match'
import { formatDate } from '~/helpers/formatDate'
import { getDay } from 'date-fns'
import { format } from 'date-fns-tz'

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

</script>

<template>
  <section class="p-8 bg-white rounded-md mb-8">
    <h2 class="font-bold text-3xl text-center mb-8 text-primary-400">Thuisprogramma {{ formatDate(date, 'EEEE') }}</h2>
    <table>
      <thead>
        <tr>
          <th class="text-left">Start</th>
          <th class="text-left" colspan="2">Thuis</th>
          <th class="text-left">
            <Icon name="fluent:conference-room-20-regular" size="22" class="relative -left-1" />
          </th>
          <th>Tijd</th>
          <th class="text-left" colspan="2">Uit</th>
          <th>
            <Icon name="fluent:conference-room-20-regular" size="22" />
          </th>
          <th class="text-center">
              <Icon name="game-icons:soccer-field" size="30" class="mt-[2px]" color=""/>
          </th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="item in matches" :key="item.code">
        <td class="py-2 pr-8">
          {{ formatDate(item.startsAt, 'HH:mm')}}
        </td>
        <td>
          <NuxtImg :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.home.clubCode}`"
                   :alt="`Clublogo van ${item.home.name}`" class="w-full max-w-5 max-h-5 m-auto object-cover" />
        </td>
        <td class="p-2 whitespace-nowrap pr-6 items-center">
          {{ normalizeName(item.home.name) }}
        </td>
        <td class="py-2 whitespace-nowrap">
          {{ item.home.room ? item.home.room : '...' }}
        </td>

        <td class="py-2 px-8 text-center">
          <Livestamp :startsAt="item.startsAt" />
        </td>

        <td class="text-center">
          <NuxtImg v-if="item.away"
                   :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.away.clubCode}`"
                   :alt="`Clublogo van ${item.away.name}`" class="max-w-[100px] max-h-[25px] m-auto object-fill" />
        </td>

        <td class="p-2 flex pr-6 items-center">
          {{ item.away.name }}
        </td>

        <td class="p-2 whitespace-nowrap items-center" v-if="item.away">
            {{ item.away.room ? item.away.room : '...' }}
        </td>
        <td v-else>

        </td>
        <td class="py-2 px-6">
          {{ item.field && item.field.replace('veld ', '') }}
        </td>

      </tr>
      </tbody>
    </table>
  </section>
</template>