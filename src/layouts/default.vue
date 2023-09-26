<script lang="ts" setup>
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
      <Video />
    </div>

    <slot />

    <footer>
        <!-- <p class="fixed bottom-8 right-8 text-white">
            <span v-if="data?.version">{{ data.version }}</span>
        </p> -->
    </footer>
</template>