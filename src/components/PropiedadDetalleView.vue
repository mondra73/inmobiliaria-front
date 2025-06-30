<template>
  <div class="bg-slate-50 min-h-screen">
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
            <span
              class="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-800">
              Venta
            </span>
            <span
              class="text-xs font-medium px-2 py-1 rounded"
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
          <div class="bg-white rounded-3xl border border-gray-100 overflow-hidden">
            <img
              :src="propiedad.imagenes[0]?.url || '/placeholder.svg'"
              class="w-full h-96 object-cover"
              :alt="propiedad.imagenes[0]?.descripcion || 'Imagen principal'"
            />
            <div v-if="propiedad.imagenes.length > 1" class="p-4">
              <div class="grid grid-cols-4 gap-2">
                <div
                  v-for="(imagen, index) in propiedad.imagenes.slice(1, 5)"
                  :key="index"
                  class="relative">
                  <img :src="imagen.url" :alt="imagen.descripcion"
                       class="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80" />
                  <div v-if="index === 3 && propiedad.imagenes.length > 5"
                       class="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                    <span class="text-white font-medium">+{{ propiedad.imagenes.length - 4 }}</span>
                  </div>
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
                  Lat: {{ propiedad.ubicacion.coordenadas.lat }}, Lng: {{ propiedad.ubicacion.coordenadas.lng }}
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
                <span class="text-3xl font-light text-slate-900">${{ propiedad.precio?.monto?.toLocaleString() }} {{ propiedad.precio?.moneda }}</span>
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
                    {{ propiedad.ubicacion.calle }} {{ propiedad.ubicacion.altura }}
                  </p>
                  <p class="text-slate-600">{{ propiedad.ubicacion.localidad }}</p>
                  <p v-if="propiedad.ubicacion.entreCalles?.calle1" class="text-xs text-slate-500">
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
</template>

<script setup>
import { ref } from 'vue'
import { Home, Users, Building, Wrench, MapPin, DollarSign, Calendar } from 'lucide-vue-next'

// Simulación de propiedad (remplazá esto por tu API real en mounted)
const propiedad = ref({
  tipo: 'Casa',
  tituloPublicacion: 'Casa 3 dormitorios con jardín y piscina en zona residencial',
  visible: true,
  operacion: 'venta',
  precio: { monto: 180000, moneda: 'USD' },
  ubicacion: {
    calle: 'Av. Libertador',
    altura: 1234,
    entreCalles: { calle1: 'San Martín', calle2: 'Belgrano' },
    localidad: 'San Isidro',
    coordenadas: { lat: -34.6037, lng: -58.3816 },
  },
  descripcion: 'Hermosa casa familiar ubicada en una zona residencial muy tranquila...',
  antiguedad: 8,
  categoria: 'Residencial',
  fechaPublicada: '2024-01-15',
  dormitorios: 3,
  baños: 2,
  ambientes: 5,
  superficieTotal: 250,
  superficieCubierta: 180,
  piscina: true,
  parrilla: true,
  jardin: true,
  terraza: false,
  garage: true,
  balcon: false,
  imagenes: [
    { url: '/placeholder.svg?height=400&width=600', descripcion: 'Frente de la casa' },
    { url: '/placeholder.svg?height=400&width=600', descripcion: 'Living comedor' },
    { url: '/placeholder.svg?height=400&width=600', descripcion: 'Cocina' },
    { url: '/placeholder.svg?height=400&width=600', descripcion: 'Dormitorio' },
    { url: '/placeholder.svg?height=400&width=600', descripcion: 'Jardín' },
    { url: '/placeholder.svg?height=400&width=600', descripcion: 'Baño' },
  ]
})
</script>
