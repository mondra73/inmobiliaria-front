<template>
  <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
    <input
      type="checkbox"
      :id="'amenity-' + amenityKey"
      :checked="checked"
      :disabled="!editando"
      @change="$emit('update', $event.target.checked)"
      class="h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500"
    />
    <label :for="'amenity-' + amenityKey" class="text-sm font-medium text-slate-700 cursor-pointer">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  checked: Boolean,
  editando: Boolean,
  amenityKey: String
})

defineEmits(['update'])
</script>

<style scoped>
/* Efecto al hacer hover (solo en modo edición) */
input:disabled + label {
  @apply cursor-not-allowed opacity-75;
}
</style>