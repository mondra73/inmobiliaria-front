<template>
  <div class="bg-white rounded-3xl border border-gray-100 p-6">
    <h2 class="text-xl font-semibold mb-4">Descripción</h2>
    <p v-if="!editando" class="text-slate-700 whitespace-pre-line">{{ descripcion }}</p>
    <textarea 
      v-else 
      v-model="localDescripcion" 
      class="w-full border rounded p-2 h-32"
      @input="$emit('update', localDescripcion)"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  descripcion: String,
  editando: Boolean
})

const emit = defineEmits(['update'])

const localDescripcion = ref(props.descripcion)

watch(localDescripcion, (newVal) => {
  emit('update', newVal)
})
</script>