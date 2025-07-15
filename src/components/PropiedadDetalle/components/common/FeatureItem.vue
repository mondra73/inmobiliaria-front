<template>
  <div class="flex items-center space-x-2">
    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
      <component :is="iconComponent" class="w-4 h-4 text-blue-600" />
    </div>
    <div>
      <p class="text-sm text-slate-600">{{ label }}</p>
      <p v-if="!editando" class="font-medium text-slate-900">{{ value || '-' }}</p>
      <input 
        v-else 
        v-model="localValue" 
        type="number" 
        class="w-16 border rounded p-1"
        @input="$emit('update', Number($event.target.value))"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import * as icons from 'lucide-vue-next' // o el paquete que estés usando

const props = defineProps({
  label: String,
  value: [String, Number],
  editando: Boolean,
  icon: String
})

const emit = defineEmits(['update'])

const localValue = ref(props.value)

watch(localValue, (newVal) => {
  emit('update', newVal)
})

const iconComponent = computed(() => icons[props.icon] || null)
</script>
