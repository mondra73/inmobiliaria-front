<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <!-- Imagen vectorial más grande -->
        <v-img
          :src="vectorImage"
          contain
          max-height="70vh"
          class="mb-4 mx-auto"
        ></v-img>
        
        <h1 class="text-h3 font-weight-bold mb-4">Página no encontrada</h1>
        <p class="text-h6 mb-6">Lo sentimos, la página que buscas no existe o ha sido movida.</p>
        
        <!-- Botón con estilo similar a tu AppBar -->
        <v-btn
          variant="text"
          class="text-white bg-grey-darken-3"
          size="large"
          @click="goToHome"
        >
          Volver al inicio
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import vectorImage from '../assets/404.png'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.fill-height {
  min-height: calc(100vh - 128px);
  background-color: #1e1e1e; /* Fondo oscuro como tu AppBar */
}

/* Estilos para el texto */
.text-h3, .text-h6 {
  color: white; /* Texto blanco para contraste */
}

/* Estilo del botón similar a tu AppBar */
.v-btn {
  padding: 12px 24px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
  transform: translateY(-2px);
}
</style>