<template>
  <div class="bg-slate-50 min-h-screen flex">
    <DashboardLayout>

    <!-- Contenido principal -->
    <div class="flex-1 p-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl font-light text-slate-900">
            Bienvenido al <span class="font-semibold">Dashboard</span>
          </h2>
          <p class="text-slate-600 mt-1">Gestiona tu inmobiliaria desde aquí</p>
        </div>
        <button @click="irANuevaPropiedad"
          class="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-md">
          + Nueva Propiedad
        </button>

      </div>

      <!-- Métricas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-slate-600 font-medium">Total Propiedades</h3>
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
          <p class="text-4xl font-light text-slate-900">42</p>
          <p class="text-green-600 text-sm mt-2">+12% este mes</p>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-slate-600 font-medium">Para Vender</h3>
            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 13h6a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2zM3 19h6a2 2 0 002-2v-2a2 2 0 00-2-2H3a2 2 0 00-2 2v2a2 2 0 002 2zM15 9h6a2 2 0 002-2V3a2 2 0 00-2-2h-6a2 2 0 00-2 2v4a2 2 0 002 2zM15 19h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p class="text-4xl font-light text-slate-900">8</p>
          <p class="text-green-600 text-sm mt-2">+25% este mes</p>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-slate-600 font-medium">Para Alquilar</h3>
            <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.243-2A8.001 8.001 0 0119.419 15m0 0h-4m-4-1l-1.22m-2.141 1.22A8.005 8.005 0 0112 12.057l4.39-4.39 3.182 3.182z" />
              </svg>
            </div>
          </div>
          <p class="text-4xl font-light text-slate-900">$24k</p>
          <p class="text-red-600 text-sm mt-2">-5% este mes</p>
        </div>
      </div>
    </div>
    </DashboardLayout>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import DashboardLayout from '../components/ui/DashboardLayout.vue'

const router = useRouter()

function irANuevaPropiedad() {
  router.push('/nueva-propiedad')
}

</script>

<style scoped></style>
