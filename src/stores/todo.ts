import { defineStore } from 'pinia'
import type { Todo } from '../types/todo'
import { Kanban } from '../types/kanban'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    kandan: null as Kanban | null,
    todos: [] as Todo[],
  }),
  actions: {
    addTodo(todo: Todo) {
      this.todos.push(todo)
    },
    toggleTodo(id: string) {
      const todo = this.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    deleteTodo(id: string) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    },
  },
})
