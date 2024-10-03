<script setup lang="ts">
defineProps<{
  name: string
  teamId: string
}>()
</script>

<template>
  <section
    class="p-8 bg-white rounded-md"
  >
    <h2 class="font-bold text-3xl mb-8 text-center text-primary-400">
      Stand {{ name }}
    </h2>
    <table class="w-full">
      <tr>
        <th class="text-left pr-1 py-1">
          #
        </th>
        <th class="p-1 w-full text-left">
          Team
        </th>
        <th class="p-1 text-left min-w-12">
          G
        </th>
        <th class="p-1 text-left">
          P
        </th>
      </tr>
      <tr class="whitespace-nowrap">
        <td>1</td>
        <td>SV de Rijp 1</td>
        <td>10</td>
        <td>8</td>
      </tr>
    </table>
  </section>
</template>
