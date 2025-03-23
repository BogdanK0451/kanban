<template>
  <div class="shrink-0 basis-2xs !mx-1 hover:shadow-sm">
    <div class=" bg-kanban-black rounded-lg hover:shadow-xl">
      <div class="text-gray-300  text-sm font-medium !py-[8px] !pl-[12px] flex justify-between ">
        <div class="flex-grow">
          <p v-if="!isRenameColumnInputVisible" class="cursor-pointer" @click="isRenameColumnInputVisible = true;">
            {{ column?.title }}
          </p>
          <input
            v-else
            ref="columnNameInput"
            v-model="columnTitle"
            type="text"
            @blur="handleBlur">
        </div>
        <button
          tooltip="Delete column"
          class="cursor-pointer !px-2 !mr-1 rounded hover:bg-greenish" @click="removeColumn(columnIndex as number)">
          <span class="text-2xl">
            &#128465;
          </span>
        </button>
      </div>
      <div v-if="!isAddATaskInputVisible" class=" text-gray-300 !py-[6px] !pl-[8px] !pt-[8px] rounded-lg">
        <div class="hover:bg-greenish transition-colors duration-200 w-3/4 rounded-lg !pl-2 cursor-pointer" @click="isAddATaskInputVisible = true">
          <span class="font-bold">
            +
          </span>
          <span class="font-bold text-sm">
            Add task
          </span>
        </div>
      </div>
      <div v-else class="!px-[6px]">
        <div>
          <textarea
            ref="textarea" v-model="input"
            class="text-gray-300 text-sm resize-none rounded-lg w-full bg-kanban-input !pl-2 !pt-1"
            rows="3"
            placeholder="Enter a title"
            @blur="handleCancel" />
        </div>
        <base-confirm button-text="Add task" @confirm="handleConfirm" @cancel="handleCancel" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'
import { ref, watch, nextTick, Ref } from 'vue'
import { Column } from '../../types/kanban'
import { useKanbanStore } from '../../stores/kanban'
import BaseConfirm from '../Base/BaseConfirm.vue'

interface Props {
  columnIndex: number | null
  column: Column | null
}
const props = withDefaults(defineProps<Props>(), {
  columnIndex: null,
  column: null,
})

const { renameColumn, addTask, removeColumn, removeTask } = useKanbanStore()
const { textarea, input } = useTextareaAutosize({ styleProp: 'minHeight' })
const columnNameInput: Ref<HTMLInputElement | null> = ref(null)

const columnTitle = ref(props.column?.title)

const isAddATaskInputVisible = ref(false)
const isRenameColumnInputVisible = ref(false)

function handleCancel() {
  isAddATaskInputVisible.value = false
  input.value = ''
}

function handleBlur() {
  renameColumn(columnTitle.value as string, props.columnIndex as number)
  if (!columnTitle.value) {
    columnTitle.value = props.column?.title
  }
  isRenameColumnInputVisible.value = false
}
function handleConfirm() {
  if (input.value) {
    addTask(input.value, props.columnIndex as number)
  }
  handleCancel()
}

watch(isAddATaskInputVisible, (newVal) => {
  if (newVal) {
    nextTick(() => textarea.value?.focus())
  }
})
watch(isRenameColumnInputVisible, (newVal) => {
  if (newVal) {
    nextTick(() => columnNameInput.value?.focus())
  }
})
</script>