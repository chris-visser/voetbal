<script lang="ts" setup>
import { id } from 'date-fns/locale';

const { data, refresh } = await useFetch<{ version: string }>('/api/version')

onMounted(() => {
    setInterval(() => {
        refresh()
    }, 1000 * 60 * 10) // 10 minutes
})

// Ensure that screens remotely refresh the page when a new app version is deployed
// Note that this is a manual version change on the /api/version endpoint
let prevVersion = ref(data.value?.version)

watchEffect(() => {
    if (prevVersion.value === data.value?.version) {
        return
    }
    prevVersion.value = data.value?.version
    window.location.reload()
})

// const video = ref<HTMLVideoElement | null>(null)

// onMounted(() => {
//     console.log('VIDEO MOUNTED')
//     if (!video.value) {
//         return
//     }
//     console.log('VIDEO LISTENER SET')	
//     video.value.addEventListener('ended', function () {
//         console.log('VIDEO ENDED')
//         if(!video.value) {
//             return
//         }
//         console.log('VIDEO RESTART')
//         video.value.currentTime = 0
//         setTimeout(() => {
//             video.value?.play()
//         }, 1000)
//     })
// })
</script>

<template>
    <div class="overflow-hidden h-screen w-screen absolute">
        <video autoplay muted loop ref="video" class="min-h-full aspect-video min-w-full">
            <source src="https://dq7qi3p659m75.cloudfront.net/drone-sv-de-rijp.mp4" type="video/mp4">
            <!-- Add additional source elements for different video formats (WebM, Ogg) -->
        </video>
    </div>

    <slot />

    <footer>
        <!-- <p class="fixed bottom-8 right-8 text-white">
            <span v-if="data?.version">{{ data.version }}</span>
        </p> -->
    </footer>
</template>