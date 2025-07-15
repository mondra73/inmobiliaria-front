<template>
  <div class="flex items-center space-x-4 mb-8">
    <button @click="handleVolver" class="btn-volver">
      <svg class="w-4 h-4 mr-2"><!-- Icono flecha --></svg>
      Volver
    </button>

    <div class="flex-1">
      <div class="flex items-center space-x-3 mb-2">
        <!-- Operación -->
        <span class="badge-operacion">
          <span v-if="!editando">{{ propiedad.operacion }}</span>
          <select v-else v-model="form.operacion" class="badge-operacion">
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </span>

        <!-- Visibilidad -->
        <button @click="toggleVisibilidad" :class="['badge-visibilidad', editando ? '' : 'opacity-50']">
          {{ editando ? form.visible ? 'Visible' : 'Oculta' : propiedad.visible ? 'Visible' : 'Oculta' }}
        </button>

        <!-- Tipo -->
        <span class="badge-tipo">{{ propiedad.tipo }}</span>
      </div>

      <!-- Título -->
      <h1 v-if="!editando" class="text-3xl font-light">{{ propiedad.tituloPublicacion }}</h1>
      <input v-else v-model="form.tituloPublicacion" class="input-titulo" />
    </div>

    <div class="flex space-x-2">
      <template v-if="puedeEditarEliminar">
        <button v-if="!editando" @click="$emit('edit')" class="btn-editar">Editar</button>
        <template v-else>
          <button @click="$emit('save')" class="btn-guardar">Guardar</button>
          <button @click="$emit('cancel')" class="btn-cancelar">Cancelar</button>
        </template>
        <button @click="$emit('delete')" :class="['btn-eliminar', eliminando ? 'opacity-50' : '']">
          {{ eliminando ? 'Eliminando...' : 'Eliminar' }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  propiedad: Object,
  form: Object,
  editando: Boolean,
  eliminando: Boolean,
  puedeEditarEliminar: Boolean
})

const emit = defineEmits(['edit', 'save', 'cancel', 'delete'])

const toggleVisibilidad = () => {
  if (props.editando) {
    emit('update:visible', !props.form.visible)
  }
}
</script>