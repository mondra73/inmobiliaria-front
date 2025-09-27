<template>
  <aside class="w-64 bg-white shadow-sm border-r border-gray-100 min-h-screen relative">
    <div class="p-6">
      <h1 class="text-xl font-light text-slate-900">
        Panel de <span class="font-semibold">Control</span>
      </h1>
    </div>

    <nav class="px-6 space-y-2">
      <RouterLink
        to="/dashboard"
        :class="[
          'flex items-center space-x-3 p-3 rounded-xl transition-colors duration-200 cursor-pointer',
          currentRoute === '/dashboard'
            ? 'bg-slate-100 text-slate-900'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        ]">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
        </svg>
        <span :class="currentRoute === '/dashboard' ? 'font-medium' : ''">Dashboard</span>
      </RouterLink>

      <RouterLink
        to="/propiedades"
        :class="[
          'flex items-center space-x-3 p-3 rounded-xl transition-colors duration-200 cursor-pointer',
          currentRoute === '/propiedades'
            ? 'bg-slate-100 text-slate-900'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        ]">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
          </path>
        </svg>
        <span :class="currentRoute === '/propiedades' ? 'font-medium' : ''">Propiedades</span>
      </RouterLink>

      <RouterLink
        to="/operaciones"
        :class="[
          'flex items-center space-x-3 p-3 rounded-xl transition-colors duration-200 cursor-pointer',
          currentRoute === '/operaciones'
            ? 'bg-slate-100 text-slate-900'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        ]">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
          </path>
        </svg>
        <span :class="currentRoute === '/operaciones' ? 'font-medium' : ''">Operaciones</span>
      </RouterLink>

      <RouterLink
        to="/clientes"
        :class="[
          'flex items-center space-x-3 p-3 rounded-xl transition-colors duration-200 cursor-pointer',
          currentRoute === '/clientes'
            ? 'bg-slate-100 text-slate-900'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        ]">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
          </path>
        </svg>
        <span :class="currentRoute === '/clientes' ? 'font-medium' : ''">Clientes</span>
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

    <!-- Usuario -->
    <div class="absolute bottom-6 left-6 right-6">
      <div class="bg-slate-50 rounded-xl p-4">
        <div class="flex items-center space-x-3 relative">
          <div class="relative">
            <div class="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <p class="font-medium text-slate-900 text-sm">{{ userData.nombre || 'Usuario' }}</p>
            <p class="text-slate-600 text-xs">En línea</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userData = ref({ nombre: '' })

// Obtener la ruta actual para resaltar el menú activo
const currentRoute = computed(() => route.path)

// Función para decodificar el token JWT
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))

    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

// Obtener datos del usuario al montar el componente
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
