<script lang="ts" setup>
const { data, refresh } = await useFetch<{ version: string }>('/api/version', {
  server: false,
  params: {
    screenSize: {
      width: window?.innerWidth,
      height: window?.innerHeight,
    },
  },
})

onMounted(() => {
  setInterval(() => {
    refresh()
  }, 1000 * 60 * 10) // 10 minutes
})

// Ensure that screens remotely refresh the page when a new app version is deployed
// Note that this is a manual version change on the /api/version endpoint
const prevVersion = ref(data.value?.version)

watchEffect(() => {
  const isInitialLoad = prevVersion.value === undefined
  if (isInitialLoad) {
    return
  }
  const hasVersionUpdated = prevVersion.value === data.value?.version
  if (hasVersionUpdated) {
    return
  }
  prevVersion.value = data.value?.version
  window.location.reload()
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
