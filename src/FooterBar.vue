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

    <!-- Ícono flotante de WhatsApp -->
    <a href="https://wa.me/5492473466501?text=Hola%2C%20quisiera%20hacer%20una%20consulta%20sobre%20una%20propiedad"
        target="_blank" rel="noopener noreferrer" class="whatsapp-float">
        <v-icon size="36" color="white">mdi-whatsapp</v-icon>
    </a>

</template>

<script setup>
// sin lógica JS
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

/* Estilos para el botón flotante de WhatsApp */
.whatsapp-float {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background-color: #25D366;
    border-radius: 50%;
    padding: 14px;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    text-decoration: none;
    outline: none;
    border: none;
}

.whatsapp-float:hover {
    transform: scale(1.1);
}
</style>
