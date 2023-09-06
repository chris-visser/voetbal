<script setup lang="ts">
import { formatDate } from '~/helpers/formatDate'
import { Match } from '~/types/match';

useHead({
    title: 'Programma Selectie - SV de Rijp',
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: 'Beker, competitie, oefenwedstrijden en trainingen van de selectie van SV de Rijp',
        },
        {
            hid: 'og:title',
            property: 'og:title',
            content: 'Programma Selectie - SV de Rijp',
        },
        {
            hid: 'og:description',
            property: 'og:description',
            content: 'Programma Selectie SV de Rijp',
        },
        {
            hid: 'og:image',
            property: 'og:image',
            content: `https://logoapi.voetbal.nl/logo.php?clubcode=BBFW72Z`,
        },
        {
            hid: 'og:url',
            property: 'og:url',
            content: 'https://voetbal-app.netlify.app/selectie',
        }
    ],
})


const { data: program, refresh } = await useFetch<{ matches: Match[] }>('/api/program')

onMounted(() => {
    setInterval(() => {
        refresh()
    }, 1000 * 3600) // 1 hour
})

const shortenTeamName = (name: string): string => {
    const number = name.split(' ').pop()

    if(!number) {
        return name
    }

    if(isNaN(parseInt(number, 10))) {
        return number
    }

    return `${number}e`
}

const activityMap: Record<string, string> = {
    cup: 'Beker',
    competition: 'Competitie',
    training: 'Training',
}

const events = computed(() => {
    if(!program.value) {
        return []
    }
    return program.value.matches.map((match) => {
        return {
            code: match.code,
            team: shortenTeamName(!match.isHome && match.away ? match.away.name : match.home.name),
            date: formatDate(match.startsAt, 'd LLL'),
            day: formatDate(match.startsAt, 'EEEE'),
            activity: activityMap[match.type] || 'Oefen',
            note: '',
            homeAway: match.isHome ? 'Thuis' : 'Uit',
            opponent: (match.isHome ? match?.away?.name : match?.home?.name) || '',
            time: formatDate(match.startsAt, 'HH:mm'),
        }
    })
})

</script>

<template>
    <main class="min-h-screen p-12">
        <h2 class="text-4xl font-bold text-center mb-12 m-auto">Programma Selectie</h2>

        <table class="m-auto">
            <thead>
                <tr>
                    <th>Team</th>
                    <th>Datum</th>
                    <th>Dag</th>
                    <th>Activiteit</th>
                    <th>Opmerking</th>
                    <th>uit/thuis</th>
                    <th>Tegenstander</th>
                    <th>Tijdstip</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in events" :key="item.code">
                    <td>{{ item.team }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.day }}</td>
                    <td>{{ item.activity }}</td>
                    <td>{{ item.note }}</td>
                    <td>{{ item.homeAway }}</td>
                    <td>{{ item.opponent }}</td>
                    <td>{{ item.time }}</td>
                </tr>
            </tbody>
        </table>

        <!-- <ul>
            <li v-for="item in program.matches" :key="item.code" class="flex flex-wrap justify-center gap-4 my-4">
                <div class="col-span-3 text-center flex items-center justify-center font-semibold text-primary-400 text-lg pb-2 w-full">
                    {{ formatDate(item.startsAt, 'd LLLL yyyy') }}
                </div>
                <div class="flex-1 w-1/3 flex gap-2 justify-end items-center">
                    {{ item.home.name }}
                    <NuxtImg :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.home.clubCode}`" class="w-10 ml-2" />
                </div>
                <div class="text-center flex-none w-[100px]">
                    {{ formatDate(item.startsAt, 'HH:mm') }}
                </div>
                <div class="flex-1 w-1/3 flex gap-2 items-center">
                    <NuxtImg :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.away.clubCode}`" class="w-10 mr-2" />
                    {{ item.away.name }}
                </div>
            </li>
        </ul> -->

    </main>
</template>

<style lang="postcss" scoped>
th {
    @apply text-left;
}
th,td {
    @apply p-1 px-3;
}
tr:nth-child(even) {
    @apply bg-slate-200;
}
</style>