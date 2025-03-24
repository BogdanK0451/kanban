<script setup lang="ts">
import BaseAppbar from '../components/Base/BaseAppBar.vue'
import KanbanBoard from '../components/Kanban/KanbanBoard.vue'
</script>

<template>
  <div class="flex flex-col h-full  bg-gradient-to-br from-[#22272B] via-[#282F27] to-[#647D75]">
    <base-appbar class="h-14 flex-none" title="Kanban MDS" />
    <kanban-board class="flex-grow" />
  </div>
</template>
  

  