<template>
  <div class="bg-white rounded-3xl border border-gray-100 p-6">
    <h2 class="text-xl font-semibold mb-4">Ubicación</h2>
    <div v-if="!editando" class="space-y-2">
      <p>{{ ubicacion.calle }} {{ ubicacion.altura }}</p>
      <p>{{ ubicacion.localidad }}</p>
    </div>
    <div v-else class="space-y-4">
      <input v-model="localUbicacion.calle" placeholder="Calle" class="input-field">
      <input v-model.number="localUbicacion.altura" type="number" placeholder="Altura" class="input-field">
      <input v-model="localUbicacion.localidad" placeholder="Localidad" class="input-field">
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  ubicacion: Object,
  editando: Boolean
})

const emit = defineEmits(['update'])

const localUbicacion = ref({ ...props.ubicacion })

watch(localUbicacion, (newVal) => {
  emit('update', newVal)
}, { deep: true })
</script>