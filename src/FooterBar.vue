<template>
    <!-- Nuevo Footer con mismo estilo que App Bar -->
    <v-footer class="glass-footer" padless>
        <v-container class="py-16 text-center">
            <div class="d-flex justify-center align-center mb-4">
                <div class="footer-logo-box">
                    <span class="footer-logo-text">M</span>
                </div>
                <span class="text-h6 font-weight-medium ml-2 text-white">Manuel Espinosa</span>
            </div>

            <p class="footer-subtitle mx-auto mb-6">
                Profesionalismo, experiencia y confianza en cada operación inmobiliaria.
            </p>

            <v-divider class="my-6" color="grey-darken-3"></v-divider>

            <p class="footer-copy text-caption">
                Matrícula Profesional Tomo I Folio 81 Nº 241 C.M.P. <br>
                © 2024 Martillero Público. Todos los derechos reservados.
            </p>
        </v-container>
    </v-footer>

    <!-- Ícono flotante de WhatsApp (NO TOCAR) -->
    <a href="https://wa.me/5492473466501?text=Hola%2C%20quisiera%20hacer%20una%20consulta%20sobre%20una%20propiedad"
        target="_blank" rel="noopener noreferrer" class="whatsapp-float">
        <v-icon size="36" color="white">mdi-whatsapp</v-icon>
    </a>
</template>

<script setup>
// sin lógica JS
</script>

<style scoped>
/* Footer con el mismo fondo y blur que el App Bar */
.glass-footer {
    background-color: rgba(30, 30, 30, 0.9) !important;
    backdrop-filter: blur(10px);
    color: white;
}

.footer-logo-box {
    width: 32px;
    height: 32px;
    background-color: white;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer-logo-text {
    color: #1e293b;
    font-weight: bold;
    font-size: 0.875rem;
}

.footer-subtitle {
    color: #cbd5e1;
    /* color claro para buen contraste */
    max-width: 400px;
}

.footer-copy {
    color: #94a3b8;
    /* más claro que el texto del fondo */
}

/* Botón flotante de WhatsApp: NO TOCAR */
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
