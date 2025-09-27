<template>
  <div class="bg-slate-50 min-h-screen flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Contenido principal -->
    <main class="flex-1 p-8">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../ui/SidebarView.vue'
</script>
