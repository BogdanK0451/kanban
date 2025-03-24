<template>
  <draggable
    v-model="kanban.columns"
    :disabled="isDraggingDisabled"
    item-key="id"
    tag="div"
    :move="onMoveCallback"
    class="!ml-1 !mt-3 flex overflow-x-auto overflow-y-hidden" :group="{name: 'columns'}">
    <template #item="{element: column, index}">
      <kanban-column
        v-if="index !== kanban.columns.length - 1" :column="column" :column-index="index"
        @mouseleave="isDraggingDisabled = false" />
      <kanban-column-add
        v-else
        @added-column="isDraggingDisabled = false"
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

//don't know how to get the type of this event
//disabling dragging incase it's the dummy element being moved, or something being moved in its position
function onMoveCallback(evt: any) {
  if (evt.draggedContext.element.title === 'DummyElement') {
    return false
  } else if (evt.draggedContext.futureIndex === kanban.columns.length - 1) {
    {
      return false
    }
  }
  return true
}
</script>


