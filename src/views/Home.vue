<template>
  <div class="max-w-xl mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">Vue + TypeScript ToDo</h1>
    <input
      v-model="newTask"
      @keyup.enter="addTask"
      placeholder="Add a task"
      class="border p-2 w-full mb-4"
    />

    <TaskFilter @filter="filter = $event" />

    <transition-group name="fade" tag="ul" class="list-none p-0">
      <draggable
        v-model="tasks"
        :list="tasks"
        item-key="id"
        @update="onDragEnd"
        tag="ul"
      >
        <template #item="{ element: task }">
          <TaskItem
            v-if="passesFilter(task)"
            :task="task"
            @toggle="toggleTask"
            @remove="removeTask"
            :key="task.id"
          />
        </template>
      </draggable>
    </transition-group>
    
    <div class="mt-4 font-semibold">
      Completed: {{ completedCount }} / {{ tasks.length }}
    </div>

    <button @click="toggleTheme" class="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
      Toggle Theme
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import draggable from 'vuedraggable'
import TaskItem from '../components/TaskItem.vue'
import TaskFilter from '../components/TaskFilter.vue'
import type { Task } from '../types/task'

const newTask = ref('')
const tasks = ref<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]') || [
  { id: 1, title: 'Learn Vue 3', completed: false },
  { id: 2, title: 'Use TypeScript', completed: true },
])

const filter = ref('all')

watch(tasks, (val) => {
  localStorage.setItem('tasks', JSON.stringify(val))
}, { deep: true })

const addTask = () => {
  if (!newTask.value.trim()) return
  tasks.value.push({
    id: Date.now(),
    title: newTask.value,
    completed: false
  })
  newTask.value = ''
}

const toggleTask = (id: number) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.completed = !task.completed
}

const removeTask = (id: number) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

const onDragEnd = () => {

}

const passesFilter = (task: Task) => {
  if (filter.value === 'completed') return task.completed
  if (filter.value === 'active') return !task.completed
  return true
}

const completedCount = computed(() => tasks.value.filter(t => t.completed).length)

const theme = ref(localStorage.getItem('theme') || 'light')
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('theme', theme.value)
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
}

document.documentElement.classList.toggle('dark', theme.value === 'dark')

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>