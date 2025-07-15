<template>
  <div class="bg-white rounded-3xl border border-gray-100 p-6">
    <h2 class="text-xl font-semibold mb-4">Servicios Básicos</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
      <ServiceCheckbox 
        v-for="service in services" 
        :key="service.key"
        :label="service.label"
        :checked="getChecked(service.key)"
        :editando="editando"
        @update="val => {
          if (editando && form?.servicios) {
            form.servicios[service.key] = val
          }
        }"
      />
    </div>
  </div>
</template>

<script setup>
import ServiceCheckbox from './common/ServiceCheckbox.vue'

const props = defineProps({
  propiedad: Object,
  form: Object,
  editando: Boolean
})

const services = [
  { key: 'agua', label: 'Agua corriente' },
  { key: 'luz', label: 'Luz eléctrica' },
  { key: 'cloacas', label: 'Cloacas' },
  { key: 'gas', label: 'Gas natural' }
]

const getChecked = (key) => {
  if (props.editando) {
    return props.form?.servicios?.[key] || false
  }
  return props.propiedad?.servicios?.[key] || false
}
</script>
