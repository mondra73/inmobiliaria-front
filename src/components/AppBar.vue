<template>
  <v-app-bar
    app
    flat
    elevate-on-scroll
    color="surface"
    class="glass-app-bar"
  >
    <v-toolbar-title class="font-weight-bold text-white">Espinosa</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Desktop -->
    <div class="d-none d-md-flex">
      <v-btn variant="text" class="text-white" @click="scrollTo('nosotros')">Nosotros</v-btn>
      <v-btn variant="text" class="text-white" @click="scrollTo('servicios')">Servicios</v-btn>
      <v-btn variant="text" class="text-white" @click="scrollTo('propiedades')">Propiedades</v-btn>
      <v-btn variant="text" class="text-white" @click="scrollTo('contacto')">Contacto</v-btn>
    </div>

    <!-- Mobile -->
    <v-btn
      icon
      class="d-flex d-md-none"
      color="white"
      @click.stop="drawer = !drawer"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Menú móvil - Ahora con tamaño automático -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
    class="glass-menu"
    style="z-index: 1001; height: auto !important; min-height: 0 !important; top: 64px;"
    width="200"
  >
    <v-list density="compact" style="padding: 0;">
      <v-list-item 
        v-for="(item, index) in menuItems"
        :key="index"
        @click="navAction(item.id)"
        class="px-4"
      >
        <v-list-item-title class="text-white">{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
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
  drawer.value = false
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
  border-bottom-left-radius: 8px; /* Opcional: para esquinas redondeadas */
}

.text-white {
  color: white !important;
}

/* Estilo para los ítems del menú */
.v-list-item {
  min-height: 48px !important;
}
</style>