<template>
  <div class="shrink-0 basis-2xs !mx-1 hover:shadow-sm ">
    <div class=" bg-kanban-black rounded-lg hover:shadow-xl flex flex-col">
      <div class="text-gray-300 text-sm font-medium !py-[8px] !pl-[12px] flex justify-between flex-none ">
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

      <draggable
        v-model="column!.tasks" class="max-h-[77vh] overflow-y-auto !pt-[2px]" 
        :group="{name: 'tasks'}"
        item-key="index">
        <template #item="{element: task, index}">
          <kanban-task
            :task="task"
            :column-index="(columnIndex as number)"
            :task-index="index" />
        </template>
      </draggable>

      <div v-if="!isAddATaskInputVisible" class=" text-gray-300 !py-[6px] !pl-[8px] !pt-[8px] rounded-lg">
        <div class="hover:bg-greenish transition-colors duration-200 w-3/4 rounded-lg !pl-2 cursor-pointer" @click="isAddATaskInputVisible = true">
          <span class="font-bold">
            +
          </span>
          <span class="font-bold text-sm">
            {{ $t('kanban.task.add') }}
          </span>
        </div>
      </div>
      <div v-else class="!px-[6px] !pt-[6px]">
        <div>
          <textarea
            ref="textarea" v-model="input"
            class="outline-2 outline-gray-500  text-gray-300 text-sm resize-none rounded-lg w-full bg-kanban-input !pl-2 !pt-1"
            rows="3"
            :placeholder="$t('kanban.task.enterTitle')"
            @blur="handleCancel" />
        </div>
        <base-confirm :button-text="$t('kanban.task.add')" @confirm="handleConfirm" @cancel="handleCancel" />
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
import KanbanTask from './KanbanTask.vue'
import draggable from 'vuedraggable'

interface Props {
  columnIndex: number | null
  column: Column | null
}
const props = withDefaults(defineProps<Props>(), {
  columnIndex: null,
  column: null,
})

const { renameColumn, addTask, removeColumn } = useKanbanStore()
const { textarea, input } = useTextareaAutosize({ styleProp: 'minHeight' })
const columnNameInput: Ref<HTMLInputElement | null> = ref(null)

const columnTitle = ref(props.column?.title)

const isAddATaskInputVisible = ref(false)
const isRenameColumnInputVisible = ref(false)

function handleConfirm() {
  if (input.value) {
    addTask(input.value, props.columnIndex as number)
    isAddATaskInputVisible.value = false
    input.value = ''
  }
}

function handleCancel(event?: FocusEvent) {
  // this is necessary because of the interaction of @blur and @confirm, by pressing the button and firing @confirm, @ blur would fire first,
  // causing the v-else condition to not be satisfied, hiding those dom elements and cancelling the confirm handler
  // so we do a check if on blur focus went to a button
  const relatedTarget = event?.relatedTarget as HTMLElement
  if (relatedTarget?.tagName === 'BUTTON') {
    if (relatedTarget.classList.contains('confirm-button')) {
      handleConfirm()
      return
    } else if (relatedTarget.classList.contains('cancel-button')) {
      isAddATaskInputVisible.value = false
      input.value = ''
      return
    }
  }

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