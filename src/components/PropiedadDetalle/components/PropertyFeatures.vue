<template>
  <div class="card">
    <h2 class="card-title">Características</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <FeatureItem 
        v-for="feature in activeFeatures" 
        :key="feature.key"
        :label="feature.label"
        :value="editando ? form[feature.key] : propiedad[feature.key]"
        :editando="editando"
        @update="val => form[feature.key] = val"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FeatureItem from './common/FeatureItem.vue'

const props = defineProps({
  propiedad: Object,
  form: Object,
  editando: Boolean
})

const activeFeatures = computed(() => {
  const tipo = props.propiedad.tipo
  const allFeatures = [
    { key: 'habitaciones', label: 'Dormitorios', show: ['Casa', 'Departamento'] },
    { key: 'baños', label: 'Baños', show: ['Casa', 'Departamento', 'Local'] },
    { key: 'superficieTotal', label: 'Sup. Total (m²)', show: ['*'] }
  ]
  
  return allFeatures.filter(f => 
    f.show.includes('*') || f.show.includes(tipo)
  )
})
</script>