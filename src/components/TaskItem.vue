<template>
  <li class="flex justify-between items-center p-2 border-b">
    <span :class="{ 'line-through': task.completed }">{{ task.title }}</span>
    <button @click="$emit('toggle', task.id)" class="text-sm text-blue-500">Toggle</button>
  </li>
</template>

<script lang="ts" setup>
import type { Task } from '../types/task'

defineProps<{
  task: Task
}>()

defineEmits<{
  (e: 'toggle', id: number): void
}>()
</script>