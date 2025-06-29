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
            Información
            <span class="font-semibold">Básica</span>
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
              <select id="tipo-propiedad" v-model="formData.categoria"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm appearance-none bg-white">
                <option>Seleccionar tipo</option>
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
              <select id="tipo-operacion"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm appearance-none bg-white">
                <option>Seleccionar operación</option>
                <option>Venta</option>
                <option>Alquiler</option>
                <option>Alquiler temporal</option>
              </select>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="precio">Precio</label>
              <input id="precio" type="number" v-model.number="formData.precio.monto" placeholder="$"
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
        <div class="bg-white rounded-3xl shadow-sm border border-gray-500 p-8">
          <h2 class="text-xl font-light text-slate-900 mb-6">Ubicación</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="calle">Calle</label>
              <input id="calle" type="text" v-model="formData.ubicacion.calle" placeholder="Ej: Av. Siempreviva"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="altura">Altura</label>
              <input id="altura" type="number" v-model.number="formData.ubicacion.altura" placeholder="Ej: 742"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="entre-calle1">Entre calle 1</label>
              <input id="altura" type="number" v-model.number="formData.ubicacion.altura" placeholder="Ej: 742"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
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
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-xl font-light text-slate-900 mb-6">
            Características
          </h2>

          <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="dormitorios">Dormitorios</label>
              <input id="dormitorios" type="number" v-model.number="formData.dormitorios" placeholder="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="banos">Baños</label>
              <input id="banos" type="number" placeholder="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="superficie-total">Sup. Total
                (m²)</label>
              <input id="superficie-total" type="number" placeholder="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="superficie-cubierta">Sup. Cubierta
                (m²)</label>
              <input id="superficie-cubierta" type="number" placeholder="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="antiguedad">Antigüedad (años)</label>
              <input id="antiguedad" type="number" placeholder="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="ambientes">Ambientes</label>
              <input id="ambientes" type="number" placeholder="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

          </div>

          <!-- Amenities -->
          <div class="mt-6">
            <label class="block mb-4 text-sm font-medium text-slate-700">
              Amenities
            </label>
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <label class="flex items-center space-x-3 text-slate-700 cursor-pointer">
                <input type="checkbox" v-model="formData.piscina"
                  class="h-5 w-5 rounded bg-white border-gray-500 border shadow-sm accent-black focus:ring-2 focus:ring-slate-300 hover:ring hover:ring-slate-200 transition" />
                <span>Garage</span>
              </label>
              <label class="flex items-center space-x-3 text-slate-700 cursor-pointer">
                <input type="checkbox" v-model="formData.piscina"
                  class="h-5 w-5 rounded bg-white border-gray-500 border shadow-sm accent-black focus:ring-2 focus:ring-slate-300 hover:ring hover:ring-slate-200 transition" />
                <span>Jardín</span>
              </label>
              <label class="flex items-center space-x-3 text-slate-700 cursor-pointer">
                <input type="checkbox" v-model="formData.piscina"
                  class="h-5 w-5 rounded bg-white border-gray-500 border shadow-sm accent-black focus:ring-2 focus:ring-slate-300 hover:ring hover:ring-slate-200 transition" />
                <span>Piscina</span>
              </label>
              <label class="flex items-center space-x-3 text-slate-700 cursor-pointer">
                <input type="checkbox" v-model="formData.piscina"
                  class="h-5 w-5 rounded bg-white border-gray-500 border shadow-sm accent-black focus:ring-2 focus:ring-slate-300 hover:ring hover:ring-slate-200 transition" />
                <span>Balcón</span>
              </label>
              <label class="flex items-center space-x-3 text-slate-700 cursor-pointer">
                <input type="checkbox" v-model="formData.piscina"
                  class="h-5 w-5 rounded bg-white border-gray-500 border shadow-sm accent-black focus:ring-2 focus:ring-slate-300 hover:ring hover:ring-slate-200 transition" />
                <span>Terraza</span>
              </label>
              <label class="flex items-center space-x-3 text-slate-700 cursor-pointer">
                <input type="checkbox" v-model="formData.piscina"
                  class="h-5 w-5 rounded bg-white border-gray-500 border shadow-sm accent-black focus:ring-2 focus:ring-slate-300 hover:ring hover:ring-slate-200 transition" />
                <span>Parrilla</span>
              </label>
            </div>
          </div>

        </div>

        <!-- Imágenes -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-xl font-light text-slate-900 mb-6">
            Imágenes
          </h2>

          <!-- Input de tipo file oculto -->
          <input type="file" id="file-upload" ref="fileInput" class="hidden" multiple accept="image/png, image/jpeg"
            @change="handleFileUpload">

          <label for="file-upload"
            class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-slate-400 transition-colors duration-200 cursor-pointer block">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
              </path>
            </svg>
            <p class="text-slate-600 mb-2">
              Arrastra las imágenes aquí o
            </p>
            <span class="text-slate-900 font-medium hover:text-slate-700 transition-colors duration-200">
              selecciona archivos
            </span>
            <p class="text-xs text-slate-500 mt-2">
              PNG, JPG hasta 10MB cada una
            </p>
          </label>

          <!-- Mostrar previsualización de imágenes seleccionadas -->
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
        <div class="flex justify-end space-x-4">
          <button type="button"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref(null)
const files = ref([])

const formData = ref({
  tituloPublicacion: '',
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
  categoria: 'Casa', // Valor por defecto
  precio: {
    monto: null,
    moneda: 'ARS' // Valor por defecto
  },
  baños: null,
  dormitorios: null,
  ambientes: null,
  piscina: false,
  parrilla: false,
  jardin: false,
  terraza: false,
  garage: false,
  balcon: false,
  superficieTotal: null,
  superficieCubierta: null,
  imagenes: []
})

// Manejo de archivos
const handleFileUpload = (event) => {
  const uploadedFiles = Array.from(event.target.files)

  uploadedFiles.forEach(file => {
    if (!file.type.match('image.*')) return

    const reader = new FileReader()
    reader.onload = (e) => {
      files.value.push({
        file: file,
        preview: e.target.result
      })

      // Aquí deberías subir el archivo a tu servidor o servicio (Cloudinary, S3, etc.)
      // y luego guardar la URL en formData.value.imagenes
      // Ejemplo simplificado:
      formData.value.imagenes.push({
        url: URL.createObjectURL(file), // Esto es temporal, debes reemplazarlo con la URL real
        descripcion: '',
        orden: formData.value.imagenes.length,
        esPortada: formData.value.imagenes.length === 0
      })
    }
    reader.readAsDataURL(file)
  })
}

// Enviar formulario
const submitForm = async () => {
  try {
    // Validación básica
    if (!formData.value.tituloPublicacion || !formData.value.ubicacion.localidad) {
      alert('Por favor complete el título y la localidad')
      return
    }

    // Convertir coordenadas si es necesario
    if (typeof formData.value.ubicacion.coordenadas === 'string') {
      const [lat, lng] = formData.value.ubicacion.coordenadas.split(',').map(Number)
      formData.value.ubicacion.coordenadas = { lat, lng }
    }

    // Enviar datos al backend
    const response = await fetch('http://localhost:3000/api/nueva-casa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Asumiendo que usas JWT
      },
      body: JSON.stringify(formData.value)
    })

    if (!response.ok) throw new Error('Error al guardar la propiedad')

    const data = await response.json()
    alert('Propiedad creada con éxito!')
    router.push(`/propiedad/${data.id}`) // Redirigir a la vista de la propiedad

  } catch (error) {
    console.error('Error:', error)
    alert('Hubo un error al guardar la propiedad. Por favor intente nuevamente.')
  }
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
