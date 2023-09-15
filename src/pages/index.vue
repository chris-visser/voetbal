<script setup lang="ts">
import { getDay } from 'date-fns'
import { Match } from '~/types/match'
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
</script>

<template>
    <main class="relative flex flex-wrap justify-between items-start w-full p-8 max-h-screen max-w-screen overflow-hidden">
        <PlayDay 
            :date="days[0].date" 
            :matches="days[0].matches" 
        />
        <div class="max-w-1/3">
            <PlayDay 
            v-if="days[1]"
            :date="days[1].date" 
            :matches="days[1].matches" 
        />
        <section class="p-8 bg-white rounded-md flex flex-col items-center">
            <h2 class="font-bold text-2xl text-center mb-5 text-primary-400">Sponsor wedstrijdbal</h2>
            <img src="/sportcafe-oosterven.webp" class="h-[150px] inline-block mb-2" alt="Sponsor wedstrijdbal - Sportcafe Oosterven" />
            <p class="text-center max-w-[400px]">
                De wedstrijdbal van het 1e elftal wordt gesponsord door onze buren Ger en Joyce Huider van Sportcafé De Oosterven, de perfecte locatie voor elk feest. 
            </p>
        </section>
        </div>
    </main>
</template>