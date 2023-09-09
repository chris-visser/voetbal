<script lang="ts" setup>
import { formatDate } from '~/helpers/formatDate'

defineProps<{
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
    <section class="p-8 bg-white rounded-md">
        <h2 class="font-bold text-2xl text-center mb-8">Thuisprogramma {{ formatDate(date, 'EEEE') }}</h2>
        <table>
            <tr v-for="item in matches" :key="item.code">
                <td class="py-2 pr-6">
                    <div class="font-semibold">
                        {{ formatDate(item.startsAt, 'HH:mm', { locale: nlLocale }) }}
                    </div>
                    <Icon name="game-icons:soccer-field" size="20" class="-mt-1" />
                    {{ item.field && item.field.replace('veld ', '') }}
                </td>
                <td class="w-9 text-center items-center">
                    <NuxtImg :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.home.clubCode}`"
                        :alt="`Clublogo van ${item.home.name}`" class="max-w-9 max-h-9" />
                </td>
                <td class="p-2 whitespace-nowrap pr-6 items-center">
                    <span class="font-semibold">
                        {{ normalizeName(item.home.name) }}
                    </span>
                    <div class="text-sm">
                        <Icon name="fluent:conference-room-20-regular" size="20" class="-mt-1" />
                        {{ item.home.room ? item.home.room : 'niet bekend' }}
                    </div>
                </td>

                <td class="w-9 text-center mix-blend-multiply">
                    <NuxtImg v-if="item.away" :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.away.clubCode}`"
                        :alt="`Clublogo van ${item.away.name}`" class="max-w-9 max-h-9" />
                </td>

                <td class="p-2 whitespace-nowrap items-center" v-if="item.away">
                    <span class="font-semibold">
                        {{ item.away.name }}
                    </span>
                    <div class="text-sm">
                        <Icon name="fluent:conference-room-20-regular" size="20" class="-mt-1" />
                        {{ item.away.room ? item.away.room : 'niet bekend' }}
                    </div>
                </td>
                <td v-else>

                </td>

            </tr>
        </table>
    </section>
</template>