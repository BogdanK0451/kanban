<template>
  <div class="container">
    <h1 class="text-3xl font-bold">
      Todo App
    </h1>
    <div class="card">
      <todo-form />
    </div>
    <div class="card">
      <todo-list />
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoForm from '../components/TodoForm.vue'
import TodoList from '../components/TodoList.vue'
</script>
