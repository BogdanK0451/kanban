<template>
  <div class="shrink-0 basis-2xs !mx-1">
    <div v-if="!isAddAColumnInputVisible" class="cursor-pointer mix-blend-overlay bg-white rounded-lg hover:bg-gray-300 transition-colors duration-200 " @click="isAddAColumnInputVisible = true;">
      <div class="text-gray-400 !py-[12px] !px-[12px]">
        <div>
          <span class="font-bold">
            +
          </span>
          <span class="font-medium text-sm  text-some-text">
            {{ $t('kanban.column.addAnother') }}
          </span>
        </div>
      </div>
    </div>
    <div v-else class="cursor-pointer hover:shadow-xl bg-kanban-black rounded-lg !px-[6px] !pt-1">
      <div>
        <textarea
          ref="textarea" v-model="input" 
          class=" outline-2 outline-gray-500 text-gray-300 text-sm resize-none rounded-sm w-full  bg-kanban-input !pl-2 !py-1"
          rows="1"
          :placeholder="$t('kanban.column.enterTitle')" @blur="handleCancel" />
      </div>
      <base-confirm :button-text="$t('kanban.column.add')" @confirm="handleConfirm" @cancel="handleCancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'
import { ref, nextTick, watch } from 'vue'
import { useKanbanStore } from '../../stores/kanban'
import BaseConfirm from '../Base/BaseConfirm.vue'

const emits = defineEmits(['added-column'])
const { textarea, input } = useTextareaAutosize({ styleProp: 'minHeight' })

const { addColumn } = useKanbanStore()

const isAddAColumnInputVisible = ref(false)

function handleConfirm() {
  if (input.value) {
    addColumn(input.value)
    isAddAColumnInputVisible.value = false
    input.value = ''
    emits('added-column')
  }
}

function handleCancel(event?: FocusEvent) {
  const relatedTarget = event?.relatedTarget as HTMLElement
  if (relatedTarget?.tagName === 'BUTTON') {
    if (relatedTarget.classList.contains('confirm-button')) {
      handleConfirm()
      return
    } else if (relatedTarget.classList.contains('cancel-button')) {
      isAddAColumnInputVisible.value = false
      input.value = ''
      return
    }
  }

  isAddAColumnInputVisible.value = false
  input.value = ''
}

watch(isAddAColumnInputVisible, (newVal) => {
  if (newVal) {
    nextTick(() => textarea.value?.focus())
  }
})
</script>