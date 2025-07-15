<template>
  <div 
    v-if="(editando && form?.amenities) || (!editando && propiedad?.amenities)" 
    class="bg-white rounded-3xl border border-gray-100 p-6"
  >
    <h2 class="text-xl font-semibold mb-4">Amenities</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
      <AmenityCheckbox 
        v-for="amenity in filteredAmenities" 
        :key="amenity.key"
        :label="amenity.label"
        :checked="editando 
          ? form?.amenities?.[amenity.key] 
          : propiedad?.amenities?.[amenity.key]"
        :editando="editando"
        @update="val => {
          if (editando && form?.amenities) {
            form.amenities[amenity.key] = val
          }
        }"
      />
    </div>
  </div>
</template>

<script setup>
import AmenityCheckbox from './common/AmenityCheckbox.vue'
import { computed } from 'vue'

const props = defineProps({
  propiedad: Object,
  form: Object,
  editando: Boolean,
  tipo: String
})

const amenitiesConfig = {
  Casa: [
    { key: 'piscina', label: 'Piscina' },
    { key: 'parrilla', label: 'Parrilla' },
    { key: 'jardin', label: 'Jardín' }
  ],
  Departamento: [
    { key: 'ascensor', label: 'Ascensor' },
    { key: 'gimnasio', label: 'Gimnasio' }
  ]
}

const filteredAmenities = computed(() => amenitiesConfig[props.tipo] || [])
</script>
