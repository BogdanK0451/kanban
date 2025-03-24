<template>
  <header class="bg-white mix-blend-overlay flex items-center justify-between !pl-4 !pt-3">
    <h1 class="text-2xl font-bold text-some-text">
      {{ title }}
    </h1>
    <RouterLink to="/todos" class="text-blue-600 hover:underline !pr-4">
      Todos
    </RouterLink>
  </header>
</template>

<script setup lang="ts">
interface Props {
  title: string
}
defineProps<Props>()
</script>