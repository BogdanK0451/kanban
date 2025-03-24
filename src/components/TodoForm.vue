<template>
  <div>
    <h2 class="text-2xl font-bold">
      Add New Todo
    </h2>
    <form @submit.prevent="addTodo">
      <div class="form-group">
        <label for="title">
          Title
        </label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="form-input"
          placeholder="Enter todo title"
          required>
      </div>
      <div class="form-group">
        <label for="description">
          Description
        </label>
        <input
          id="description"
          v-model="description"
          type="text"
          class="form-input"
          placeholder="Enter todo description">
      </div>
      <div class="form-group">
        <label for="dueDate">
          Due Date
        </label>
        <input
          id="dueDate"
          v-model="dueDate"
          type="date"
          class="form-input"
          placeholder="dd.mm.yyyy">
      </div>
      <button type="submit" class="btn btn-primary">
        Add Todo
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const title = ref('')
const description = ref('')
const dueDate = ref()

const addTodo = () => {
  if (title.value.trim()) {
    todoStore.addTodo({
      id: Date.now().toString(),
      title: title.value,
      description: description.value,
      dueDate: dueDate.value,
      completed: false,
      createdAt: new Date(),
    })
    title.value = ''
    description.value = ''
    dueDate.value = undefined
  }
}
</script>
