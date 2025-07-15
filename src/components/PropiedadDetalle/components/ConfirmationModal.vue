<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 max-w-md w-full">
      <h3 class="text-lg font-medium mb-4">Confirmar</h3>
      <p class="mb-6"><slot></slot></p>
      <div class="flex justify-end space-x-3">
        <button @click="$emit('cancel')" class="btn-secondary">Cancelar</button>
        <button @click="$emit('confirm')" class="btn-danger">Confirmar</button>
      </div>
    </div>
  </div>
</template>