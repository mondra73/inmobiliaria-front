<template>
  <div class="bg-slate-50 min-h-screen">
    <div class="max-w-4xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-4 mb-4">
          <button @click="goToDashboard" class="text-slate-600 hover:text-slate-900 transition-colors duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <h1 class="text-3xl font-light text-slate-900">
            Agregar <span class="font-semibold">Nueva Propiedad</span>
          </h1>
        </div>
        <p class="text-slate-600">
          Complete todos los campos para agregar la propiedad al sistema
        </p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="submitForm" class="space-y-8">
        <!-- Información básica -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-xl font-light text-slate-900 mb-6">
            Información <span class="font-semibold">Básica</span>
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="lg:col-span-2">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="titulo">Título de la propiedad</label>
              <input id="titulo" type="text" v-model="formData.tituloPublicacion"
                placeholder="Ej: Casa 3 dormitorios con jardín"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="tipo-propiedad">Tipo de
                propiedad</label>
              <select id="tipo-propiedad" v-model="formData.categoria" @change="handlePropertyTypeChange"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm appearance-none bg-white">
                <option value="">Seleccionar tipo</option>
                <option>Casa</option>
                <option>Departamento</option>
                <option>Local comercial</option>
                <option>Terreno</option>
                <option>Campo</option>
                <option>Fondo de Comercio</option>
              </select>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="tipo-operacion">Tipo de
                operación</label>
              <select id="tipo-operacion" v-model="formData.operacion"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm appearance-none bg-white">
                <option value="">Seleccionar tipo</option>
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
                <option value="alquiler temporal">Alquiler temporal</option>
              </select>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="precio">Precio</label>
              <input id="precio" type="number" v-model.number="formData.precio.monto" placeholder="$" min="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="moneda">Moneda</label>
              <select id="moneda" v-model="formData.precio.moneda"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm appearance-none bg-white">
                <option value="ARS">Pesos argentinos</option>
                <option value="USD">Dólares americanos</option>
              </select>
            </div>

            <div class="lg:col-span-2">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="descripcion">Descripción</label>
              <textarea id="descripcion" rows="4" v-model="formData.descripcion"
                placeholder="Descripción detallada de la propiedad..."
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm"></textarea>
            </div>
          </div>
        </div>

        <!-- Ubicación -->
        <div v-if="showLocationSection" class="bg-white rounded-3xl shadow-sm border border-gray-500 p-8">
          <h2 class="text-xl font-light text-slate-900 mb-6">Ubicación</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div v-if="!isCampo">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="calle">Calle</label>
              <input id="calle" type="text" v-model="formData.ubicacion.calle" placeholder="Ej: Av. Siempreviva"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div v-if="!isCampo">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="altura">Altura</label>
              <input id="altura" type="number" v-model.number="formData.ubicacion.altura" placeholder="Ej: 742" min="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div v-if="!isCampo">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="entre-calle1">Entre calle 1</label>
              <input id="entre-calle1" type="text" v-model="formData.ubicacion.entreCalles.calle1"
                placeholder="Ej: Calle Falsa"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div v-if="!isCampo">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="entre-calle2">Entre calle 2</label>
              <input id="entre-calle2" type="text" v-model="formData.ubicacion.entreCalles.calle2"
                placeholder="Ej: Calle Verdadera"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="localidad">Localidad</label>
              <input id="localidad" type="text" v-model="formData.ubicacion.localidad" placeholder="Ej: Springfield"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="coordenadas">Coordenadas
                (lat,lng)</label>
              <input id="coordenadas" type="text" v-model="formData.ubicacion.coordenadas"
                placeholder="-34.6037, -58.3816"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>
          </div>
        </div>

        <!-- Características -->
        <div v-if="showFeaturesSection" class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-xl font-light text-slate-900 mb-6">Características</h2>

          <!-- Características numéricas -->
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div v-if="showBedroomsField">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="dormitorios">Dormitorios</label>
              <input id="dormitorios" type="number" v-model.number="formData.dormitorios" placeholder="0" min="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div v-if="showBathroomsField">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="banos">Baños</label>
              <input id="banos" type="number" v-model.number="formData.baños" placeholder="0" min="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div v-if="!isCampo">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="superficie-total">Sup. Total
                (m²)</label>
              <input id="superficie-total" type="number" v-model.number="formData.superficieTotal" placeholder="0"
                min="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div v-if="isCampo">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="hectareas">Hectáreas</label>
              <input id="hectareas" type="number" v-model.number="formData.hectareas" placeholder="0" min="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div v-if="showCoveredSurfaceField">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="superficie-cubierta">Sup. Cubierta
                (m²)</label>
              <input id="superficie-cubierta" type="number" v-model.number="formData.superficieCubierta" placeholder="0"
                min="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div v-if="showAgeField">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="antiguedad">Antigüedad (años)</label>
              <input id="antiguedad" type="number" v-model.number="formData.antiguedad" placeholder="0" min="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div v-if="showRoomsField">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="ambientes">Ambientes</label>
              <input id="ambientes" type="number" v-model.number="formData.ambientes" placeholder="0" min="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <!-- Campos específicos para terrenos -->
            <div v-if="formData.categoria === 'Terreno'">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="largo">Largo (m)</label>
              <input id="largo" type="number" v-model.number="formData.largo" placeholder="0" min="0" step="0.01"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div v-if="formData.categoria === 'Terreno'">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="ancho">Ancho (m)</label>
              <input id="ancho" type="number" v-model.number="formData.ancho" placeholder="0" min="0" step="0.01"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>
          </div>

          <!-- Servicios Básicos - Todos los tipos de propiedades -->
          <div v-if="showBasicServicesSection" class="mb-8">
            <h3 class="text-lg font-medium text-slate-700 mb-4">Servicios Básicos</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
              <label
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.servicios.agua"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Agua corriente</span>
              </label>
              <label
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.servicios.luz"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Luz eléctrica</span>
              </label>
              <label
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.servicios.cloacas"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Cloacas</span>
              </label>
              <label
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.servicios.gas"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Gas natural</span>
              </label>
            </div>
          </div>

          <!-- Amenities - Solo para propiedades residenciales -->
          <div v-if="showAmenitiesSection" class="mb-8">
            <h3 class="text-lg font-medium text-slate-700 mb-4">Amenities</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
              <label v-if="showGarageField"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.garage"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Garage</span>
              </label>
              <label v-if="showGardenField"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.jardin"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Jardín</span>
              </label>
              <label v-if="showPoolField"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.piscina"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Piscina</span>
              </label>
              <label v-if="showBalconyField"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.balcon"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Balcón</span>
              </label>
              <label v-if="showTerraceField"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.terraza"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Terraza</span>
              </label>
              <label v-if="showGrillField"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.parrilla"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Parrilla</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Imágenes -->
        <div v-if="showImagesSection" class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-xl font-light text-slate-900 mb-6">Imágenes</h2>

          <input type="file" id="file-upload" ref="fileInput" class="hidden" multiple accept="image/png, image/jpeg"
            @change="handleFileUpload">

          <label for="file-upload"
            class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-slate-400 transition-colors duration-200 cursor-pointer block">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
              </path>
            </svg>
            <p class="text-slate-600 mb-2">Arrastra las imágenes aquí o</p>
            <span class="text-slate-900 font-medium hover:text-slate-700 transition-colors duration-200">
              selecciona archivos
            </span>
            <p class="text-xs text-slate-500 mt-2">PNG, JPG hasta 10MB cada una</p>
          </label>

          <div v-if="files.length > 0" class="mt-4 grid grid-cols-3 gap-4">
            <div v-for="(file, index) in files" :key="index" class="relative">
              <img :src="file.preview" class="w-full h-32 object-cover rounded-lg">
              <button @click="removeFile(index)"
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                ×
              </button>
            </div>
          </div>
        </div>

        <!-- Botones de acción -->
        <div v-if="showActionButtons" class="flex justify-end space-x-4">
          <button type="button" @click="resetForm"
            class="px-8 py-4 border-2 border-gray-300 text-slate-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200">
            Cancelar
          </button>
          <button type="submit"
            class="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors duration-200 shadow-md">
            Guardar Propiedad
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()
const fileInput = ref(null)
const files = ref([])

// Estado inicial del formulario
const initialFormData = {
  tituloPublicacion: '',
  operacion: '',
  visible: false,
  ubicacion: {
    calle: '',
    altura: null,
    entreCalles: {
      calle1: '',
      calle2: ''
    },
    localidad: '',
    coordenadas: null
  },
  descripcion: '',
  antiguedad: null,
  categoria: '',
  tipoOperacion: '',
  precio: {
    monto: null,
    moneda: 'ARS'
  },
  // Características
  baños: null,
  dormitorios: null,
  ambientes: null,
  superficieTotal: null,
  superficieCubierta: null,
  hectareas: null,
  largo: null,
  ancho: null,
  // Amenities
  piscina: false,
  parrilla: false,
  jardin: false,
  terraza: false,
  garage: false,
  balcon: false,
  // Servicios
  servicios: {
    agua: false,
    luz: false,
    cloacas: false,
    gas: false
  },
  imagenes: []
}

// Estado inicial del formulario
const formData = ref(JSON.parse(JSON.stringify(initialFormData)))

// Computed properties para controlar la visibilidad
const showLocationSection = computed(() => !!formData.value.categoria)
const showFeaturesSection = computed(() => !!formData.value.categoria)
const showImagesSection = computed(() => !!formData.value.categoria)
const showActionButtons = computed(() => !!formData.value.categoria)

// Verificar si es un campo
const isCampo = computed(() => formData.value.categoria === 'Campo')

// Campos según tipo de propiedad
const showBedroomsField = computed(() => ['Casa', 'Departamento'].includes(formData.value.categoria))
const showBathroomsField = computed(() => ['Casa', 'Departamento', 'Local comercial'].includes(formData.value.categoria))
const showTotalSurfaceField = computed(() => true)
const showCoveredSurfaceField = computed(() => ['Casa', 'Departamento', 'Local comercial'].includes(formData.value.categoria))
const showAgeField = computed(() => ['Casa', 'Departamento', 'Local comercial'].includes(formData.value.categoria))
const showRoomsField = computed(() => ['Casa', 'Departamento'].includes(formData.value.categoria))
const showBasicServicesSection = computed(() =>
  ['Casa', 'Departamento', 'Local comercial', 'Fondo de Comercio', 'Terreno'].includes(formData.value.categoria)
)

// Amenities
const showGarageField = computed(() => ['Casa', 'Departamento'].includes(formData.value.categoria))
const showGardenField = computed(() => ['Casa'].includes(formData.value.categoria))
const showPoolField = computed(() => ['Casa'].includes(formData.value.categoria))
const showBalconyField = computed(() => ['Casa', 'Departamento'].includes(formData.value.categoria))
const showTerraceField = computed(() => ['Casa', 'Departamento'].includes(formData.value.categoria))
const showGrillField = computed(() => ['Casa'].includes(formData.value.categoria))
const showAmenitiesSection = computed(() => ['Casa', 'Departamento'].includes(formData.value.categoria))

const endpointsPorCategoria = {
  'Casa': '/admin/nueva-casa',
  'Departamento': '/admin/nuevo-dpto',
  'Campo': '/admin/nuevo-campo',
  'Fondo de Comercio': '/admin/nuevo-fondo',
  'Local comercial': '/admin/nuevo-local',
  'Terreno': '/admin/nuevo-terreno'
}

// Función para obtener el endpoint
const getEndpoint = (categoria) => {
  return endpointsPorCategoria[categoria]
}

// Función para preparar el payload según el tipo
const preparePayload = (formData) => {
  // Clonamos el objeto para no modificar el original
  const payload = JSON.parse(JSON.stringify(formData))

  // Eliminar campos que no deben enviarse
  delete payload.tipoOperacion 
  delete payload.hectareas

  // Validar operación
  if (!['venta', 'alquiler', 'alquiler temporal'].includes(payload.operacion)) {
    throw new Error('Tipo de operación no válido')
  }

  // Eliminamos campos que no deben enviarse para ningún tipo
  delete payload.hectareas

  // Transformaciones específicas por tipo de propiedad
  switch(formData.categoria) {
    case 'Campo':
      if (formData.hectareas) {
        payload.superficieTotal = formData.hectareas * 10000
      }
      delete payload.ubicacion.calle
      delete payload.ubicacion.altura
      delete payload.ubicacion.entreCalles
      break
      
    case 'Terreno':
      payload.dimensiones = {
        largo: formData.largo,
        ancho: formData.ancho
      }
      delete payload.largo
      delete payload.ancho
      break
  }

  return payload
}

// Manejo de eventos
const handlePropertyTypeChange = () => {
  // Limpiar todos los campos cuando cambia el tipo de propiedad
  resetForm()
  console.log('Tipo de propiedad seleccionado:', formData.value.categoria)
}

const handleFileUpload = (event) => {
  const uploadedFiles = Array.from(event.target.files)
  files.value = []

  uploadedFiles.forEach(file => {
    if (!file.type.match('image.*')) return

    const reader = new FileReader()
    reader.onload = (e) => {
      files.value.push({
        file: file,
        preview: e.target.result
      })

      formData.value.imagenes.push({
        url: URL.createObjectURL(file),
        descripcion: '',
        orden: formData.value.imagenes.length,
        esPortada: formData.value.imagenes.length === 0
      })
    }
    reader.readAsDataURL(file)
  })
}

const submitForm = async () => {
  try {
    // 1. Verificación de autenticación
    const token = localStorage.getItem('auth-token')
    if (!token) {
      alert('No estás autenticado. Por favor inicia sesión.')
      return router.push('/login')
    }

    // 2. Validaciones básicas
    if (!formData.value.tituloPublicacion) {
      alert('Por favor complete el título de la propiedad')
      return
    }

    if (!formData.value.ubicacion.localidad) {
      alert('Por favor ingrese la localidad')
      return
    }

    if (!formData.value.categoria) {
      alert('Por favor seleccione un tipo de propiedad')
      return
    }

    if (!formData.value.operacion) {
      alert('Por favor seleccione un tipo de operación')
      return
    }

    // Validación específica para operación
    const operacionesValidas = ['venta', 'alquiler', 'alquiler temporal']
    if (!operacionesValidas.includes(formData.value.operacion)) {
      alert('Tipo de operación no válido')
      return
    }

    if (!formData.value.precio.monto || formData.value.precio.monto <= 0) {
      alert('Por favor ingrese un precio válido')
      return
    }

    // 3. Obtener el endpoint correcto
    const endpoint = getEndpoint(formData.value.categoria)
    if (!endpoint) {
      alert('Tipo de propiedad no válido o no implementado')
      return
    }

    // 4. Preparar el payload específico
    const payload = preparePayload(formData.value)
    console.log('Payload final a enviar:', payload)

    // 5. Convertir coordenadas si es necesario
    if (typeof payload.ubicacion.coordenadas === 'string') {
      const [lat, lng] = payload.ubicacion.coordenadas.split(',').map(Number)
      payload.ubicacion.coordenadas = { lat, lng }
    }

    // 6. Enviar los datos
    console.log('Payload completo a enviar:', payload) 
    console.log(`Enviando datos a ${endpoint}:`, payload)
    const response = await api.post(endpoint, payload)

    // 7. Manejar respuesta exitosa
    alert(`${formData.value.categoria} creado con éxito!`)
    router.push(`/propiedad/${response.data.id}`)

  } catch (error) {
    console.error('Error al enviar el formulario:', error)

    // Manejo mejorado de errores
    let errorMessage = 'Error al guardar la propiedad'

    if (error.response) {
      // Error específico del backend
      if (error.response.data?.message) {
        errorMessage = error.response.data.message
      }

      // Manejo de no autorizado
      if (error.response.status === 401) {
        errorMessage = 'Sesión expirada. Por favor inicie sesión nuevamente.'
        router.push('/login')
      }
    } else if (error.message) {
      errorMessage = error.message
    }

    alert(errorMessage)
  }
}

const resetForm = () => {
  // Guardar solo los valores que queremos mantener
  const categoria = formData.value.categoria
  const moneda = formData.value.precio.moneda

  // Resetear todo el formulario
  formData.value = JSON.parse(JSON.stringify(initialFormData))

  // Restaurar los valores seleccionados
  formData.value.categoria = categoria
  formData.value.precio.moneda = moneda
  // Operación se reinicia a vacío (placeholder)

  files.value = []
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const removeFile = (index) => {
  files.value.splice(index, 1)
  formData.value.imagenes.splice(index, 1)
}
</script>

<style>
.custom-checkbox:checked+.checkmark::after {
  display: block;
}
</style>