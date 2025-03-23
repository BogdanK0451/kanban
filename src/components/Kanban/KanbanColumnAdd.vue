<template>
  <div class="shrink-0 basis-2xs !mx-1">
    <div v-if="!isAddAColumnInputVisible" class="cursor-pointer mix-blend-overlay bg-white rounded-lg hover:bg-gray-300 transition-colors duration-200 " @click="isAddAColumnInputVisible = true;">
      <div class="text-gray-400 !py-[12px] !px-[12px]">
        <div>
          <span class="font-bold">
            +
          </span>
          <span class="font-medium text-sm  text-some-text">
            Add another column
          </span>
        </div>
      </div>
    </div>
    <div v-else class="cursor-pointer hover:shadow-xl bg-kanban-black rounded-lg !px-[6px] !pt-1">
      <div>
        <textarea
          ref="textarea" v-model="input"
          class="text-gray-300 text-sm resize-none rounded-sm w-full  bg-kanban-input !pl-2 !py-1"
          rows="1"
          placeholder="Enter a title" />
      </div>
      <base-confirm button-text="Add column" @confirm="handleConfirm" @cancel="handleCancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'
import { ref, nextTick, watch } from 'vue'
import { useKanbanStore } from '../../stores/kanban'
import BaseConfirm from '../Base/BaseConfirm.vue'

const { textarea, input } = useTextareaAutosize({ styleProp: 'minHeight' })

const { addColumn } = useKanbanStore()

const isAddAColumnInputVisible = ref(false)

function handleCancel() {
  isAddAColumnInputVisible.value = false
  input.value = ''
}

function handleConfirm() {
  if (input.value) {
    addColumn(input.value)
    handleCancel()
  }
}

watch(isAddAColumnInputVisible, (newVal) => {
  if (newVal) {
    nextTick(() => textarea.value?.focus())
  }
})
</script>