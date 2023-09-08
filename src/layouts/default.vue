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
    if(prevVersion.value === data.value?.version) {
        return
    }	
    prevVersion.value = data.value?.version
    window.location.reload()
})
</script>

<template>
    <div class="overflow-hidden h-screen w-screen absolute">
        <video autoplay muted loop id="video-background" class="min-h-full aspect-video min-w-full">
            <source src="/drone-shot-sv-de-rijp.mp4" type="video/mp4" autoplay>
            <!-- Add additional source elements for different video formats (WebM, Ogg) -->
        </video>
    </div>

    <slot />
</template>