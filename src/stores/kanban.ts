import { defineStore } from 'pinia'
import { Kanban } from '../types/kanban'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

export const useKanbanStore = defineStore('kanban', () => {
  const kanban = useStorage(
    'kanban-data',
    ref<Kanban>({
      columns: [
        {
          title: 'Todo',
          tasks: [],
        },
        {
          title: 'In progress',
          tasks: [],
        },
        {
          title: 'Done',
          tasks: [],
        },
      ],
    }),
  )

  function addColumn(title: string) {
    kanban.value.columns.push({ title, tasks: [] })
  }
  function renameColumn(newName: string, index: number) {
    console.log(newName, index)
    if (newName) {
      kanban.value.columns[index].title = newName
    }
  }
  function addTask(title: string, index: number) {
    if (title) {
      kanban.value.columns[index].tasks.push({ title, completed: false, description: '', due: new Date() })
    }
  }
  function removeTask(taskIndex: number, columnIndex: number) {
    kanban.value.columns[columnIndex].tasks.splice(taskIndex, 1)
  }

  function removeColumn(index: number) {
    kanban.value.columns.splice(index, 1)
  }

  return { kanban, addColumn, removeColumn, renameColumn, addTask, removeTask }
})
