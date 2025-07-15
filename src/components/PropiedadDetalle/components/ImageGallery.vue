<template>
  <div class="relative bg-white rounded-3xl border border-gray-100 overflow-hidden">
    <!-- Imagen principal -->
    <img :src="imagenActual?.url || '/placeholder.svg'" :alt="imagenActual?.descripcion"
      class="w-full h-96 object-cover cursor-pointer" @click="abrirModal" />

    <!-- Botones de navegación -->
    <button v-if="imagenSeleccionada > 0" @click="anteriorImagen"
      class="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60">
      ‹
    </button>
    <button v-if="imagenSeleccionada < imagenes.length - 1" @click="siguienteImagen"
      class="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60">
      ›
    </button>

    <!-- Editor en modo edición -->
    <div v-if="editando" class="p-4 border-t">
      <h3 class="font-medium mb-2">Administrar imágenes</h3>
      <input type="file" multiple @change="handleImageUpload" class="mb-4" accept="image/*" ref="fileInput" />

      <div class="grid grid-cols-4 gap-2">
        <div v-for="(imagen, index) in imagenes" :key="index" class="relative group">
          <img :src="imagen.url" :class="[
            'w-full h-20 object-cover rounded-lg',
            imagenSeleccionada === index ? 'ring-2 ring-blue-500' : ''
          ]" />
          <button @click.stop="eliminarImagen(index)"
            class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
            ×
          </button>
          <input v-model="imagen.descripcion" placeholder="Descripción"
            class="text-xs w-full mt-1 p-1 border rounded" />
        </div>
      </div>
    </div>

    <!-- Miniaturas en modo visualización -->
    <div v-else-if="imagenes.length > 1" class="p-4">
      <div class="grid grid-cols-4 gap-2">
        <div v-for="(imagen, index) in imagenes" :key="index" class="relative cursor-pointer"
          @click="seleccionarImagen(index)">
          <img :src="imagen.url" :alt="imagen.descripcion" :class="[
            'w-full h-20 object-cover rounded-lg hover:opacity-80',
            imagenSeleccionada === index ? 'ring-2 ring-blue-500' : ''
          ]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imagenes: Array,
  editando: Boolean,
  imagenSeleccionada: Number,
  imagenActual: Object
})

const emit = defineEmits([
  'image-upload',
  'image-remove',
  'select-image',
  'prev-image',
  'next-image',
  'open-modal'
])

const handleImageUpload = (e) => emit('image-upload', e)
const eliminarImagen = (index) => emit('image-remove', index)
const seleccionarImagen = (index) => emit('select-image', index)
const anteriorImagen = () => emit('prev-image')
const siguienteImagen = () => emit('next-image')
const abrirModal = () => emit('open-modal')
</script>
