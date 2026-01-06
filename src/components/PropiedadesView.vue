<template>
  <div class="bg-slate-50 min-h-screen flex">
    <DashboardLayout>

    <!-- Main content -->
    <main class="flex-1 p-8">
      <header class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl font-light text-slate-900">
            Gestión de <span class="font-semibold">Propiedades</span>
          </h2>
          <p class="text-slate-600 mt-1">Administra todas las propiedades del sistema</p>
        </div>
        <button @click="irANuevaPropiedad"
          class="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-md">
          + Nueva Propiedad
        </button>
      </header>

      <!-- Filtros -->
      <section class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input type="text" v-model="filtroTitulo" placeholder="Buscar propiedades..."
              class="pl-10 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 w-full" />
          </div>
          <select v-model="filtroTipo"
            class="border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 w-full">
            <option value="">Tipo de propiedad</option>
            <option>Casa</option>
            <option>Departamento</option>
            <option>Terreno</option>
            <option>Local comercial</option>
            <option>Campo</option>
            <option>Fondo de Comercio</option>
            <option>Galpón</option>
          </select>
          <select v-model="filtroOperacion"
            class="border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 w-full">
            <option value="">Operación</option>
            <option>Venta</option>
            <option>Alquiler</option>
            <option>Alquiler temporal</option>
          </select>
          <select v-model="filtroEstado"
            class="border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 w-full">
            <option value="">Estado</option>
            <option>Visible</option>
            <option>Oculta</option>
          </select>
        </div>
      </section>

      <!-- Tarjetas de propiedades -->
<section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
  <div v-for="propiedad in casasFiltradas" :key="propiedad.id" @click="irADetallePropiedad(propiedad.id)"
    class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer">
    <div class="relative">
  <img
    :src="propiedad.imagenes?.[0]?.url || '/placeholder.svg?height=200&width=300'"
    :alt="propiedad.titulo"
    class="w-full h-48 object-cover"
    :style="getImageStyle(propiedad.imagenes?.[0])"
  />
      <span class="absolute top-4 left-4 bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded">
        {{ propiedad.operacion }}
      </span>
      <span class="absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded" :class="propiedad.visible
        ? 'bg-green-100 text-green-800'
        : 'bg-red-100 text-red-800'">
        {{ propiedad.visible ? 'Visible' : 'Oculta' }}
      </span>
    </div>

    <div class="p-6">
      <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded mb-2">
        {{ propiedad.tipo }}
      </span>

      <h3 class="font-semibold text-slate-900 text-lg mb-1 line-clamp-2">
        {{ propiedad.titulo }}
      </h3>


      <div class="text-slate-600 text-sm mb-1 flex items-center">
  <Home class="w-4 h-4 mr-1" />
  <span v-if="propiedad.ubicacion.altura">{{ propiedad.ubicacion.calle }} {{ propiedad.ubicacion.altura }}, {{ propiedad.ubicacion.localidad }}</span>
  <span v-else-if="propiedad.ubicacion.calle">{{ propiedad.ubicacion.calle }}, {{ propiedad.ubicacion.localidad }}</span>
  <span v-else>{{ propiedad.ubicacion.localidad }}</span>
</div>


      <div class="text-slate-600 text-sm mb-3 flex items-center">
        <span>Publicado: {{ formatDate(propiedad.fechaPublicada) }}</span>
      </div>
      <div class="text-2xl font-light text-slate-900 mb-2">
        {{ formatPrice(propiedad.precio) }}
      </div>
      <div class="text-sm text-slate-600 flex flex-wrap gap-4">
        <span v-if="propiedad.caracteristicas.dormitorios">{{ propiedad.caracteristicas.dormitorios }}
          dorm.</span>
        <span v-if="propiedad.caracteristicas.baños">{{ propiedad.caracteristicas.baños }} baños</span>
        <span v-if="propiedad.caracteristicas.superficieTotal">{{ propiedad.caracteristicas.superficieTotal
        }}m²</span>
      </div>
    </div>
  </div>
</section>

      <p v-if="casas.length === 0" class="text-center text-slate-500 mt-12">No hay propiedades cargadas.</p>

      <!-- Paginación -->
      <div class="flex justify-center mt-8">
        <div class="flex space-x-2">
          <button @click="paginaActual--" :disabled="paginaActual === 1"
            class="text-slate-900 rounded-xl border border-gray-300 px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Anterior
          </button>

          <template v-if="totalPaginas > 0">
            <button v-for="pagina in totalPaginas" :key="pagina" @click="paginaActual = pagina" :class="[
              'rounded-xl px-4 py-2 cursor-pointer',
              paginaActual === pagina ? 'bg-slate-900 text-white' : 'text-slate-900 border border-gray-300 hover:bg-gray-100'
            ]">
              {{ pagina }}
            </button>
          </template>
          <template v-else>
            <button @click="paginaActual = 1" :class="[
              'rounded-xl px-4 py-2 cursor-pointer',
              paginaActual === 1 ? 'bg-slate-900 text-white' : 'text-slate-900 border border-gray-300 hover:bg-gray-100'
            ]">
              1
            </button>
          </template>
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
import { Search, Home } from 'lucide-vue-next'

const router = useRouter()
const casas = ref([])
const userData = ref({ nombre: '' })
const paginaActual = ref(1)
const propiedadesPorPagina = 9

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

const filtroTitulo = ref('')
const filtroTipo = ref('')
const filtroOperacion = ref('')
const filtroEstado = ref('')

const casasFiltradas = computed(() => {
  const filtradas = casas.value.filter((propiedad) => {
    const coincideTitulo = propiedad.titulo.toLowerCase().includes(filtroTitulo.value.toLowerCase())
    const coincideTipo = filtroTipo.value
      ? (propiedad.categoria === filtroTipo.value || propiedad.tipo === filtroTipo.value)
      : true
    const coincideOperacion = filtroOperacion.value
      ? propiedad.operacion.toLowerCase().includes(filtroOperacion.value.toLowerCase())
      : true
    const coincideEstado = filtroEstado.value
      ? (filtroEstado.value === 'Visible' ? propiedad.visible : !propiedad.visible)
      : true

    return coincideTitulo && coincideTipo && coincideOperacion && coincideEstado
  })

  const inicio = (paginaActual.value - 1) * propiedadesPorPagina
  const fin = inicio + propiedadesPorPagina
  return filtradas.slice(inicio, fin)
})

const getImageStyle = (imagen) => {
  if (!imagen) return {};

  const offsetX = imagen.offsetX !== undefined ? imagen.offsetX : 0.5;
  const offsetY = imagen.offsetY !== undefined ? imagen.offsetY : 0.5;

  return {
    objectPosition: `${offsetX * 100}% ${offsetY * 100}%`
  };
};

const totalPaginas = computed(() => {
  const cantidad = casas.value.filter((propiedad) => {
    const coincideTitulo = propiedad.titulo.toLowerCase().includes(filtroTitulo.value.toLowerCase())
    const coincideTipo = filtroTipo.value ? propiedad.tipo === filtroTipo.value : true
    const coincideOperacion = filtroOperacion.value
      ? propiedad.operacion.toLowerCase().includes(filtroOperacion.value.toLowerCase())
      : true
    const coincideEstado = filtroEstado.value
      ? (filtroEstado.value === 'Visible' ? propiedad.visible : !propiedad.visible)
      : true

    return coincideTitulo && coincideTipo && coincideOperacion && coincideEstado
  }).length

  return Math.max(1, Math.ceil(cantidad / propiedadesPorPagina))
})

function irANuevaPropiedad() {
  router.push('/nueva-propiedad')
}

function irADetallePropiedad(id) {
  router.push(`/propiedad/${id}`)
}

function formatDate(fecha) {
  return new Date(fecha).toLocaleDateString('es-AR')
}

function formatPrice(precio) {
  if (!precio || typeof precio.monto !== 'number') return ''

  const symbol = precio.moneda === 'USD' ? '$' : '$'
  const currency = precio.moneda === 'USD' ? 'USD' : 'ARS'
  return `${symbol}${precio.monto.toLocaleString()} ${currency}`
}


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

  try {
    const res = await api.get('/admin/todas-propiedades')
    casas.value = res.data.casas
  } catch (err) {
    console.error('Error al cargar casas:', err)
  }
})

</script>

<style scoped></style>
