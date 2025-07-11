<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center px-6">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Imagen 404 -->
      <div class="mb-12">
        <img 
          :src="notFoundImage" 
          alt="Página no encontrada" 
          class="w-full max-w-lg mx-auto h-auto"
        />
      </div>
      
      <!-- Contenido principal -->
      <div class="space-y-6">
        <div class="space-y-4">
          <h1 class="text-4xl md:text-5xl font-light text-slate-900">
            Página <span class="font-semibold">no encontrada</span>
          </h1>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Lo sentimos, la página que buscas no existe o ha sido movida. 
            Pero no te preocupes, podemos ayudarte a encontrar lo que necesitas.
          </p>
        </div>
        
        <!-- Botones de acción -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button 
            @click="goToHome"
            class="bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-slate-800 transition-all duration-200 font-medium transform hover:scale-105"
          >
            Volver al inicio
          </button>
          <button 
            @click="goToProperties"
            class="border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-xl hover:border-slate-400 hover:bg-slate-100 transition-all duration-200 font-medium"
          >
            Ver propiedades
          </button>
        </div>
        
        <!-- Enlaces útiles -->
        <div class="mt-12 pt-8 border-t border-slate-200">
          <p class="text-slate-500 mb-4">¿Buscas algo específico?</p>
          <div class="flex flex-wrap justify-center gap-6 text-sm">
            <button 
              @click="goToHome" 
              class="text-slate-600 hover:text-slate-900 transition-colors duration-200 hover:underline"
            >
              Inicio
            </button>
            <button 
              @click="goToProperties" 
              class="text-slate-600 hover:text-slate-900 transition-colors duration-200 hover:underline"
            >
              Propiedades
            </button>
            <button 
              @click="goToAbout" 
              class="text-slate-600 hover:text-slate-900 transition-colors duration-200 hover:underline"
            >
              Nosotros
            </button>
            <button 
              @click="goToContact" 
              class="text-slate-600 hover:text-slate-900 transition-colors duration-200 hover:underline"
            >
              Contacto
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// Imagen importada
const notFoundImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/404-ytjgIcPbZT5I62OdlUYq8c1tgPbpQS.png'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}

const goToProperties = () => {
  router.push('/propiedades-publicas')
}

const goToAbout = () => {
  router.push('/nosotros')
}

const goToContact = () => {
  router.push('/contacto')
}
</script>

<style scoped>
/* Animación sutil para la imagen */
img {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Efecto hover para los botones */
button:hover {
  transform: translateY(-1px);
}
</style>