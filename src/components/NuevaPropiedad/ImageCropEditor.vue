<template>
  <div class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 max-w-4xl w-full mx-4">
      <h3 class="text-lg font-medium mb-4">Ajustar encuadre de la imagen</h3>

      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Editor de imagen -->
        <div class="flex-1">
          <div class="relative border-2 border-gray-300 rounded-lg overflow-hidden"
               :style="{ aspectRatio: '16/9', maxHeight: '400px' }">
            <img
              ref="imageRef"
              :src="imageUrl"
              class="absolute inset-0 w-full h-full object-cover"
              :style="{
                transform: `scale(${zoom}) translate(${offsetX * 100}%, ${offsetY * 100}%)`,
                transformOrigin: 'center center'
              }"
            />

            <!-- Overlay de guía -->
            <div class="absolute inset-0 border-2 border-white border-dashed pointer-events-none"></div>
          </div>

          <!-- Controles -->
          <div class="mt-4 space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Zoom: {{ (zoom * 100).toFixed(0) }}%</label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                v-model="zoom"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Posición X</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  v-model="offsetX"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Posición Y</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  v-model="offsetY"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Previsualización -->
        <div class="lg:w-64">
          <h4 class="font-medium mb-2">Vista previa</h4>
          <div class="border-2 border-gray-300 rounded-lg overflow-hidden" style="aspect-ratio: 16/9;">
            <img
              :src="imageUrl"
              class="w-full h-full object-cover"
              :style="{
                objectPosition: `${offsetX * 100}% ${offsetY * 100}%`,
                transform: `scale(${zoom})`,
                transformOrigin: `${offsetX * 100}% ${offsetY * 100}%`
              }"
            />
          </div>

          <div class="mt-4 text-xs text-gray-600">
            <p>• Usa los controles para ajustar el encuadre</p>
            <p>• La vista previa muestra cómo se verá en el sitio</p>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm"
        >
          Cancelar
        </button>
        <button
          @click="resetToDefault"
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm"
        >
          Restablecer
        </button>
        <button
          @click="saveCrop"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  imageUrl: String,
  initialOffsetX: { type: Number, default: 0.5 },
  initialOffsetY: { type: Number, default: 0.5 },
  initialZoom: { type: Number, default: 1.0 }
})

const emit = defineEmits(['save', 'cancel'])

const offsetX = ref(props.initialOffsetX)
const offsetY = ref(props.initialOffsetY)
const zoom = ref(props.initialZoom)

const saveCrop = () => {
  emit('save', {
    offsetX: offsetX.value,
    offsetY: offsetY.value,
    zoom: zoom.value
  })
}

const resetToDefault = () => {
  offsetX.value = 0.5
  offsetY.value = 0.5
  zoom.value = 1.0
}
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
}
</style>
