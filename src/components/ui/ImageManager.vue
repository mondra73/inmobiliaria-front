<template>
  <div>
    <input v-if="editando" type="file" ref="fileInput" class="hidden" multiple accept="image/*"
      @change="handleFileChange">

    <div v-if="editando" class="mb-4">
      <label @click="$refs.fileInput.click()"
        class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-slate-400 transition-colors duration-200 cursor-pointer block">
        <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-slate-600 mb-2">Arrastra las imágenes aquí o</p>
        <span class="text-slate-900 font-medium hover:text-slate-700 transition-colors duration-200">
          selecciona archivos
        </span>
        <p class="text-xs text-slate-500 mt-2">PNG, JPG hasta 10MB cada una</p>
      </label>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div v-for="(imagen, index) in imagenes" :key="index" class="relative group">
        <img :src="imagen.url" class="w-full h-32 object-cover rounded-lg">

        <button v-if="editando" @click="$emit('image-remove', index)"
          class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['image-upload', 'image-remove'])

const fileInput = ref(null)

const handleFileChange = async (e) => {
  const files = Array.from(e.target.files)
  if (files.length) {
    emit('image-upload', files)
    fileInput.value.value = '' // Reset input
  }
}
</script>
