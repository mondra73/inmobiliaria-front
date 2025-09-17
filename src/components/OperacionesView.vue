<template>
  <div class="bg-slate-50 min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-sm border-r border-gray-100 min-h-screen relative">
      <div class="p-6">
        <h1 class="text-xl font-light text-slate-900">
          Panel de <span class="font-semibold">Control</span>
        </h1>
      </div>
      <nav class="px-6 space-y-2">
        <RouterLink to="/dashboard"
          class="flex items-center space-x-3 p-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-200">
          <Home class="w-5 h-5" />
          <span>Dashboard</span>
        </RouterLink>
        <RouterLink to="/propiedades"
          class="flex items-center space-x-3 p-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-200">
          <Home class="w-5 h-5" />
          <span>Propiedades</span>
        </RouterLink>
        <RouterLink to="/operaciones"
          class="flex items-center space-x-3 p-3 rounded-xl bg-slate-100 text-slate-900">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span class="font-medium">Operaciones</span>
        </RouterLink>
        <!-- Otros enlaces... -->
      </nav>

      <!-- Usuario -->
      <div class="absolute bottom-6 left-6 right-6">
        <div class="bg-slate-50 rounded-xl p-4">
          <div class="flex items-center space-x-3 relative">
            <div class="relative">
              <div class="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"/>
            </div>
            <div>
              <p class="font-medium text-slate-900 text-sm">{{ userData.nombre || 'Usuario' }}</p>
              <p class="text-slate-600 text-xs">En línea</p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-8">
      <header class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl font-light text-slate-900">
            Gestión de <span class="font-semibold">Operaciones</span>
          </h2>
          <p class="text-slate-600 mt-1">Administra tus clientes y operaciones inmobiliarias</p>
        </div>
        <button @click="irANuevoCliente"
          class="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-md">
          + Nuevo Cliente
        </button>
      </header>

      <!-- Filtros -->
      <section class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" v-model="filtroNombre" placeholder="Buscar cliente..."
            class="pl-4 pr-4 py-2 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 w-full" />
          <select v-model="filtroOperacion"
            class="border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 w-full">
            <option value="">Tipo de operación</option>
            <option>Venta</option>
            <option>Alquiler</option>
            <option>Alquiler temporal</option>
          </select>
          <select v-model="filtroEstado"
            class="border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 w-full">
            <option value="">Estado</option>
            <option>En proceso</option>
            <option>Concretada</option>
            <option>Cancelada</option>
          </select>
        </div>
      </section>

      <!-- Estado de carga -->
  <div v-if="cargando" class="flex justify-center items-center h-64">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900"></div>
  </div>

  <!-- Mensaje de error -->
  <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
    {{ error }}
  </div>

  <!-- Si no hay resultados -->
  <p v-if="!cargando && operaciones.length === 0" class="text-center text-slate-500 mt-12">
    No hay clientes registrados.
  </p>

      <!-- Lista de operaciones -->
      <section v-if="!cargando" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
    <div v-for="operacion in operacionesFiltradas" :key="operacion.id"
      @click="verDetalleCliente(operacion.id)"
      class="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 p-6 cursor-pointer">
      <h3 class="font-semibold text-slate-900 text-lg mb-1">
        {{ operacion.cliente.nombre }} {{ operacion.cliente.apellido }}
      </h3>
      <p class="text-sm text-slate-600 mb-1">
        <strong>DNI:</strong> {{ operacion.cliente.dni }}
      </p>
      <p class="text-sm text-slate-600 mb-1">
        <strong>Teléfono:</strong> {{ operacion.cliente.telefono }}
      </p>
      <p class="text-sm text-slate-600 mb-1">
        <strong>Email:</strong> {{ operacion.cliente.mail }}
      </p>
      <p class="text-slate-500 text-xs mt-2">
        Registrado: {{ formatDate(operacion.fecha) }}
      </p>
    </div>
  </section>

      <!-- Si no hay resultados -->
      <p v-if="operaciones.length === 0" class="text-center text-slate-500 mt-12">
        No hay operaciones cargadas.
      </p>

      <!-- Paginación -->
      <div class="flex justify-center mt-8">
        <div class="flex space-x-2">
          <button @click="paginaActual--" :disabled="paginaActual === 1"
            class="text-slate-900 rounded-xl border border-gray-300 px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Anterior
          </button>
          <button v-for="pagina in totalPaginas" :key="pagina" @click="paginaActual = pagina"
            :class="[
              'rounded-xl px-4 py-2 cursor-pointer',
              paginaActual === pagina ? 'bg-slate-900 text-white' : 'text-slate-900 border border-gray-300 hover:bg-gray-100'
            ]">
            {{ pagina }}
          </button>
          <button @click="paginaActual++" :disabled="paginaActual === totalPaginas || totalPaginas === 0"
            class="text-slate-900 rounded-xl border border-gray-300 px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Siguiente
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Home } from 'lucide-vue-next'
import api from '../api'

const router = useRouter()
const userData = ref({ nombre: '' })
const cargando = ref(false)
const error = ref(null)

// Datos reales desde el backend
const operaciones = ref([])
const clientes = ref([])

// Filtros y paginación
const filtroNombre = ref('')
const filtroOperacion = ref('')
const filtroEstado = ref('')
const paginaActual = ref(1)
const elementosPorPagina = 6

// Función para decodificar el token JWT
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))

    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

// Obtener datos al montar el componente
onMounted(async () => {
  const token = localStorage.getItem('auth-token')
  if (token) {
    const decoded = parseJwt(token)
    if (decoded) {
      userData.value = {
        nombre: decoded.nombre,
        mail: decoded.mail,
        rol: decoded.rol
      }
    }
  }
  await obtenerClientes()
})

const obtenerClientes = async () => {
  cargando.value = true
  error.value = null

  try {
    const response = await api.get('/admin/clientes')

    if (response.data.success) {
      clientes.value = response.data.data

      // Transformar clientes a operaciones (ajusta según tu modelo de datos)
      operaciones.value = clientes.value.map(cliente => ({
        id: cliente._id,
        cliente: {
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          dni: cliente.dni,
          mail: cliente.mail,
          telefono: cliente.telefono
        },
        tipo: 'Venta', // Esto deberías obtenerlo de tu backend
        propiedad: 'Propiedad asociada', // Esto deberías obtenerlo de tu backend
        estado: 'En proceso', // Esto deberías obtenerlo de tu backend
        fecha: cliente.fechaCreacion || new Date().toISOString()
      }))
    }
  } catch (err) {
    console.error('Error al obtener clientes:', err)
    error.value = err.response?.data?.message || 'Error al cargar los clientes'
  } finally {
    cargando.value = false
  }
}

// Computed properties
const operacionesFiltradas = computed(() => {
  return operaciones.value.filter(op => {
    return (
      (!filtroNombre.value ||
       (op.cliente.nombre + ' ' + op.cliente.apellido)
         .toLowerCase()
         .includes(filtroNombre.value.toLowerCase())) &&
      (!filtroOperacion.value || op.tipo === filtroOperacion.value) &&
      (!filtroEstado.value || op.estado === filtroEstado.value)
    )
  }).slice(
    (paginaActual.value - 1) * elementosPorPagina,
    paginaActual.value * elementosPorPagina
  )
})

function verDetalleCliente(id) {
  router.push(`/cliente/${id}`)
}

const totalPaginas = computed(() =>
  Math.ceil(
    operaciones.value.filter(op =>
      (!filtroNombre.value ||
       (op.cliente.nombre + ' ' + op.cliente.apellido)
         .toLowerCase()
         .includes(filtroNombre.value.toLowerCase())) &&
      (!filtroOperacion.value || op.tipo === filtroOperacion.value) &&
      (!filtroEstado.value || op.estado === filtroEstado.value)
    ).length / elementosPorPagina
  )
)

function irANuevoCliente() {
  router.push('/nuevo-cliente')
}

function formatDate(fecha) {
  return new Date(fecha).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>
