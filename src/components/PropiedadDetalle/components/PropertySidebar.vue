<template>
  <div class="space-y-6">
    <div class="bg-white rounded-3xl border border-gray-100 p-6">
      <div class="text-center mb-6">
        <div class="flex items-center justify-center mb-2">
          <span class="text-3xl font-light">
            {{ editando ? form.precio.monto : propiedad.precio.monto }}
          </span>
        </div>
        <p>Precio de {{ propiedad.operacion }}</p>
      </div>
      <hr class="my-4">
      <div class="space-y-4 text-sm">
        <div class="flex items-start space-x-3">
          <div>
            <p class="font-medium">Categoría</p>
            <p v-if="!editando">{{ propiedad.categoria }}</p>
            <input v-else v-model="form.categoria" class="input-field">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  propiedad: Object,
  form: Object,
  editando: Boolean
})
</script>