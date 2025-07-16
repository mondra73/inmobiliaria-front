<template>
  <div>
    <v-app-bar app flat elevate-on-scroll class="white-app-bar" height="110">
      <!-- Logo -->
      <v-img :src="logo" max-height="100" max-width="150" contain @click="goToHome" class="cursor-pointer ml-6"></v-img>
      <v-spacer></v-spacer>
      <!-- Desktop -->
      <div class="d-none d-md-flex pr-12">
        <template v-if="!isAuthenticated">
          <v-btn variant="text" class="text-black nav-btn" @click="router.push('/propiedades-publicas')">Propiedades</v-btn>
          <v-btn variant="text" class="text-black nav-btn" @click="goToContacto">Contacto</v-btn>
        </template>
        <template v-else>
          <v-btn variant="text" class="text-black nav-btn" @click="goToDashboard">Dashboard</v-btn>
          <v-btn variant="text" class="text-black nav-btn" @click="handleLogout">Cerrar Sesión</v-btn>
        </template>
      </div>
      <!-- Mobile - Menú -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon class="d-flex d-md-none" color="black" v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list class="rounded-lg py-2 mobile-menu-list" elevation="10" style="min-width: 160px;">
          <template v-if="!isAuthenticated">
            <v-list-item v-for="(item, index) in menuItems" :key="index" @click="navAction(item.id)" class="px-4">
              <v-list-item-title class="menu-item-text">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item @click="goToDashboard" class="px-4">
              <v-list-item-title class="menu-item-text">Dashboard</v-list-item-title>
            </v-list-item>
          </template>
          <v-divider v-if="isAuthenticated" class="my-1" />
          <v-list-item v-if="isAuthenticated" @click="handleLogout" class="px-4">
            <v-list-item-title class="menu-item-text">Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/simbolo-completo.png'

const router = useRouter()
const isAuthenticated = ref(false)

// Función para verificar si el usuario está autenticado
const checkAuthStatus = () => {
  isAuthenticated.value = !!localStorage.getItem('auth-token')
  console.log('Auth status changed:', isAuthenticated.value)
}

// Configuración de listeners
onMounted(() => {
  window.addEventListener('auth-change', checkAuthStatus)
  checkAuthStatus()
})

// Limpieza de listeners
onUnmounted(() => {
  window.removeEventListener('auth-change', checkAuthStatus)
})

const goToHome = () => {
  router.push('/')
}

const menuItems = [
  // { id: 'nosotros', title: 'Nosotros' },
  { id: 'propiedades', title: 'Propiedades' },
  { id: 'consultar', title: 'Consultar' }
]

const navAction = (id) => {
  if (id === 'consultar') {
    goToContacto()
  } else if (id === 'propiedades') {
    router.push('/propiedades-publicas')
  } else if (id === 'nosotros') {
    goToNosotros()
  }
}

const goToContacto = () => {
  router.push('/contacto')
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const goToNosotros = () => {
  router.push('/nosotros')
}

const handleLogout = () => {
  localStorage.removeItem('auth-token')
  isAuthenticated.value = false
  router.push('/')
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.custom-app-bar {
  display: grid;
  grid-template-rows: 30% 70%;
  height: 110px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
}

.top-bar {
  background-color: var(--v-surface-base);
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.bottom-bar {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.logo-img {
  max-width: 150px;
}

.white-app-bar {
  background-color: #F9FAFB !important;
  color: black !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.mobile-menu-list {
  background-color: #F9FAFB !important; /* Mismo color que AppBar */
  font-family: 'Ubuntu', sans-serif !important;
}

.v-list-item:hover {
  background-color: rgba(148, 163, 184, 0.1) !important;
}

body {
  padding-top: 110px !important;
}

/* Estilos mejorados para los botones de navegación */
.nav-btn {
  font-family: 'Ubuntu', sans-serif !important;
  font-size: 1.170rem !important;
  font-weight: 400 !important;
  letter-spacing: 0.025em !important;
  text-transform: none !important;
  color: #334155 !important; /* Color slate-700 similar al home */
  transition: all 0.2s ease !important;
  margin: 1 8px !important;
  padding: 8px 16px !important;
}

.nav-btn:hover {
  color: #1e293b !important; /* Color slate-800 para hover */
  background-color: rgba(148, 163, 184, 0.1) !important; /* Hover sutil */
}

/* Estilos para el menú móvil */
.menu-item-text {
  font-family: 'Ubuntu', sans-serif !important;
  font-size: 0.95rem !important;
  font-weight: 400 !important;
  letter-spacing: 0.025em !important;
  color: #334155 !important;
  line-height: 1.5 !important;
}

.glass-app-bar {
  background-color: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background-color 0.3s ease;
}
</style>
