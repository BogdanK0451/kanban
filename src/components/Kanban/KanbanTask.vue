<template>
  <div class="task-container !px-[6px]">
    <div class="relative group">
      <textarea
        ref="textarea"
        v-model="task!.title"
        readonly
        class="cursor-pointer text-gray-300 text-sm resize-none rounded-lg w-full bg-kanban-input !pl-2 !pt-1 hover:outline-2 hover:outline-gray-500 "
        rows="3" />
      <button
        class="absolute  top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 !p-1 rounded hover:bg-gray-600"
        @click="removeTask(taskIndex, columnIndex)">
        <span class="text-gray-300">
          🗑
        </span>
      </button>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'
import { useKanbanStore } from '../../stores/kanban'
import { Task } from '../../types/kanban'

interface Props {
  columnIndex: number
  taskIndex: number
  task: Task
}

defineProps<Props>()

const { textarea } = useTextareaAutosize({ styleProp: 'minHeight' })
const { removeTask } = useKanbanStore()
</script>
  
