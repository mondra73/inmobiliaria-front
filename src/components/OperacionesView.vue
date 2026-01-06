<template>
  <div class="bg-slate-50 min-h-screen flex">
    <DashboardLayout>

    <!-- Main content -->
    <main class="flex-1 p-8">
      <header class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl font-light text-slate-900">
            Gestión de <span class="font-semibold">Operaciones</span>
          </h2>
          <p class="text-slate-600 mt-1">Administra las operaciones inmobiliarias concretadas</p>
        </div>
        <div class="flex space-x-4">

          <button @click="irANuevaOperacion"
            class="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-md">
            + Cargar Operación
          </button>
        </div>
      </header>

      <!-- Filtros -->
      <section class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="text" v-model="filtroPropiedad" placeholder="Buscar propiedad..."
            class="pl-4 pr-4 py-2 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 w-full" />
          <input type="text" v-model="filtroCliente" placeholder="Buscar cliente..."
            class="pl-4 pr-4 py-2 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 w-full" />
          <select v-model="filtroOperacion"
            class="border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 w-full">
            <option value="">Todas las operaciones</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
            <option value="alquiler temporal">Alquiler Temporal</option>
          </select>
          <select v-model="filtroMoneda"
            class="border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 w-full">
            <option value="">Todas las monedas</option>
            <option value="ARS">Pesos (ARS)</option>
            <option value="USD">Dólares (USD)</option>
            <option value="EUR">Euros (EUR)</option>
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

      <p v-if="!cargando && operaciones.length === 0" class="text-center text-slate-500 mt-12">
        No hay operaciones registradas.
      </p>

      <!-- Lista de operaciones -->
      <section v-if="!cargando && operaciones.length > 0" class="grid grid-cols-1 gap-6 mt-4">
        <div v-for="operacion in operacionesFiltradas" :key="operacion._id"
          class="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 p-6 cursor-pointer">
          <!-- Header de la operación -->
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-semibold text-slate-900 text-lg mb-1">
                {{ formatTipoOperacion(operacion.operacion) }}
              </h3>
              <p class="text-sm text-slate-600">
                {{ formatDate(operacion.fechaConcretada) }}
              </p>
            </div>
            <div class="text-right">
              <span v-if="operacion.montoDinero" class="text-lg font-bold text-green-600">
                ${{ operacion.montoDinero.toLocaleString() }} {{ operacion.moneda }}
              </span>
              <span v-else class="text-sm text-slate-500">Monto no especificado</span>
            </div>
          </div>

          <!-- Información de la propiedad -->
          <div class="mb-4">
            <p class="text-sm font-medium text-slate-700 mb-1">Propiedad:</p>
            <p class="text-slate-900">{{ operacion.propiedad }}</p>
          </div>

          <!-- Participantes -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Oferente -->
            <div>
              <p class="text-sm font-medium text-slate-700 mb-1">Oferente:</p>
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-slate-900 font-medium">
                    {{ operacion.oferente?.nombre }} {{ operacion.oferente?.apellido }}
                  </p>
                  <p class="text-xs text-slate-600">{{ operacion.oferente?.mail }}</p>
                </div>
              </div>
            </div>

            <!-- Receptor -->
            <div>
              <p class="text-sm font-medium text-slate-700 mb-1">Receptor:</p>
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-slate-900 font-medium">
                    {{ operacion.receptor?.nombre }} {{ operacion.receptor?.apellido }}
                  </p>
                  <p class="text-xs text-slate-600">{{ operacion.receptor?.mail }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Descripción -->
          <div v-if="operacion.descripcion" class="mt-4 pt-4 border-t border-gray-100">
            <p class="text-sm font-medium text-slate-700 mb-1">Descripción:</p>
            <p class="text-sm text-slate-600">{{ operacion.descripcion }}</p>
          </div>
        </div>
      </section>

      <!-- Paginación -->
      <div v-if="operacionesFiltradas.length > 0" class="flex justify-center mt-8">
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
    </DashboardLayout>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '../components/ui/DashboardLayout.vue'
import api from '../api'

const router = useRouter()
const cargando = ref(false)
const error = ref(null)

const operaciones = ref([])

const filtroPropiedad = ref('')
const filtroCliente = ref('')
const filtroOperacion = ref('')
const filtroMoneda = ref('')
const paginaActual = ref(1)
const elementosPorPagina = 6

onMounted(async () => {
await obtenerOperaciones()
})

const obtenerOperaciones = async () => {
  cargando.value = true
  error.value = null

  try {
    const response = await api.get('/admin/operaciones')

    operaciones.value = response.data

  } catch (err) {
    console.error('Error al obtener operaciones:', err)
    error.value = err.response?.data?.error || 'Error al cargar las operaciones'
  } finally {
    cargando.value = false
  }
}

const operacionesFiltradas = computed(() => {
  let operacionesFiltradas = operaciones.value.filter(op => {
    const propiedadMatch = !filtroPropiedad.value ||
      op.propiedad.toLowerCase().includes(filtroPropiedad.value.toLowerCase())

    const clienteMatch = !filtroCliente.value ||
      (op.oferente?.nombre && op.oferente.nombre.toLowerCase().includes(filtroCliente.value.toLowerCase())) ||
      (op.oferente?.apellido && op.oferente.apellido.toLowerCase().includes(filtroCliente.value.toLowerCase())) ||
      (op.receptor?.nombre && op.receptor.nombre.toLowerCase().includes(filtroCliente.value.toLowerCase())) ||
      (op.receptor?.apellido && op.receptor.apellido.toLowerCase().includes(filtroCliente.value.toLowerCase()))

    const operacionMatch = !filtroOperacion.value ||
      op.operacion.toLowerCase() === filtroOperacion.value.toLowerCase()

    const monedaMatch = !filtroMoneda.value ||
      op.moneda === filtroMoneda.value

    return propiedadMatch && clienteMatch && operacionMatch && monedaMatch
  })

  const inicio = (paginaActual.value - 1) * elementosPorPagina
  const fin = paginaActual.value * elementosPorPagina
  return operacionesFiltradas.slice(inicio, fin)
})

const totalPaginas = computed(() =>
  Math.ceil(
    operaciones.value.filter(op => {
      const propiedadMatch = !filtroPropiedad.value ||
        op.propiedad.toLowerCase().includes(filtroPropiedad.value.toLowerCase())

      const clienteMatch = !filtroCliente.value ||
        (op.oferente?.nombre && op.oferente.nombre.toLowerCase().includes(filtroCliente.value.toLowerCase())) ||
        (op.oferente?.apellido && op.oferente.apellido.toLowerCase().includes(filtroCliente.value.toLowerCase())) ||
        (op.receptor?.nombre && op.receptor.nombre.toLowerCase().includes(filtroCliente.value.toLowerCase())) ||
        (op.receptor?.apellido && op.receptor.apellido.toLowerCase().includes(filtroCliente.value.toLowerCase()))

      const operacionMatch = !filtroOperacion.value ||
        op.operacion.toLowerCase() === filtroOperacion.value.toLowerCase()

      const monedaMatch = !filtroMoneda.value ||
        op.moneda === filtroMoneda.value

      return propiedadMatch && clienteMatch && operacionMatch && monedaMatch
    }).length / elementosPorPagina
  )
)

function formatTipoOperacion(tipo) {
  const tipos = {
    'venta': 'Venta',
    'alquiler': 'Alquiler',
    'alquiler temporal': 'Alquiler Temporal'
  }
  return tipos[tipo] || tipo
}

function formatDate(fecha) {
  return new Date(fecha).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function irANuevaOperacion() {
  router.push('/nueva-operacion')
}
</script>
