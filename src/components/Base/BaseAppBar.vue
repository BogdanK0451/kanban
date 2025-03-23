<template>
  <header class=" bg-white mix-blend-overlay">
    <h1 class="text-2xl font-bold text-some-text !pl-4 !pt-3">
      {{ title }}
    </h1>
  </header>
</template>


<script setup lang="ts">
interface Props {
  title: string
}
defineProps<Props>()
</script>