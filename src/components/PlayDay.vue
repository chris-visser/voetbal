<script lang="ts" setup>
import { getDay } from 'date-fns'
import type { Match } from '~/types/match'
import { formatDate } from '~/helpers/formatDate'

const props = defineProps<{
  date: Date
  matches: Match[]
}>()

const normalizeName = (name: string): string => {
  const filteredName = name.replace('Rijp (de) ', '')
  if (!isNaN(parseInt(filteredName, 10))) {
    return `${filteredName}e elftal`
  }
  return filteredName
}

const dressingRoomLabel = computed(() => {
  // Official matches occur mostly on saturday and sunday
  // If no dressingRoom is set on other days, mark it as free of choice
  return ![0, 6].includes(getDay(props.date)) ? 'naar keuze' : 'niet bekend'
})
</script>

<template>
  <section class="p-8 bg-white rounded-md mb-8">
    <h2 class="font-bold text-3xl text-center mb-8 text-primary-400">
      Thuisprogramma {{ formatDate(date, 'EEEE') }}
    </h2>
    <table>
      <tr
        v-for="item in matches"
        :key="item.code"
      >
        <td class="py-2 pr-6">
          <div class="font-semibold">
            {{ formatDate(item.startsAt, 'HH:mm') }}
          </div>
          <Icon
            name="game-icons:soccer-field"
            size="20"
            class="-mt-1"
            color="#009900"
          />
          {{ item.field && item.field.replace('veld ', '') }}
        </td>
        <td class="w-9 text-center items-center">
          <NuxtImg
            src="https://data.sportlink.com/clublogo?client_id=1VZsDN7ueJ"
            :alt="`Clublogo van ${item.home.name}`"
            class="max-w-9 max-h-9"
          />
        </td>
        <td class="p-2 whitespace-nowrap pr-6 items-center">
          <span class="font-semibold">
            {{ normalizeName(item.home.name) }}
          </span>
          <div class="text-sm">
            <Icon
              name="fluent:conference-room-20-regular"
              size="20"
              class="-mt-1"
            />
            {{ item.home.room ? item.home.room : dressingRoomLabel }}
          </div>
        </td>

        <td class="w-9 text-center mix-blend-multiply">
          <NuxtImg
            v-if="item.away"
            :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.away.clubCode}`"
            :alt="`Clublogo van ${item.away.name}`"
            class="max-w-9 max-h-9"
          />
        </td>

        <td
          v-if="item.away"
          class="p-2 whitespace-nowrap items-center"
        >
          <span class="font-semibold">
            {{ item.away.name }}
          </span>
          <div class="text-sm">
            <Icon
              name="fluent:conference-room-20-regular"
              size="20"
              class="-mt-1"
            />
            {{ item.away.room ? item.away.room : dressingRoomLabel }}
          </div>
        </td>
        <td v-else />
      </tr>
    </table>
  </section>
</template>
