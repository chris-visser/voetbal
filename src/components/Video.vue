<script setup lang="ts">
const url = 'https://dq7qi3p659m75.cloudfront.net/drone-shot-sv-de-rijp.MP4'
// const src = ref('')
//
// onMounted(() => {
//   console.log('Waiting for blob')
//
//   $fetch<Blob>(url).then((result) => {
//     console.log('Blob downloaded')
//     src.value = URL.createObjectURL(result)
//   })
//
// })
</script>

<template>
  <video autoplay muted loop ref="video" class="min-h-screen aspect-video object-cover">
    <source :src="url" type="video/mp4">
    <!-- Add additional source elements for different video formats (WebM, Ogg) -->
  </video>
</template>