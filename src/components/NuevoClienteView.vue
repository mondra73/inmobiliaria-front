<template>
  <div class="bg-slate-50 min-h-screen flex items-center justify-center px-4">
    <!-- Main content -->
    <main class="w-full max-w-4xl p-8">
      <!-- Header con flechita -->
      <header class="flex items-center mb-8 space-x-4">
        <!-- Flecha de regreso -->
        <button @click="router.push('/clientes')" class="text-slate-500 hover:text-slate-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Título -->
        <div>
          <h2 class="text-3xl font-light text-slate-900">
            Crear <span class="font-semibold">Cliente</span>
          </h2>
          <p class="text-slate-600 mt-1">Ingresa los datos para registrar un nuevo cliente</p>
        </div>
      </header>

      <!-- Formulario -->
      <section class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <form @submit.prevent="crearCliente" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-slate-700 text-sm mb-1">Nombre</label>
              <input v-model="cliente.nombre" type="text" required
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>
            <div>
              <label class="block text-slate-700 text-sm mb-1">Apellido</label>
              <input v-model="cliente.apellido" type="text" required
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>
            <div>
              <label class="block text-slate-700 text-sm mb-1">DNI</label>
              <input v-model="cliente.dni" type="number" required
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>
            <div >
              <label class="block text-slate-700 text-sm mb-1">Teléfono</label>
              <input v-model="cliente.telefono" type="text" required
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-slate-700 text-sm mb-1">Email</label>
              <input v-model="cliente.mail" type="email" required
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>
          </div>

          <!-- Botón -->
          <div class="pt-4">
            <button type="submit" :disabled="cargando"
              class="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-md w-full">
              {{ cargando ? 'Guardando...' : 'Crear Cliente' }}
            </button>
          </div>
        </form>

        <p v-if="mensaje" :class="mensajeError ? 'text-red-500' : 'text-green-600'" class="mt-4 text-sm">
          {{ mensaje }}
        </p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()

const cliente = ref({
  nombre: '',
  apellido: '',
  dni: '',
  mail: '',
  telefono: ''
})

const cargando = ref(false)
const mensaje = ref('')
const mensajeError = ref(false)

const crearCliente = async () => {
  cargando.value = true
  mensaje.value = ''
  mensajeError.value = false

  try {
    await api.post('/admin/nuevo-cliente', cliente.value)
    mensaje.value = 'Cliente creado correctamente.'

    setTimeout(() => {
      router.push('/clientes')
    }, 1500)
  } catch (error) {
    console.error('Error al crear cliente:', error)

    if (error.response?.data?.message) {
      mensaje.value = error.response.data.message
    } else if (error.response?.data?.errors) {
      // Si hay errores de validación, puedes mostrarlos
      const errors = error.response.data.errors
      mensaje.value = Object.values(errors).join(', ')
    } else {
      mensaje.value = 'Error al crear el cliente. Por favor intenta nuevamente.'
    }
    mensajeError.value = true
  } finally {
    cargando.value = false
  }
}


</script>
