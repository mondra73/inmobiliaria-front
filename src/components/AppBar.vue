<template>
  <div>
    <v-app-bar app flat elevate-on-scroll color="surface" class="glass-app-bar">
      <!-- Logo en lugar del texto -->
      <v-img :src="logo" max-height="50" max-width="120" contain @click="goToHome" class="cursor-pointer"></v-img>

      <v-spacer></v-spacer>

      <!-- Desktop -->
      <div class="d-none d-md-flex">
        <template v-if="!isAuthenticated">
          <v-btn variant="text" class="text-white" @click="goToNosotros">Nosotros</v-btn>
          <v-btn variant="text" class="text-white" @click="router.push('/propiedades-publicas')">Propiedades</v-btn>
          <v-btn variant="text" class="text-white" @click="goToContacto">Contacto</v-btn>
        </template>
        <template v-else>
          <v-btn variant="text" class="text-white" @click="goToDashboard">Dashboard</v-btn>
          <v-btn variant="text" class="text-white" @click="handleLogout">Cerrar Sesión</v-btn>
        </template>
      </div>

      <!-- Mobile - Menú con activator directo -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon class="d-flex d-md-none" color="white" v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list class="glass-menu rounded-lg py-2" elevation="10" style="min-width: 160px;">
          <template v-if="!isAuthenticated">
            <v-list-item v-for="(item, index) in menuItems" :key="index" @click="navAction(item.id)" class="px-4">
              <v-list-item-title class="text-white">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item @click="goToDashboard" class="px-4">
              <v-list-item-title class="text-white">Dashboard</v-list-item-title>
            </v-list-item>
          </template>
          <v-divider v-if="isAuthenticated" class="my-1" />
          <v-list-item v-if="isAuthenticated" @click="handleLogout" class="px-4">
            <v-list-item-title class="text-white">Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/simbolo.png'

const router = useRouter()
const isAuthenticated = ref(false)

// Función para verificar si el usuario está autenticado
const checkAuthStatus = () => {
  isAuthenticated.value = !!localStorage.getItem('auth-token')
  console.log('Auth status changed:', isAuthenticated.value)
}

// Configuración de listeners
onMounted(() => {
  checkAuthStatus()
  window.addEventListener('auth-change', checkAuthStatus)
})

// Limpieza de listeners
onUnmounted(() => {
  window.removeEventListener('auth-change', checkAuthStatus)
})

const goToHome = () => {
  router.push('/')
}

const menuItems = [
  { id: 'nosotros', title: 'Nosotros' },
  { id: 'propiedades', title: 'Propiedades' },
  { id: 'consultar', title: 'Consultar' }
]

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

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
</style>