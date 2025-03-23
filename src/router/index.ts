import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/kanban',
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('../views/TodoView.vue'),
    },
    {
      path: '/kanban',
      name: 'kanban',
      component: () => import('../views/KanbanView.vue'),
    },
  ],
})

export default router
