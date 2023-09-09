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
</script>

<template>
    <main class="relative flex flex-wrap justify-between items-start w-full p-8">
        <ProgramSection 
            v-for="day in days.slice(0, 2)" 
            :key="day.day" 
            :date="day.date" 
            :matches="day.matches" 
        />
    </main>
</template>