<template>
  <div class="!px-[6px]">
    <div class="relative group">
      <textarea
        ref="textarea"
        v-model="taskTitle"
        :readonly="!isEditing"
        :placeholder="$t('kanban.task.enterTitle')"
        class="cursor-pointer text-gray-300 text-sm resize-none rounded-lg w-full bg-kanban-input !pl-2 !pt-1 hover:outline-2 hover:outline-gray-500"
        :class="{'outline-2 outline-gray-500': isEditing}"
        rows="3" />
      <button
        class="cursor-pointer absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 !p-1 rounded hover:bg-gray-600"
        @click="removeTask(taskIndex, columnIndex)">
        <span class="text-gray-300">
          🗑
        </span>
      </button>
      <button
        v-if="!isEditing"
        class="cursor-pointer absolute top-1 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 !p-1 rounded hover:bg-gray-600"
        @click="isEditing = true">
        <span class="text-gray-300">
          ✏
        </span>
      </button>
      <button
        v-else
        class="cursor-pointer absolute top-1 right-6 opacity-100 transition-opacity duration-200 !p-1 rounded hover:bg-gray-600"
        @click="saveEdit">
        <span class="text-gray-300">
          💾
        </span>
      </button>
    </div>
    <div v-if="isEditing" class="mt-2 space-y-2">
      <textarea
        v-model="taskDescription"
        class="text-gray-300 text-sm resize-none rounded-lg w-full bg-kanban-input !pl-2 !pt-1 outline-2 outline-gray-500"
        rows="3"
        :laceholder="$t('kanban.task.enterDescription.')" />
      <input
        v-model="taskDue"
        type="date"
        class="text-gray-300 text-sm rounded-lg w-full bg-kanban-input !pl-2 !pt-1 outline-2 outline-gray-500">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTextareaAutosize } from '@vueuse/core'
import { useKanbanStore } from '../../stores/kanban'
import { Task } from '../../types/kanban'

interface Props {
  columnIndex: number
  taskIndex: number
  task: Task
}

const props = defineProps<Props>()

const { textarea } = useTextareaAutosize({ styleProp: 'minHeight' })
const { removeTask, editTask } = useKanbanStore()

const isEditing = ref(false)
const taskTitle = ref(props.task.title)
const taskDescription = ref(props.task.description || '')
const taskDue = ref(props.task.due || '')

function saveEdit() {
  if (!taskTitle.value) {
    return
  }

  editTask(
    { title: taskTitle.value, description: taskDescription.value, due: taskDue.value, completed: false },
    props.taskIndex,
    props.columnIndex,
  )
  isEditing.value = false
}
</script>