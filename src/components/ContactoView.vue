<template>
  <!-- Contacto -->
  <section class="py-24 bg-slate-50">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Información de contacto -->
        <div class="space-y-8">
          <div class="space-y-6">
            <h2 class="text-4xl font-light text-slate-900">
              Conversemos sobre
              <span class="font-semibold block">su próxima inversión</span>
            </h2>
            <p class="text-xl text-slate-600 leading-relaxed">
              Cada propiedad es única, cada cliente también. Trabajemos juntos para encontrar la solución
              perfecta para sus necesidades inmobiliarias.
            </p>
          </div>

          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900 mb-1">Teléfono</h3>
                <p class="text-slate-600">+54 2473 466501</p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900 mb-1">Email</h3>
                <p class="text-slate-600"></p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900 mb-1">Oficina</h3>
                <p class="text-slate-600">Calle 44 N° 861. Colon, Buenos Aires<br>Lunes a Viernes 9:00 -
                  18:00</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Formulario de contacto -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
          <form @submit.prevent="enviarConsulta" class="space-y-6">
            <!-- Nombre completo -->
            <div class="space-y-2">
              <label for="nombre" class="text-sm font-medium text-slate-700">Nombre completo</label>
              <input id="nombre" v-model="formData.nombre" required
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <!-- Email y Teléfono -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-slate-700">Email</label>
                <input id="email" type="email" v-model="formData.email" required
                  class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
              </div>
              <div class="space-y-2">
                <label for="telefono" class="text-sm font-medium text-slate-700">Teléfono</label>
                <input id="telefono" type="tel" v-model="formData.telefono"
                  class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
              </div>
            </div>

            <!-- Select -->
            <div class="space-y-2">
              <label for="asunto" class="text-sm font-medium text-slate-700">¿En qué podemos ayudarle?</label>
              <select id="asunto" v-model="formData.asunto" required
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm appearance-none bg-white">
                <option value="" selected disabled hidden>Elija una opción</option>
                <option>Quiero comprar una propiedad</option>
                <option>Quiero vender mi propiedad</option>
                <option>Busco alquilar</option>
                <option>Necesito una tasación</option>
                <option>Consulta general</option>
              </select>
            </div>

            <!-- Textarea -->
            <div class="space-y-2">
              <label for="mensaje" class="text-sm font-medium text-slate-700">Mensaje</label>
              <textarea id="mensaje" rows="4" v-model="formData.mensaje" required
                placeholder="Cuéntenos más detalles sobre su consulta..."
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm"></textarea>
            </div>

            <!-- Botón -->
            <button type="submit" :disabled="isEnviando"
              class="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-xl font-medium transition-colors duration-200 shadow-md flex justify-center items-center">
              <span v-if="!isEnviando">Enviar consulta</span>
              <span v-else>Enviando...</span>
            </button>

            <!-- Mensajes -->
            <div v-if="mostrarMensaje" class="mt-4">
              <div v-if="mensajeExito"
                class="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl text-sm shadow transition-opacity duration-300">
                {{ mensajeExito }}
              </div>
              <div v-else-if="mensajeError"
                class="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-xl text-sm shadow transition-opacity duration-300">
                {{ mensajeError }}
              </div>
            </div>

          </form>
        </div>

      </div>
    </div>
  </section>

</template>

<script setup>
import { ref } from 'vue';
import api from '../api'


const formData = ref({
  nombre: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: ''
});

const isEnviando = ref(false);
const mensajeExito = ref('');
const mensajeError = ref('');
const mostrarMensaje = ref(false)

const enviarConsulta = async () => {
  isEnviando.value = true
  mensajeExito.value = ''
  mensajeError.value = ''
  mostrarMensaje.value = false

  try {
    await api.post('/user/contacto', formData.value)

    mensajeExito.value = '✅ Tu consulta fue enviada con éxito. En breve nos pondremos en contacto.'
    formData.value = {
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    }
  } catch (error) {
    console.error(error)
    mensajeError.value = '❌ Ocurrió un error al enviar tu consulta. Por favor intentá nuevamente.'
  } finally {
    mostrarMensaje.value = true
    isEnviando.value = false

    // Oculta el mensaje luego de 5 segundos
    setTimeout(() => {
      mostrarMensaje.value = false
    }, 5000)
  }
}

</script>
