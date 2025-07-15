<template>
  <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="relative max-w-5xl w-full px-4">
      <img 
        :src="imagen?.url" 
        :alt="imagen?.descripcion || 'Imagen ampliada'" 
        class="w-full max-h-[90vh] object-contain rounded"
      />

      <button 
        @click="$emit('close')" 
        class="absolute top-4 right-4 text-white text-3xl"
        aria-label="Cerrar"
      >×</button>

      <button 
        @click.stop="$emit('prev')" 
        class="absolute left-2 top-1/2 -translate-y-1/2 text-white text-4xl"
        aria-label="Imagen anterior"
      >‹</button>

      <button 
        @click.stop="$emit('next')" 
        class="absolute right-2 top-1/2 -translate-y-1/2 text-white text-4xl"
        aria-label="Imagen siguiente"
      >›</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imagen: Object
})

defineEmits(['close', 'prev', 'next'])
</script>
