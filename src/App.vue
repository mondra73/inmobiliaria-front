<template>
  <v-app>
    <!-- AppBar global -->
    <AppBar />

    <v-main id="scrolling-area">
      <RouterView />
    </v-main>
  </v-app>

   <FooterBar />
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppBar from './components/AppBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>


<style>

.logo {
  margin: 0 auto 2rem;
}
</style>
