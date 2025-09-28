<template>
  <div class="bg-slate-50 min-h-screen flex">
    <DashboardLayout>

      <!-- Main content -->
      <main class="flex-1 p-8">
        <header class="flex justify-between items-center mb-8">
          <div>
            <h2 class="text-3xl font-light text-slate-900">
              Gestión de <span class="font-semibold">Clientes</span>
            </h2>
            <p class="text-slate-600 mt-1">Administra tus clientes y operaciones inmobiliarias</p>
          </div>
          <div class="flex space-x-4">
            <button @click="irANuevoCliente"
              class="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-md">
              + Nuevo Cliente
            </button>
          </div>
        </header>

        <!-- Filtros -->
        <section class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8 min-h-[120px]">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" v-model="filtroNombre" placeholder="Buscar cliente..."
              class="pl-4 pr-4 py-2 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 w-full" />
            <select v-model="filtroTipoCliente"
              class="border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 w-full">
              <option value="">Todos los tipos</option>
              <option value="Oferente">Oferente</option>
              <option value="Receptor">Receptor</option>
            </select>
            <!-- Elemento vacío para mantener la estructura -->
            <div class="hidden md:block"></div>
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
        <p v-if="!cargando && clientesFiltrados.length === 0" class="text-center text-slate-500 mt-12">
          No hay clientes registrados.
        </p>

        <!-- Lista de clientes -->
        <section v-if="!cargando" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
          <div v-for="cliente in clientesFiltrados" :key="cliente.id" @click="verDetalleCliente(cliente.id)"
            class="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 p-6 cursor-pointer">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-slate-900 text-lg">
                {{ cliente.nombre }} {{ cliente.apellido }}
              </h3>
              <div class="flex flex-wrap gap-1">
                <span v-if="cliente.esOferente" class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Oferente
                </span>
                <span v-if="cliente.esReceptor" class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Receptor
                </span>
              </div>
            </div>
            <p class="text-sm text-slate-600 mb-1">
              <strong>DNI:</strong> {{ cliente.dni }}
            </p>
            <p class="text-sm text-slate-600 mb-1">
              <strong>Teléfono:</strong> {{ cliente.telefono }}
            </p>
            <p class="text-sm text-slate-600 mb-1">
              <strong>Email:</strong> {{ cliente.mail }}
            </p>
            <p class="text-slate-500 text-xs mt-2">
              Registrado: {{ formatDate(cliente.fechaCreacion) }}
            </p>
          </div>
        </section>

        <!-- Paginación -->
        <div class="flex justify-center mt-8">
          <div class="flex space-x-2">
            <button @click="paginaActual--" :disabled="paginaActual === 1"
              class="text-slate-900 rounded-xl border border-gray-300 px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Anterior
            </button>
            <button v-for="pagina in totalPaginas" :key="pagina" @click="paginaActual = pagina" :class="[
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
    </DashboardLayout>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import DashboardLayout from '../components/ui/DashboardLayout.vue'

const router = useRouter()
const cargando = ref(false)
const error = ref(null)

// Datos reales desde el backend
const clientes = ref([])

// Filtros y paginación
const filtroNombre = ref('')
const filtroTipoCliente = ref('')
const paginaActual = ref(1)
const elementosPorPagina = 6

// Obtener datos al montar el componente
onMounted(async () => {
  await obtenerClientes()
})

const obtenerClientes = async () => {
  cargando.value = true
  error.value = null

  try {
    const response = await api.get('/admin/clientes')

    if (response.data.success) {
      clientes.value = response.data.data.map(cliente => ({
        id: cliente._id,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        dni: cliente.dni,
        mail: cliente.mail,
        telefono: cliente.telefono,
        profesion: cliente.profesion,
        fechaCreacion: cliente.fechaCreacion,
        // Determinar tipo de cliente basado en el schema
        esOferente: cliente.oferente && cliente.oferente.length > 0,
        esReceptor: cliente.preferenciasBusqueda && cliente.preferenciasBusqueda.length > 0,
        // Propiedades originales para filtrado
        oferente: cliente.oferente,
        preferenciasBusqueda: cliente.preferenciasBusqueda
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
const clientesFiltrados = computed(() => {
  let filtrados = clientes.value.filter(cliente => {
    const coincideNombre = !filtroNombre.value ||
      (cliente.nombre + ' ' + cliente.apellido)
        .toLowerCase()
        .includes(filtroNombre.value.toLowerCase())

    const coincideTipo = !filtroTipoCliente.value ||
      (filtroTipoCliente.value === 'Oferente' && cliente.esOferente) ||
      (filtroTipoCliente.value === 'Receptor' && cliente.esReceptor)

    return coincideNombre && coincideTipo
  })

  return filtrados.slice(
    (paginaActual.value - 1) * elementosPorPagina,
    paginaActual.value * elementosPorPagina
  )
})

const totalPaginas = computed(() => {
  const filtrados = clientes.value.filter(cliente => {
    const coincideNombre = !filtroNombre.value ||
      (cliente.nombre + ' ' + cliente.apellido)
        .toLowerCase()
        .includes(filtroNombre.value.toLowerCase())

    const coincideTipo = !filtroTipoCliente.value ||
      (filtroTipoCliente.value === 'Oferente' && cliente.esOferente) ||
      (filtroTipoCliente.value === 'Receptor' && cliente.esReceptor) ||
      (filtroTipoCliente.value === 'Ambos' && cliente.esOferente && cliente.esReceptor)

    return coincideNombre && coincideTipo
  })

  return Math.ceil(filtrados.length / elementosPorPagina)
})

function verDetalleCliente(id) {
  router.push(`/cliente/${id}`)
}

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
