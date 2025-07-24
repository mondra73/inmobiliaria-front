<template>
  <div class="bg-slate-50 min-h-screen flex">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-sm border-r border-gray-100 min-h-screen relative">
      <div class="p-6">
        <h1 class="text-xl font-light text-slate-900">
          Panel de <span class="font-semibold">Control</span>
        </h1>
      </div>

      <nav class="px-6 space-y-2">
        <a @click="irADashboard"
          class="flex items-center space-x-3 p-3 rounded-xl bg-slate-100 text-slate-900 cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
          </svg>
          <span class="font-medium">Dashboard</span>
        </a>

        <a @click="irAPropiedades"
          class="flex items-center space-x-3 p-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-200 cursor-pointer">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
            </path>
          </svg>
          <span>Propiedades</span>
        </a>

        <RouterLink to="/operaciones"
          class="flex items-center space-x-3 p-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
            </path>
          </svg>
          <span>Operaciones</span>
        </RouterLink>

        <a href="#"
          class="flex items-center space-x-3 p-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
            </path>
          </svg>
          <span>Consultas</span>
        </a>

        <a href="#"
          class="flex items-center space-x-3 p-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
            </path>
          </svg>
          <span>Reportes</span>
        </a>
      </nav>

      <div class="absolute bottom-6 left-6 right-6">
        <div class="bg-slate-50 rounded-xl p-4">
          <div class="flex items-center space-x-3 relative">
            <!-- Avatar con icono de usuario y punto verde -->
            <div class="relative">
              <div class="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <!-- Punto verde de estado en línea -->
              <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <div>
              <p class="font-medium text-slate-900 text-sm">{{ userData.nombre || 'Usuario' }}</p>
              <p class="text-slate-600 text-xs">En línea</p>
            </div>
          </div>
        </div>
      </div>

    </div>

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
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const userData = ref({ nombre: '' })

function irANuevaPropiedad() {
  router.push('/nueva-propiedad')
}

function irADashboard() {
  router.push('/dashboard')
}

function irAPropiedades() {
  router.push('/propiedades')
}

// Función para decodificar el token JWT
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

onMounted(() => {
  const token = localStorage.getItem('auth-token')
  if (token) {
    const decoded = parseJwt(token)
    if (decoded) {
      userData.value = {
        nombre: decoded.nombre,
        mail: decoded.mail,
        rol: decoded.rol
      }
    }
  }
})

</script>

<style scoped></style>
