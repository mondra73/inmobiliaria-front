<template>
  <div>
    <!-- Sección hero con imagen responsiva -->
    <section class="relative h-[80vh] overflow-hidden">
      <!-- Imagen para mobile -->
      <div class="md:hidden absolute inset-0" :style="mobileStyle"></div>

      <!-- Imagen para desktop -->
      <div class="hidden md:block absolute inset-0" :style="desktopStyle"></div>

      <!-- Capa oscura y contenido -->
      <div class="absolute inset-0 bg-black/60 flex items-center justify-center text-center text-white z-10">
        <div>
          <h1 class="text-4xl md:text-6xl font-bold mb-4">Espinosa Inmobiliaria</h1>
          <p class="text-lg md:text-xl"><br> Sitio en construccion <br> Muy pronto encontrarás tu hogar ideal aquí.</p>
        </div>
      </div>
    </section>

    <!-- Sección de Servicios Profesionales -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 space-y-4">

          <p class="text-xl text-slate-600 max-w-2xl mx-auto">
            Ofrecemos un servicio inmobiliario personalizado en Colón, Buenos Aires, con enfoque en la excelencia y la
            confianza. Te acompañamos en cada etapa de tu operación, asegurando resultados exitosos y una experiencia
            ágil, transparente y segura. <br><br>
          </p>

          <h2 class="text-4xl font-light text-slate-900">Nuestros Servicios</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center space-y-6">
            <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
              <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                </path>
              </svg>
            </div>
            <div class="space-y-3">
              <h3 class="text-xl font-semibold text-slate-900">Compra y venta</h3>
              <p class="text-slate-600 leading-relaxed">
                Asesoramiento integral en operaciones de compraventa con análisis de mercado y negociación profesional.
              </p>
            </div>
          </div>

          <div class="text-center space-y-6">
            <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
              <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
            </div>
            <div class="space-y-3">
              <h3 class="text-xl font-semibold text-slate-900">Gestión de alquileres</h3>
              <p class="text-slate-600 leading-relaxed">
                Administración completa de propiedades en alquiler con garantías, contratos y seguimiento personalizado.
              </p>
            </div>
          </div>

          <div class="text-center space-y-6">
            <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
              <svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                </path>
              </svg>
            </div>
            <div class="space-y-3">
              <h3 class="text-xl font-semibold text-slate-900">Tasaciones</h3>
              <p class="text-slate-600 leading-relaxed">
                Valuaciones técnicas profesionales con certificación oficial para fines comerciales, legales y fiscales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mapa de ubicación -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-semibold text-slate-900 mb-6">Nuestra oficina</h2>
        <p class="text-slate-600 mb-8">
          Nos encontramos en Calle 44 N° 861, Colón, Buenos Aires.
        </p>
        <div class="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe width="100%" height="100%" style="border:0" loading="lazy" allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.935439437847!2d-61.10649082518843!3d-33.89131652022384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b8105aedb1f3cd%3A0xb49236ebc9434b14!2sC.%2044%20861%2C%20B2720%20Col%C3%B3n%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1752271849327!5m2!1ses!2sar">
          </iframe>
        </div>
      </div>
    </section>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import imagenDesktop from '../assets/casa2.jpg';
import imagenMobile from '../assets/imagen-casa.png';

// Estilos para cada imagen
const desktopStyle = ref({
  backgroundImage: `url(${imagenDesktop})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  transform: 'scale(1.1)',
  width: '100%',
  height: '100%'
});

const mobileStyle = ref({
  backgroundImage: `url(${imagenMobile})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%'
});

// Verificación de carga de imagen (opcional)
onMounted(() => {
  console.log('Imagen mobile:', imagenMobile);
  console.log('Imagen desktop:', imagenDesktop);

  // Verificar carga de imagen mobile
  const imgMobile = new Image();
  imgMobile.src = imagenMobile;
  imgMobile.onload = () => console.log('Mobile image loaded');
  imgMobile.onerror = () => console.error('Error loading mobile image');

  // Verificar carga de imagen desktop
  const imgDesktop = new Image();
  imgDesktop.src = imagenDesktop;
  imgDesktop.onload = () => console.log('Desktop image loaded');
  imgDesktop.onerror = () => console.error('Error loading desktop image');
});

</script>

<style>
/* Estilos para asegurar la correcta visualización */
section {
  background-repeat: no-repeat;
}
</style>
