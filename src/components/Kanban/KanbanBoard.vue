<template>
  <draggable
    v-model="kanban.columns"
    :disabled="isDraggingDisabled"
    item-key="id"
    tag="div"
    class="!ml-1 !mt-3 flex overflow-x-auto overflow-y-hidden" :group="{name: 'columns'}">
    <template #item="{element: column, index}">
      <kanban-column v-if="index !== kanban.columns.length - 1" :column="column" :column-index="index" />
      <kanban-column-add
        v-else
        @mouseenter="isDraggingDisabled = true"
        @mouseleave="isDraggingDisabled = false" />
    </template>
  </draggable>
</template>

<script setup lang="ts">
import KanbanColumn from './KanbanColumn.vue'
import KanbanColumnAdd from './KanbanColumnAdd.vue'
import { useKanbanStore } from '../../stores/kanban.ts'
import draggable from 'vuedraggable'
import { ref } from 'vue'

const { kanban } = useKanbanStore()
const isDraggingDisabled = ref(false)
</script>


