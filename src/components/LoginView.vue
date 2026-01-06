<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center px-6">
    <div class="w-full max-w-md">
      <!-- Contenedor principal del formulario -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
        <!-- Header -->
        <div class="text-center mb-8 space-y-4">
          <h1 class="text-4xl font-light text-slate-900">
            Iniciar
            <span class="font-semibold block">sesión</span>
          </h1>
          <p class="text-xl text-slate-600">Accede a tu panel de administración</p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Campo Usuario -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Usuario</label>
            <input
              v-model="loginForm.usuario"
              type="text"
              class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm"
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <!-- Campo Contraseña -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Contraseña</label>
            <input
              v-model="loginForm.password"
              type="password"
              class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <!-- Mensaje de error (si existe) -->
          <div v-if="errorMessage" class="text-red-600 text-sm text-center">
            {{ errorMessage }}
          </div>

          <!-- Botón de login -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white p-4 rounded-xl font-medium transition-colors duration-200 shadow-md mt-8"
          >
            <span v-if="isLoading">Iniciando sesión...</span>
            <span v-else>Iniciar sesión</span>
          </button>
        </form>

        <div class="text-center mt-6">
          <a href="#" class="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>

      <!-- Información adicional -->
      <div class="text-center mt-8">
        <p class="text-slate-600">Sistema de gestión inmobiliaria</p>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
const router = useRouter()

const loginForm = ref({
  usuario: '',
  password: ''
})

const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await api.post('/user/login', {
      usuario: loginForm.value.usuario,
      contraseña: loginForm.value.password
    })

    if (response.data.success) {
      localStorage.setItem('auth-token', response.data.data.token)
      window.dispatchEvent(new Event('auth-change'))
      router.push('/dashboard')
    } else {
      errorMessage.value = response.data.error || 'Error en el login'
    }

  } catch (error) {
    errorMessage.value = error.response?.data?.error ||
                        error.message ||
                        'Error en la conexión'
  } finally {
    isLoading.value = false
  }
}

</script>
