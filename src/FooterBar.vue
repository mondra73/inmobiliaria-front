<template>
  <v-footer class="footer" padless>
    <v-row class="ma-0 pa-8" justify="space-around" no-gutters>
      <v-col cols="12" md="4" class="footer-col">
        <h3>Contacto</h3>
        <p>Calle 44 N° 861. <br> Colon, Buenos Aires</p>
        <p>Matricula TOMO I FOLIO 81 Nº241 C.M.P.</p>
      </v-col>

      <v-col cols="12" md="4" class="footer-col">
        <h3>Loginc</h3>
        <p>Inicio</p>
        <p>Propiedades</p>
        <p>Nosotros</p>
      </v-col>

      <v-col cols="12" md="4" class="footer-col">
        <h3>Enlaces rápidos</h3>
        <p>Contacto</p>
        <p>Legal</p>
        <p>Política de privacidad</p>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
// Sin lógica
</script>

<style scoped>
.footer {
  background-color: #1A1A1A;
  padding: 2rem 0;
}


.footer-col h3 {
  color: #fff;
  margin-bottom: 0.5rem;
}

.footer-col p {
  color: #eee;
  margin: 0.25rem 0;
}

@media (max-width: 600px) {
  .footer-col {
    text-align: center;
    margin-bottom: 1.5rem;
  }
}
</style>
