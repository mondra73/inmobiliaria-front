<template>
  <div>
    <div v-if="propiedad" class="bg-slate-50 min-h-screen">
      <div class="max-w-6xl mx-auto px-6 py-8">
        <!-- Header -->
        <div class="flex items-center space-x-4 mb-8">
          <button @click="$router.push('/propiedades')"
            class="rounded-xl bg-white hover:bg-slate-50 px-3 py-2 text-sm flex items-center border border-slate-200">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <span class="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-800">
                Venta
              </span>
              <span class="text-xs font-medium px-2 py-1 rounded"
                :class="propiedad.visible ? 'bg-gray-100 text-gray-800' : 'bg-slate-200 text-slate-600'">
                {{ propiedad.visible ? 'Visible' : 'Oculta' }}
              </span>
              <span class="text-xs font-medium px-2 py-1 rounded border border-slate-300 text-slate-600">
                {{ propiedad.tipo }}
              </span>
            </div>
            <h1 class="text-3xl font-light text-slate-900">{{ propiedad.tituloPublicacion }}</h1>
          </div>
          <div class="flex space-x-2">
            <button class="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm">Editar</button>
            <button class="border border-slate-200 bg-white px-4 py-2 rounded-xl text-sm">Vista Pública</button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Columna principal -->
          <div class="lg:col-span-2 space-y-8">

            <!-- Galería principal -->
            <div class="relative bg-white rounded-3xl border border-gray-100 overflow-hidden">

              <!-- Imagen principal -->
              <img :src="propiedad.imagenes?.[imagenSeleccionada]?.url || '/placeholder.svg'"
                :alt="propiedad.imagenes?.[imagenSeleccionada]?.descripcion || 'Imagen principal'"
                class="w-full h-96 object-cover cursor-pointer" @click="abrirModal" />

              <!-- Flechas para navegar -->
              <button v-if="imagenSeleccionada > 0" @click="anteriorImagen"
                class="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60">
                ‹
              </button>

              <button v-if="propiedad.imagenes && imagenSeleccionada < propiedad.imagenes.length - 1"
                @click="siguienteImagen"
                class="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60">
                ›
              </button>

              <!-- Miniaturas -->
              <div v-if="propiedad.imagenes?.length > 1" class="p-4">
                <div class="grid grid-cols-4 gap-2">
                  <div v-for="(imagen, index) in propiedad.imagenes" :key="index" class="relative cursor-pointer"
                    @click="seleccionarImagen(index)">
                    <img :src="imagen.url" :alt="imagen.descripcion"
                      :class="['w-full h-20 object-cover rounded-lg hover:opacity-80', imagenSeleccionada === index ? 'ring-2 ring-blue-500' : '']" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Características -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Características</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="flex items-center space-x-2" v-if="propiedad.dormitorios">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Home class="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Dormitorios</p>
                    <p class="font-medium text-slate-900">{{ propiedad.dormitorios }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2" v-if="propiedad.baños">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users class="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Baños</p>
                    <p class="font-medium text-slate-900">{{ propiedad.baños }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2" v-if="propiedad.ambientes">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building class="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Ambientes</p>
                    <p class="font-medium text-slate-900">{{ propiedad.ambientes }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2" v-if="propiedad.superficieTotal">
                  <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Wrench class="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Sup. Total</p>
                    <p class="font-medium text-slate-900">{{ propiedad.superficieTotal }} m²</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2" v-if="propiedad.superficieCubierta">
                  <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Home class="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Sup. Cubierta</p>
                    <p class="font-medium text-slate-900">{{ propiedad.superficieCubierta }} m²</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2" v-if="propiedad.antiguedad">
                  <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Calendar class="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Antigüedad</p>
                    <p class="font-medium text-slate-900">{{ propiedad.antiguedad }} años</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Descripción -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6" v-if="propiedad.descripcion">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Descripción</h2>
              <p class="text-slate-700 leading-relaxed">{{ propiedad.descripcion }}</p>
            </div>

            <!-- Mapa -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6" v-if="propiedad.ubicacion?.coordenadas">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Ubicación</h2>
              <div class="bg-slate-100 rounded-xl h-64 flex items-center justify-center">
                <div class="text-center text-slate-600">
                  <MapPin class="w-8 h-8 mx-auto mb-2" />
                  <p>Mapa interactivo</p>
                  <p class="text-sm">
                    Lat: {{ propiedad.ubicacion?.coordenadas?.lat }}, Lng: {{ propiedad.ubicacion?.coordenadas?.lng }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Precio y datos principales -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6">
              <div class="text-center mb-6">
                <div class="flex items-center justify-center mb-2">
                  <DollarSign class="w-6 h-6 text-green-600 mr-1" />
                  <span class="text-3xl font-light text-slate-900">${{ propiedad.precio?.monto?.toLocaleString() }} {{
                    propiedad.precio?.moneda }}</span>
                </div>
                <p class="text-slate-600">Precio de {{ propiedad.operacion }}</p>
              </div>

              <hr class="my-4" />

              <div class="space-y-4 text-sm">
                <div class="flex items-start space-x-3">
                  <MapPin class="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p class="font-medium text-slate-900">Ubicación</p>
                    <p class="text-slate-600">
                      {{ propiedad.ubicacion?.calle }} {{ propiedad.ubicacion?.altura }}
                    </p>
                    <p class="text-slate-600">{{ propiedad.ubicacion?.localidad }}</p>
                    <p v-if="propiedad.ubicacion?.entreCalles?.calle1" class="text-xs text-slate-500">
                      Entre {{ propiedad.ubicacion.entreCalles.calle1 }} y {{ propiedad.ubicacion.entreCalles.calle2 }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <Calendar class="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p class="font-medium text-slate-900">Fecha de publicación</p>
                    <p class="text-slate-600">{{ new Date(propiedad.fechaPublicada).toLocaleDateString('es-AR') }}</p>
                  </div>
                </div>

                <div v-if="propiedad.categoria" class="flex items-start space-x-3">
                  <Home class="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p class="font-medium text-slate-900">Categoría</p>
                    <p class="text-slate-600">{{ propiedad.categoria }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex justify-center items-center min-h-screen">
      <p>Cargando propiedad...</p>
    </div>

    <!-- Modal de imagen ampliada -->
    <div
      v-if="modalAbierto"
      class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      @click.self="cerrarModal"
    >
      <div class="relative max-w-5xl w-full px-4">
        <img
          :src="propiedad.imagenes?.[imagenSeleccionada]?.url"
          :alt="propiedad.imagenes?.[imagenSeleccionada]?.descripcion"
          class="w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
        />

        <!-- Botón cerrar -->
        <button
          @click="cerrarModal"
          class="absolute top-4 right-4 text-white text-3xl font-light"
        >
          &times;
        </button>

        <!-- Flechas navegación -->
        <button
          v-if="imagenSeleccionada > 0"
          @click.stop="anteriorImagen"
          class="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-4xl px-3 rounded-full"
        >
          ‹
        </button>
        <button
          v-if="imagenSeleccionada < propiedad.imagenes.length - 1"
          @click.stop="siguienteImagen"
          class="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-4xl px-3 rounded-full"
        >
          ›
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api'
import { Home, Users, Building, Wrench, MapPin, DollarSign, Calendar } from 'lucide-vue-next'

const propiedad = ref(null)
const route = useRoute()
const imagenSeleccionada = ref(0) // índice de imagen principal mostrada
const modalAbierto = ref(false)

function seleccionarImagen(index) {
  imagenSeleccionada.value = index
}

function anteriorImagen() {
  if (imagenSeleccionada.value > 0) {
    imagenSeleccionada.value--
  }
}

function siguienteImagen() {
  if (propiedad.value && imagenSeleccionada.value < propiedad.value.imagenes.length - 1) {
    imagenSeleccionada.value++
  }
}

function abrirModal() {
  modalAbierto.value = true
}

function cerrarModal() {
  modalAbierto.value = false
}

onMounted(async () => {
  try {
    const id = route.params.id
    const response = await api.get(`/user/propiedad/${id}`)

    propiedad.value = {
      ...response.data.propiedad,
      tipo: response.data.tipo
    }
  } catch (error) {
    console.error('Error al cargar la propiedad', error)
  }
})

</script>
