<template>
  <div>
    <v-app-bar app flat elevate-on-scroll color="surface" class="glass-app-bar">
      <v-toolbar-title class="font-weight-bold text-white">Espinosa</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Desktop -->
      <div class="d-none d-md-flex">
        <v-btn variant="text" class="text-white" @click="scrollTo('nosotros')">Nosotros</v-btn>
        <v-btn variant="text" class="text-white" @click="scrollTo('servicios')">Servicios</v-btn>
        <v-btn variant="text" class="text-white" @click="scrollTo('propiedades')">Propiedades</v-btn>
        <v-btn variant="text" class="text-white" @click="scrollTo('contacto')">Contacto</v-btn>
        <v-btn variant="text" class="text-white" @click="goToLogin">Login</v-btn>
      </div>

      <!-- Mobile -->
      <v-menu
        v-model="menuOpen"
        activator="parent"
        transition="scale-transition"
        location="top end"
        offset-y
      >
        <template #activator="{ props }">
          <v-btn icon class="d-flex d-md-none" color="white" v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list class="glass-menu rounded-lg py-2" elevation="10" style="min-width: 160px;">
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            @click="navAction(item.id)"
            class="px-4"
          >
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

const menuOpen = ref(false)
const router = useRouter()

const menuItems = [
  { id: 'nosotros', title: 'Nosotros' },
  { id: 'servicios', title: 'Servicios' },
  { id: 'propiedades', title: 'Propiedades' },
  { id: 'contacto', title: 'Contacto' }
]

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const navAction = (id) => {
  scrollTo(id)
  menuOpen.value = false
}

const goToLogin = () => {
  menuOpen.value = false
  router.push('/login')
}
</script>

<style scoped>
.glass-app-bar {
  background-color: rgba(30, 30, 30, 0.9) !important;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1000;
}

.glass-menu {
  background-color: rgba(30, 30, 30, 0.95) !important;
  backdrop-filter: blur(10px);
}

.text-white {
  color: white !important;
}

.v-list-item {
  min-height: 42px !important;
}
</style>
