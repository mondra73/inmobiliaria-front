<template>
  <v-container class="pa-0" fluid>
    <!-- Sección con imagen destacada -->
    <div class="hero-section">
      <div class="overlay">
        <div class="text-content">
          <h1 class="display-1 font-weight-bold">Sitio en Construcción</h1>
          <p class="subtitle-1">Muy pronto encontraras tu hogar ideal aquí.</p>
        </div>
      </div>
    </div>

    <!-- Footer separado -->
    <FooterBar />
  </v-container>
</template>

<script setup>
import FooterBar from '../FooterBar.vue'
</script>

<style scoped>
.hero-section {
  background-image: url('../assets/imagen-casa.png');
  background-size: cover;
  background-position: center;
  height: 80vh;
  position: relative;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}
</style>
