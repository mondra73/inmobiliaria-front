<template>
  <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
    <input 
      type="checkbox" 
      :checked="checked" 
      :disabled="!editando"
      @change="$emit('update', $event.target.checked)"
      class="checkbox"
    />
    <span class="text-sm font-medium">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  checked: Boolean,
  editando: Boolean
})
</script>