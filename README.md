# Kanban and To-Do Application

## Project Overview

This project was developed as part of an assignment, using Vue.js and related 3rd party libraries.

### Core Features
1. **To-Do Application:**
    - Add, delete, and toggle completion status of todos
    - Filter todos by status (All, Active, Completed)
    - Store todos in client-side state (Pinia)
    - Responsive design 

2. **Kanban Application:**
   - Create, rename, and delete columns.
   - Add and delete tasks within columns.
   - Drag and drop tasks between columns or reorder them inside a single column.
   - Drag and drop columns to reorder them.
   - Persist kanban state in `localStorage` to retain data after page refresh.

## Notes regarding the project
- Curently for the sake of time, the task themselves only consist of a title.
- The add column "button" cannot be moved, it's attached to the right end of the flex container.
- Incase of lots of columns, columns overflow on the x axis.
- Incase of lots of tasks inside a column, when reaching viewport height, an internal scrollbar attached to the column container will appear.
- While adding a column or a task, dropping/losing focus(blur event) of the input "resets the operation".
- Todos can be accessed at https://bogdank0451.github.io/todos
- Kanban can be accessed at https://bogdank0451.github.io/kanban/

## Project Structure

### Used dependencies
- **`vuedraggable`**: Enables drag-and-drop functionality for tasks and columns in the Kanban board.
- **`vue-i18n`**: Helps with and standardizes localization.
- **`@vueuse/core`**: Contains utility functions for Vue.
- **`tailwindcss`**: CSS framework for creating a responsive and modern design.
- **`husky`** & **`@commitlint/cli`**: Enforces commit message standards and pre-commit hooks.
- **`gh-pages`**: Simplifies deployment to GitHub Pages.

### Key Files and Directories
- **`types/`**: Type definitions for `Todo` and `Kanban` entities.
  - `todo.ts`: Interface for To-Do tasks.
  - `kanban.ts`: Interfaces for the Kanban system (columns and tasks).
- **`stores/`**: Pinia stores for state management.
  - `todo.ts`: Store for To-Do functionality.
  - `kanban.ts`: Store for Kanban functionality with `localStorage` support.
- **`views/`**: Main application pages.
  - `ToDoView.vue`: To-Do application view.
  - `KanbanView.vue`: Kanban board view.
- **`components/`**: Reusable components.
  - `TodoForm.vue`, `TodoList.vue`, `TodoItem.vue`: Components for To-Do functionality.
  - `KanbanBoard.vue`, `KanbanColumn.vue`, `KanbanColumnAdd.vue`, `KanbanTask.vue`: Components for Kanban functionality.
  - `BaseAppBar.vue`, `BaseConfirm.vue`: Basic UI components.
- **`router/`**: Vue Router configuration for navigation between To-Do and Kanban views.


## Setup and Running

### Prerequisites
- Node.js
- npm 

## Project Setup

```bash
npm install
```

### Compile and Hot-Reload for Development

```bash
npm run dev
```

### Type-Check, Compile and Minify for Production

```bash
npm run build
```

### Deploying on github pages
```bash
npm run deploy
```