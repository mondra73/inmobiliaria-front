<template>
  <transition name="fade">
    <div v-if="visible" :class="['fixed bottom-4 right-4 px-4 py-3 rounded-xl text-sm', typeClasses]">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: String,
  visible: Boolean,
  type: {
    type: String,
    default: 'info',
    validator: (val) => ['info', 'success', 'error'].includes(val)
  }
})

const typeClasses = computed(() => ({
  'bg-blue-100 text-blue-800': props.type === 'info',
  'bg-green-100 text-green-800': props.type === 'success',
  'bg-red-100 text-red-800': props.type === 'error'
}))
</script>