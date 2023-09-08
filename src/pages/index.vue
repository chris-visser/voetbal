<script setup lang="ts">
import format from 'date-fns/format'
import nlLocale from 'date-fns/locale/nl'
const { data: program, refresh } = await useFetch('/api/program')

onMounted(() => {
    setInterval(() => {
        refresh()
    }, 1000 * 3600) // 1 hour
})

const normalizeName = (name: string): string => {
    const filteredName = name.replace('Rijp (de) ', '')
    if(!isNaN(parseInt(filteredName, 10))) {
        return `${filteredName}e elftal`
    }
    return filteredName
}

const matches = computed(() => {
    return program.value.matches.map((match) => {
        return {
            ...match,
            home: {
                ...match.home,
                name: normalizeName(match.home.name)
            },
            startsAt: new Date(match.startsAt)
        }
    })
})

const teams = computed(() => {
    return program.value.matches.reduce((acc, match) => [
        ...acc,
        {
            name: match.home.name,
            clubCode: match.home.clubCode,
            room: match.home.room
        },
        {
            name: match.away.name,
            clubCode: match.away.clubCode,
            room: match.away.room
        }
    ], [])
})
</script>

<template>
    <main class="relative flex flex-wrap justify-between w-full p-16">
        <section class="p-8 bg-white/80 rounded-md">
            <h2 class="font-bold text-2xl text-center mb-8">Thuisprogramma vandaag</h2>
            <table>
                <thead>
                    <tr>
                        <th class="text-left py-2 pr-3"></th>
                        <th class="text-left px-3" colspan="2">Team</th>
                        <th class="text-left px-3" colspan="2">Uit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in matches" :key="item.code">
                        <td class="py-3 pr-3">
                            {{ format(item.startsAt, 'HH:mm', { locale: nlLocale }) }}
                            <div class="text-xs">
                                {{ item.field }}
                            </div>
                        </td>
                        <td class="w-8 text-center items-center">
                            <NuxtImg :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.home.clubCode}`"
                                :alt="`Clublogo van ${item.home.name}`" class="max-w-8 max-h-8" />
                        </td>
                        <td class="p-3 whitespace-nowrap pr-6 items-center">
                            {{ item.home.name }}
                            <div class="text-xs">
                                {{ item.home.room }}
                            </div>
                        </td>
                        <td class="w-8 text-center mix-blend-multiply">
                            <NuxtImg :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.away.clubCode}`"
                                :alt="`Clublogo van ${item.away.name}`" class="max-w-8 max-h-8" />
                        </td>
                        <td class="p-3 whitespace-nowrap items-center">
                            {{ item.away.name }}
                            <div class="text-xs">
                                {{ item.away.room }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>


    </main>
</template>