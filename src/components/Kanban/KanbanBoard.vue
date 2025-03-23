

<template>
  <div class="!ml-1 !mt-3 flex overflow-x-auto">
    <template v-for="[index, column] of kanban.columns.entries()" :key="column"> 
      <kanban-column :column="column" :column-index="index" />
    </template>
    <kanban-column-add />
  </div>
</template>

<script setup lang="ts">
import KanbanColumn from './KanbanColumn.vue'
import KanbanColumnAdd from './KanbanColumnAdd.vue'
import { useKanbanStore } from '../../stores/kanban.ts'

const { kanban } = useKanbanStore()
</script>