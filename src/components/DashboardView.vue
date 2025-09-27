<template>
  <DashboardLayout>
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

    <!-- Métricas de Propiedades -->
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
        <p class="text-4xl font-light text-slate-900">{{ metricas.propiedades?.total || 0 }}</p>
        <p class="text-green-600 text-sm mt-2">
          {{ metricas.propiedades?.distribucion?.venta || 0 }}% Venta •
          {{ metricas.propiedades?.distribucion?.alquiler || 0 }}% Alquiler
        </p>
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
        <p class="text-4xl font-light text-slate-900">{{ metricas.propiedades?.porOperacion?.venta || 0 }}</p>
        <p class="text-green-600 text-sm mt-2">+{{ metricas.propiedades?.distribucion?.venta || 0 }}% del total</p>
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
        <p class="text-4xl font-light text-slate-900">{{ metricas.propiedades?.porOperacion?.alquiler || 0 }}</p>
        <p class="text-green-600 text-sm mt-2">+{{ metricas.propiedades?.distribucion?.alquiler || 0 }}% del total</p>
      </div>
    </div>

    <!-- Métricas de Operaciones -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-slate-600 font-medium">Operaciones Totales</h3>
          <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
        </div>
        <p class="text-4xl font-light text-slate-900">{{ metricas.operaciones?.total || 0 }}</p>
        <p class="text-purple-600 text-sm mt-2">Operaciones históricas</p>
      </div>

      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-slate-600 font-medium">Ventas Concretadas</h3>
          <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
          </div>
        </div>
        <p class="text-4xl font-light text-slate-900">{{ metricas.operaciones?.porTipo?.venta || 0 }}</p>
        <p class="text-red-600 text-sm mt-2" v-if="metricas.operaciones?.montosTotales">
          ${{ metricas.operaciones.montosTotales.ventas.toLocaleString() }} total
        </p>
      </div>

      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-slate-600 font-medium">Alquileres Concretados</h3>
          <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        <p class="text-4xl font-light text-slate-900">{{ metricas.operaciones?.porTipo?.alquiler || 0 }}</p>
        <p class="text-orange-600 text-sm mt-2" v-if="metricas.operaciones?.montosTotales">
          ${{ metricas.operaciones.montosTotales.alquileres.toLocaleString() }} total
        </p>
      </div>
    </div>

    <!-- Resumen General -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
      <h3 class="text-xl font-light text-slate-900 mb-4">
        Resumen <span class="font-semibold">General</span>
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center p-4 bg-slate-50 rounded-xl">
          <p class="text-2xl font-bold text-slate-900">{{ metricas.resumen?.totalPropiedadesActivas || 0 }}</p>
          <p class="text-slate-600 text-sm">Propiedades Activas</p>
        </div>
        <div class="text-center p-4 bg-slate-50 rounded-xl">
          <p class="text-2xl font-bold text-slate-900">{{ metricas.resumen?.totalOperacionesHistoricas || 0 }}</p>
          <p class="text-slate-600 text-sm">Operaciones Históricas</p>
        </div>
        <div class="text-center p-4 bg-slate-50 rounded-xl">
          <p class="text-2xl font-bold text-slate-900" v-if="metricas.resumen">
            ${{ metricas.resumen.valorTotalTransacciones.toLocaleString() }}
          </p>
          <p class="text-slate-600 text-sm">Valor Total Transacciones</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '../components/ui/DashboardLayout.vue'
import api from '../api'

const router = useRouter()
const metricas = ref({})
const cargando = ref(false)

const irANuevaPropiedad = () => {
  router.push('/nueva-propiedad')
}

// Cargar métricas reales desde tu API
const cargarMetricas = async () => {
  cargando.value = true
  try {
    const response = await api.get('/admin/metricas')
    if (response.data.success) {
      metricas.value = response.data.data
    }
  } catch (error) {
    console.error('Error al cargar métricas:', error)
    // Valores por defecto en caso de error
    metricas.value = {
      propiedades: { total: 0, porOperacion: { venta: 0, alquiler: 0 } },
      operaciones: { total: 0, porTipo: { venta: 0, alquiler: 0 } }
    }
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  cargarMetricas()
})
</script>
