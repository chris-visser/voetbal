<script setup lang="ts">
import { format, getDay } from 'date-fns'
import { Match } from '~/types/match'
import nlLocale from 'date-fns/locale/nl'
const { data: program, refresh } = await useFetch<{ matches: Match[] }>('/api/program', {
    query: {
        days: 6,
        away: false
    }
})

onMounted(() => {
    setInterval(() => {
        refresh()
    }, 1000 * 60 * 10) // 10 minutes
})

const normalizeName = (name: string): string => {
    const filteredName = name.replace('Rijp (de) ', '')
    if (!isNaN(parseInt(filteredName, 10))) {
        return `${filteredName}e elftal`
    }
    return filteredName
}

type MatchDay = {
    matches: Match[];
    day: number;
    date: Date;
}

const days = computed(() => {
    if (!program.value?.matches) {
        return []
    }

    return program.value?.matches?.reduce<MatchDay[]>((list, match) => {
        const date = new Date(match.startsAt)
        const day = getDay(date)

        const dayIndex = list.findIndex((item) => item.day === day)

        if (dayIndex === -1) {
            return [
                ...list,
                {
                    day,
                    date,
                    matches: [{
                        ...match,
                        startsAt: date
                    }]
                }
            ]
        }

        list[dayIndex].matches.push({
            ...match,
            startsAt: date
        })

        return list
    }, [])
})

const getDayName = (date: Date): string => {
    return format(date, 'EEEE', { locale: nlLocale })
}
const fixFieldName = (name: string): string => {
    return name.replace('veld ', '');
}
</script>

<template>
    <main class="relative flex flex-wrap justify-between items-start w-full p-8">
        <section class="p-8 bg-white rounded-md" v-for="dayNumber in [0, 1]" :key="dayNumber">
            <h2 class="font-bold text-2xl text-center mb-8">Thuisprogramma {{ getDayName(days[dayNumber].date) }}</h2>
            <table>
                <tr v-for="item in days[dayNumber].matches" :key="item.code">
                    <td class="py-2 pr-6">
                        <div class="font-semibold">
                            {{ format(item.startsAt, 'HH:mm', { locale: nlLocale }) }}
                        </div>
                        <Icon name="game-icons:soccer-field" size="20" class="-mt-1" />
                        {{ item.field && fixFieldName(item.field) }}
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
                        <NuxtImg v-if="item.away"
                            :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.away.clubCode}`"
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


    </main>
</template>