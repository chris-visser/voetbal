<script setup>
import format from 'date-fns/format'
import nlLocale from 'date-fns/locale/nl'
const { data: program, refresh } = await useFetch('/api/program')

onMounted(() => {
    setInterval(() => {
        refresh()
    }, 1000 * 3600) // 1 hour
})

const matches = computed(() => {
    return program.value.matches.map((match) => {
        return {
            ...match,
            startsAt: new Date(match.startsAt)
        }
    })
})
</script>

<template>
    <main class="min-h-screen p-12">
        <h2 class="text-4xl font-bold text-center mb-12 m-auto">Veld en Kleedkamers</h2>

        <table class="m-auto">
            <tr v-for="item in matches" :key="item.code"
                class="px-12 flex items-center justify-center border-b-2 gap-6 py-6 whitespace-nowrap">
                <td class="text-right w-[300px]">
                    <h3 class="font-semibold">{{ item.home.name }}</h3>
                    <p class="text-sm text-slate-700" v-if="item.home.room">Kleedkamer {{ item.home.room }}</p>
                </td>
                <td class="w-14">
                    <NuxtImg :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.home.clubCode}`" class="w-14" />
                </td>

                <td class="min-w-[100px] text-center">
                    {{ format(item.startsAt, 'EEEE', { locale: nlLocale }) }}<br />
                    <span class="font-bold text-xl">{{ format(item.startsAt, 'HH:mm') }}<br /></span>
                    {{ item.field.charAt(0).toUpperCase() + item.field.slice(1) }}
                </td>


                <td class="w-14 text-center">
                    <img :src="`https://logoapi.voetbal.nl/logo.php?clubcode=${item.away.clubCode}`" class="w-full" />
                </td>

                <td class="w-[300px]">
                    <h3 class="font-semibold">{{ item.away.name }}</h3>
                    <p class="text-sm text-slate-700" v-if="item.away.room">Kleedkamer {{ item.away.room }}</p>
                </td>
            </tr>
        </table>
    </main>
</template>