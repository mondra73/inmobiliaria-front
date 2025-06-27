<template>
  <div>
    <v-app-bar app flat elevate-on-scroll color="surface" class="glass-app-bar">
      <!-- Logo en lugar del texto -->
      <v-img :src="logo" max-height="60" max-width="120" contain @click="goToHome"
        class="cursor-pointer"></v-img>

      <v-spacer></v-spacer>

      <!-- Desktop -->
      <div class="d-none d-md-flex">
        <v-btn variant="text" class="text-white" @click="scrollTo('nosotros')">Nosotros</v-btn>
        <v-btn variant="text" class="text-white" @click="scrollTo('propiedades')">Propiedades</v-btn>
        <v-btn variant="text" class="text-white" @click="goToContacto">Consultar</v-btn>
        <v-btn variant="text" class="text-white" @click="goToLogin">Login</v-btn>
      </div>

      <!-- Mobile - Menú con activator directo -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon class="d-flex d-md-none" color="white" v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list class="glass-menu rounded-lg py-2" elevation="10" style="min-width: 160px;">
          <v-list-item v-for="(item, index) in menuItems" :key="index" @click="navAction(item.id)" class="px-4">
            <v-list-item-title class="text-white">{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-divider class="my-1" />
          <v-list-item @click="goToLogin" class="px-4">
            <v-list-item-title class="text-white">Login</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/logo-principal.png'

const router = useRouter()

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
  } else {
    scrollTo(id)
  }
}

const goToLogin = () => {
  router.push('/login')
}

const goToContacto = () => {
  router.push('/contacto')
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>