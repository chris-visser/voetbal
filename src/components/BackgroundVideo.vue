<script setup lang="ts">
const url = 'https://dq7qi3p659m75.cloudfront.net/drone-sv-de-rijp.webm'
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
  <div class="overflow-hidden h-screen w-screen inset-0 fixed">
    <video
      ref="video"
      autoplay
      muted
      loop
      class="min-h-screen min-w-full aspect-video object-cover"
    >
      <source
        :src="url"
        type="video/webm"
      >
    <!-- Add additional source elements for different video formats (WebM, Ogg) -->
    </video>
  </div>
</template>
