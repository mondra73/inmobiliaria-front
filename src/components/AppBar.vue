<template>
  <v-app-bar
    app
    flat
    elevate-on-scroll
    class="glass-app-bar"
  >
    <v-toolbar-title class="font-weight-bold text-white">Espinosa</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn text class="text-white" @click="scrollTo('nosotros')">Nosotros</v-btn>
    <v-btn text class="text-white" @click="scrollTo('servicios')">Servicios</v-btn>
    <v-btn text class="text-white" @click="scrollTo('propiedades')">Propiedades</v-btn>
    <v-btn text class="text-white" @click="scrollTo('contacto')">Contacto</v-btn>
  </v-app-bar>
</template>

<script setup>
const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.glass-app-bar {
  background-color: rgba(0, 0, 0, 0.6) !important; /* Igual al footer */
  backdrop-filter: blur(6px);
  transition: background-color 0.3s ease;
}

/* Si quisieras que cambie al hacer scroll, podés ajustar esto */
.v-toolbar--scroll.glass-app-bar {
  background-color: rgba(0, 0, 0, 0.6) !important; /* Mismo color al hacer scroll también */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* sombra opcional al hacer scroll */
}

.glass-app-bar {
  background-color: #1e1e1e !important; /* mismo tono del footer */
  color: white;
}

</style>
