<template>
  <div class="flex gap-2 my-4">
    <button @click="$emit('filter', 'all')" class="btn">All</button>
    <button @click="$emit('filter', 'active')" class="btn">Active</button>
    <button @click="$emit('filter', 'completed')" class="btn">Completed</button>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: 'filter', value: string): void
}>()
</script>

<style scoped>
.btn {
  @apply bg-gray-200 px-4 py-1 rounded hover:bg-gray-300;
}
</style>