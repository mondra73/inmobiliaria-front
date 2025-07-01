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
              <!-- Operación -->
              <span class="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-800">
                <span v-if="!editando">{{ propiedad.operacion }}</span>
                <select v-else v-model="form.operacion"
                  class="text-xs font-medium px-1 py-1 rounded bg-green-100 text-green-800">
                  <option value="venta">Venta</option>
                  <option value="alquiler">Alquiler</option>
                  <option value="alquiler temporal">Alquiler Temporal</option>
                </select>
              </span>

              <!-- Visibilidad -->
              <button @click="toggleVisibilidad" :class="[
                'text-xs font-medium px-2 py-1 rounded',
                propiedad.visible ? 'bg-gray-100 text-gray-800' : 'bg-slate-200 text-slate-600',
                !editando && 'opacity-50 cursor-not-allowed'
              ]" :disabled="!editando">
                {{ propiedad.visible ? 'Visible' : 'Oculta' }}
              </button>

              <!-- Tipo -->
              <span class="text-xs font-medium px-2 py-1 rounded border border-slate-300 text-slate-600">
                {{ propiedad.tipo }}
              </span>
            </div>

            <!-- Título -->
            <h1 v-if="!editando" class="text-3xl font-light text-slate-900">{{ propiedad.tituloPublicacion }}</h1>
            <input v-else v-model="form.tituloPublicacion"
              class="text-3xl font-light text-slate-900 border border-gray-300 rounded p-2 w-full" />
          </div>

          <div class="flex space-x-2">
            <button v-if="!editando" @click="activarEdicion"
              class="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm">
              Editar
            </button>
            <button v-else @click="guardarCambios" class="bg-green-600 text-white px-4 py-2 rounded-xl text-sm">
              Guardar
            </button>
            <button v-if="editando" @click="cancelarEdicion"
              class="border border-slate-200 bg-white px-4 py-2 rounded-xl text-sm">
              Cancelar
            </button>

            <!-- Botón Eliminar -->
            <button @click="confirmarEliminacion" :disabled="eliminando" :class="[
              'px-4 py-2 rounded-xl text-sm transition-colors',
              eliminando ? 'bg-red-400 cursor-wait' : 'bg-red-600 hover:bg-red-700 text-white'
            ]">
              <span v-if="!eliminando">Eliminar</span>
              <span v-else>Eliminando...</span>
            </button>

            <a :href="`/propiedad/${propiedad._id}`" target="_blank"
              class="border border-slate-200 bg-white px-4 py-2 rounded-xl text-sm">
              Vista Pública
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Columna principal -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Galería de imágenes -->
            <div class="relative bg-white rounded-3xl border border-gray-100 overflow-hidden">
              <img :src="propiedad.imagenes?.[imagenSeleccionada]?.url || '/placeholder.svg'"
                :alt="propiedad.imagenes?.[imagenSeleccionada]?.descripcion"
                class="w-full h-96 object-cover cursor-pointer" @click="abrirModal" />

              <!-- Navegación de imágenes -->
              <button v-if="imagenSeleccionada > 0" @click="anteriorImagen"
                class="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60">
                ‹
              </button>
              <button v-if="propiedad.imagenes && imagenSeleccionada < propiedad.imagenes.length - 1"
                @click="siguienteImagen"
                class="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60">
                ›
              </button>

              <!-- Editor de imágenes en modo edición -->
              <div v-if="editando" class="p-4 border-t">
                <h3 class="font-medium mb-2">Administrar imágenes</h3>
                <input type="file" multiple @change="handleImageUpload" class="mb-4" />

                <div class="grid grid-cols-4 gap-2">
                  <div v-for="(imagen, index) in form.imagenes" :key="index" class="relative group">
                    <img :src="imagen.url" :class="['w-full h-20 object-cover rounded-lg',
                      imagenSeleccionada === index ? 'ring-2 ring-blue-500' : '']" />
                    <button @click="eliminarImagen(index)"
                      class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      ×
                    </button>
                    <input v-model="imagen.descripcion" placeholder="Descripción"
                      class="text-xs w-full mt-1 p-1 border rounded" />
                  </div>
                </div>
              </div>
              <!-- Miniaturas en modo visualización -->
              <div v-else-if="propiedad.imagenes?.length > 1" class="p-4">
                <div class="grid grid-cols-4 gap-2">
                  <div v-for="(imagen, index) in propiedad.imagenes" :key="index" class="relative cursor-pointer"
                    @click="seleccionarImagen(index)">
                    <img :src="imagen.url" :alt="imagen.descripcion"
                      :class="['w-full h-20 object-cover rounded-lg hover:opacity-80', imagenSeleccionada === index ? 'ring-2 ring-blue-500' : '']" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Características editables -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Características</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <!-- Dormitorios -->
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Home class="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Dormitorios</p>
                    <p v-if="!editando" class="font-medium text-slate-900">{{ propiedad.dormitorios || '-' }}</p>
                    <input v-else v-model.number="form.dormitorios" type="number" class="w-16 border rounded p-1" />
                  </div>
                </div>

                <!-- Baños -->
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users class="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Baños</p>
                    <p v-if="!editando" class="font-medium text-slate-900">{{ propiedad.baños || '-' }}</p>
                    <input v-else v-model.number="form.baños" type="number" class="w-16 border rounded p-1" />
                  </div>
                </div>

                <!-- Ambientes -->
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building class="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Ambientes</p>
                    <p v-if="!editando" class="font-medium text-slate-900">{{ propiedad.ambientes || '-' }}</p>
                    <input v-else v-model.number="form.ambientes" type="number" class="w-16 border rounded p-1" />
                  </div>
                </div>

                <!-- Superficie Total -->
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Wrench class="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Sup. Total (m²)</p>
                    <p v-if="!editando" class="font-medium text-slate-900">{{ propiedad.superficieTotal || '-' }}</p>
                    <input v-else v-model.number="form.superficieTotal" type="number" class="w-16 border rounded p-1" />
                  </div>
                </div>

                <!-- Superficie Cubierta -->
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Home class="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Sup. Cubierta (m²)</p>
                    <p v-if="!editando" class="font-medium text-slate-900">{{ propiedad.superficieCubierta || '-' }}</p>
                    <input v-else v-model.number="form.superficieCubierta" type="number"
                      class="w-16 border rounded p-1" />
                  </div>
                </div>

                <!-- Antigüedad -->
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Calendar class="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Antigüedad (años)</p>
                    <p v-if="!editando" class="font-medium text-slate-900">{{ propiedad.antiguedad || '-' }}</p>
                    <input v-else v-model.number="form.antiguedad" type="number" class="w-16 border rounded p-1" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Descripción editable -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Descripción</h2>
              <p v-if="!editando" class="text-slate-700 leading-relaxed whitespace-pre-line">{{ propiedad.descripcion }}
              </p>
              <textarea v-else v-model="form.descripcion"
                class="text-slate-700 leading-relaxed border border-gray-300 rounded p-2 w-full h-32"></textarea>
            </div>

            <!-- Ubicación editable -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Ubicación</h2>

              <div v-if="!editando" class="space-y-2">
                <p class="text-slate-700">{{ propiedad.tipo === 'Terreno' ? propiedad.calle : propiedad.ubicacion?.calle
                }}
                  {{ propiedad.tipo === 'Terreno' ? propiedad.altura : propiedad.ubicacion?.altura }}</p>
                <p class="text-slate-700">{{ propiedad.tipo === 'Terreno' ? propiedad.localidad :
                  propiedad.ubicacion?.localidad }}</p>
                <p v-if="propiedad.tipo !== 'Terreno' && propiedad.ubicacion?.entreCalles"
                  class="text-slate-500 text-sm">
                  Entre {{ propiedad.ubicacion.entreCalles.calle1 }} y {{ propiedad.ubicacion.entreCalles.calle2 }}
                </p>
              </div>

              <div v-else class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Calle</label>
                  <input v-model="form.ubicacion.calle" class="w-full border rounded p-2" />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Altura</label>
                    <input v-model.number="form.ubicacion.altura" type="number" class="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Localidad</label>
                    <input v-model="form.ubicacion.localidad" class="w-full border rounded p-2" />
                  </div>
                </div>

                <div v-if="propiedad.tipo !== 'Terreno'" class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Entre calle 1</label>
                    <input v-model="form.ubicacion.entreCalles.calle1" class="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Entre calle 2</label>
                    <input v-model="form.ubicacion.entreCalles.calle2" class="w-full border rounded p-2" />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Latitud</label>
                    <input v-model.number="form.ubicacion.coordenadas.lat" type="number" step="0.000001"
                      class="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Longitud</label>
                    <input v-model.number="form.ubicacion.coordenadas.lng" type="number" step="0.000001"
                      class="w-full border rounded p-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Precio y datos principales -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6">
              <div class="text-center mb-6">
                <!-- Precio -->
                <div v-if="!editando" class="flex items-center justify-center mb-2">
                  <DollarSign class="w-6 h-6 text-green-600 mr-1" />
                  <span class="text-3xl font-light text-slate-900">${{ propiedad.precio?.monto?.toLocaleString() }} {{
                    propiedad.precio?.moneda }}</span>
                </div>
                <div v-else class="flex items-center justify-center mb-2 space-x-2">
                  <DollarSign class="w-6 h-6 text-green-600" />
                  <input v-model.number="form.precio.monto" type="number"
                    class="text-3xl font-light text-slate-900 border border-gray-300 rounded p-2 w-32" />
                  <select v-model="form.precio.moneda"
                    class="text-3xl font-light text-slate-900 border border-gray-300 rounded p-2">
                    <option value="ARS">ARS</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <p class="text-slate-600">Precio de {{ propiedad.operacion }}</p>
              </div>

              <hr class="my-4" />

              <div class="space-y-4 text-sm">
                <!-- Categoría -->
                <div class="flex items-start space-x-3">
                  <Home class="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p class="font-medium text-slate-900">Categoría</p>
                    <p v-if="!editando" class="text-slate-600">{{ propiedad.categoria || '-' }}</p>
                    <input v-else v-model="form.categoria" class="w-full border rounded p-1" />
                  </div>
                </div>

                <!-- Fecha de publicación -->
                <div class="flex items-start space-x-3">
                  <Calendar class="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p class="font-medium text-slate-900">Fecha de publicación</p>
                    <p v-if="!editando" class="text-slate-600">{{ new
                      Date(propiedad.fechaPublicada).toLocaleDateString('es-AR') }}</p>
                    <input v-else v-model="form.fechaPublicada" type="date" class="w-full border rounded p-1" />
                  </div>
                </div>

                <!-- Características adicionales según tipo -->
                <template v-if="propiedad.tipo === 'Departamento'">
                  <div class="flex items-start space-x-3">
                    <Building class="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p class="font-medium text-slate-900">Piso</p>
                      <p v-if="!editando" class="text-slate-600">{{ propiedad.piso || '-' }}</p>
                      <input v-else v-model.number="form.piso" type="number" class="w-full border rounded p-1" />
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <DollarSign class="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p class="font-medium text-slate-900">Expensas</p>
                      <p v-if="!editando" class="text-slate-600">${{ propiedad.expensas?.toLocaleString() || '-' }}</p>
                      <input v-else v-model.number="form.expensas" type="number" class="w-full border rounded p-1" />
                    </div>
                  </div>
                </template>

                <template v-if="propiedad.tipo === 'Campo'">
                  <div class="flex items-start space-x-3">
                    <Wrench class="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p class="font-medium text-slate-900">Hectáreas</p>
                      <p v-if="!editando" class="text-slate-600">{{ propiedad.hectareas || '-' }}</p>
                      <input v-else v-model.number="form.hectareas" type="number" class="w-full border rounded p-1" />
                    </div>
                  </div>
                </template>
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
    <div v-if="modalAbierto" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      @click.self="cerrarModal">
      <div class="relative max-w-5xl w-full px-4">
        <img :src="propiedad.imagenes?.[imagenSeleccionada]?.url"
          :alt="propiedad.imagenes?.[imagenSeleccionada]?.descripcion"
          class="w-full max-h-[90vh] object-contain rounded-lg shadow-lg" />
        <button @click="cerrarModal" class="absolute top-4 right-4 text-white text-3xl font-light">
          &times;
        </button>
        <button v-if="imagenSeleccionada > 0" @click.stop="anteriorImagen"
          class="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-4xl px-3 rounded-full">
          ‹
        </button>
        <button v-if="imagenSeleccionada < propiedad.imagenes.length - 1" @click.stop="siguienteImagen"
          class="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-4xl px-3 rounded-full">
          ›
        </button>
      </div>
    </div>

    <!-- Modal de Confirmación -->
    <div v-if="mostrarModalConfirmacion"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 class="text-lg font-medium mb-4">Confirmar eliminación</h3>
        <p class="mb-6">¿Estás seguro que deseas eliminar esta propiedad? Esta acción no se puede deshacer.</p>

        <div class="flex justify-end space-x-3">
          <button @click="mostrarModalConfirmacion = false" class="px-4 py-2 border border-gray-300 rounded-xl text-sm">
            Cancelar
          </button>
          <button @click="eliminarPropiedad"
            class="px-4 py-2 bg-red-600 text-white rounded-xl text-sm hover:bg-red-700">
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Mensajes de estado - Posición fija -->
    <div class="fixed bottom-4 right-4 z-50">
      <transition name="fade">
        <div v-if="mostrarMensaje" class="max-w-xs">
          <div v-if="mensajeExito"
            class="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl text-sm shadow-lg transition-opacity duration-300">
            {{ mensajeExito }}
          </div>
          <div v-else-if="mensajeError"
            class="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-xl text-sm shadow-lg transition-opacity duration-300">
            {{ mensajeError }}
          </div>
        </div>
      </transition>
    </div>
  </div>

</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'
import { Home, Users, Building, Wrench, MapPin, DollarSign, Calendar } from 'lucide-vue-next'
import { uploadImageToCloudinary } from '../../utils/uploadToCloudinary'

// Estados reactivos
const propiedad = ref(null)
const route = useRoute()
const router = useRouter()
const imagenSeleccionada = ref(0)
const modalAbierto = ref(false)
const editando = ref(false)
const form = ref({
  precio: { monto: 0, moneda: 'ARS' },
  ubicacion: { coordenadas: { lat: 0, lng: 0 } },
  imagenes: []
})
const mensajeExito = ref('')
const mensajeError = ref('')
const mostrarMensaje = ref(false)
const mostrarModalConfirmacion = ref(false)
const eliminando = ref(false)
const isTerreno = computed(() => propiedad.value?.tipo === 'Terreno')

// Función para mostrar mensajes temporales
const mostrarMensajeTemporal = (tipo, texto, duracion = 3000) => {
  if (tipo === 'exito') {
    mensajeExito.value = texto
    mensajeError.value = ''
  } else {
    mensajeError.value = texto
    mensajeExito.value = ''
  }

  mostrarMensaje.value = true

  // Ocultar después de la duración especificada
  setTimeout(() => {
    mostrarMensaje.value = false
  }, duracion)
}

// Funciones de imágenes (declaradas una sola vez)
const seleccionarImagen = (index) => {
  imagenSeleccionada.value = index
}

const anteriorImagen = () => {
  if (imagenSeleccionada.value > 0) imagenSeleccionada.value--
}

const siguienteImagen = () => {
  if (propiedad.value?.imagenes && imagenSeleccionada.value < propiedad.value.imagenes.length - 1) {
    imagenSeleccionada.value++
  }
}

// Función para manejar eventos de teclado
const manejarTeclado = (event) => {
  if (!modalAbierto.value) return

  switch (event.key) {
    case 'ArrowLeft':
      anteriorImagen()
      break
    case 'ArrowRight':
      siguienteImagen()
      break
    case 'Escape':
      cerrarModal()
      break
  }
}

const abrirModal = () => {
  modalAbierto.value = true
}

const cerrarModal = () => {
  modalAbierto.value = false
}

// Manejo de imágenes
const handleImageUpload = async (event) => {
  const uploadedFiles = Array.from(event.target.files)
  if (!uploadedFiles.length) return

  try {
    for (const file of uploadedFiles) {
      if (!file.type.match('image.*')) continue
      
      // Subir a Cloudinary
      const cloudinaryResponse = await uploadImageToCloudinary(file)
      
      // Asegurarse que la URL existe antes de agregar
      if (cloudinaryResponse?.secure_url) {
        form.value.imagenes.push({
          url: cloudinaryResponse.secure_url, // URL permanente
          descripcion: '',
          orden: form.value.imagenes.length,
          esPortada: false
        })
      } else {
        throw new Error('No se pudo obtener URL de la imagen')
      }
    }
    mostrarMensajeTemporal('exito', 'Imágenes subidas correctamente')
  } catch (error) {
    console.error('Error al subir imágenes:', error)
    mostrarMensajeTemporal('error', 'Error al subir imágenes: ' + error.message)
  }
}

const eliminarImagen = async (index) => {
  // Opcional: Puedes agregar lógica para borrar la imagen de Cloudinary
  // si necesitas eliminar el archivo físico también
  form.value.imagenes.splice(index, 1)

  if (imagenSeleccionada.value >= form.value.imagenes.length) {
    imagenSeleccionada.value = Math.max(0, form.value.imagenes.length - 1)
  }
}

const eliminarPropiedad = async () => {
  eliminando.value = true

  try {
    const id = route.params.id
    const response = await api.delete(`/admin/eliminar-propiedad/${id}`)

    mostrarMensajeTemporal('exito', 'Propiedad eliminada correctamente')

    // Redirigir a la lista de propiedades después de 1 segundo
    setTimeout(() => {
      router.push('/propiedades')
    }, 1000)

  } catch (error) {
    console.error('Error al eliminar la propiedad:', error)
    mostrarMensajeTemporal('error', 'Error al eliminar: ' + (error.response?.data?.error || error.message))
  }
}

// Función para mostrar confirmación antes de eliminar
const confirmarEliminacion = () => {
  mostrarModalConfirmacion.value = true
}

// Manejo de edición
const activarEdicion = () => {
  editando.value = true
  form.value = JSON.parse(JSON.stringify(propiedad.value))

  // Convertir imágenes con URLs blob a URLs permanentes si es necesario
  form.value.imagenes = form.value.imagenes.map(img => {
    if (img.url.startsWith('blob:')) {
      // Marcar para re-subir o ignorar
      return { ...img, necesitaReupload: true }
    }
    return img
  })

  // Transformación específica para cada tipo
  switch (propiedad.value.tipo) {
    case 'Terreno':
      // Convertir estructura plana a estructura anidada
      form.value.ubicacion = {
        calle: propiedad.value.calle || '',
        altura: propiedad.value.altura || null,
        entreCalles: {
          calle1: propiedad.value.entreCalle1 || '',
          calle2: propiedad.value.entreCalle2 || ''
        },
        localidad: propiedad.value.localidad || '',
        coordenadas: typeof propiedad.value.coordenadas === 'string'
          ? propiedad.value.coordenadas.split(',').reduce((obj, val, i) => {
            obj[i === 0 ? 'lat' : 'lng'] = parseFloat(val.trim()) || 0
            return obj
          }, {})
          : propiedad.value.coordenadas || { lat: 0, lng: 0 },
        mapaUrl: propiedad.value.mapaUrl || ''
      }
      form.value.superficieTotal = propiedad.value.superficie
      form.value.largo = propiedad.value.dimensiones?.largo
      form.value.ancho = propiedad.value.dimensiones?.ancho
      break;

    case 'Departamento':
    case 'Casa':
    default:
      // Convertir string de coordenadas a objeto si es necesario
      if (form.value.ubicacion?.coordenadas && typeof form.value.ubicacion.coordenadas === 'string') {
        const [lat, lng] = form.value.ubicacion.coordenadas.split(',').map(Number)
        form.value.ubicacion.coordenadas = {
          lat: isNaN(lat) ? 0 : lat,
          lng: isNaN(lng) ? 0 : lng
        }
      }
      break;
  }

  // Inicializar objetos anidados si no existen
  if (!form.value.precio) form.value.precio = { monto: 0, moneda: 'ARS' }
  if (!form.value.ubicacion) form.value.ubicacion = {}
  if (!form.value.ubicacion.coordenadas) form.value.ubicacion.coordenadas = { lat: 0, lng: 0 }
  if (!form.value.ubicacion.entreCalles) form.value.ubicacion.entreCalles = { calle1: '', calle2: '' }
  if (!form.value.imagenes) form.value.imagenes = []
}

const cancelarEdicion = () => {
  editando.value = false
}

const toggleVisibilidad = () => {
  if (editando.value) {
    form.value.visible = !form.value.visible
  }
}

const guardarCambios = async () => {
  try {
    const id = route.params.id
    let datosAEnviar = JSON.parse(JSON.stringify(form.value))

    // Filtrar imágenes sin URL válida
    datosAEnviar.imagenes = datosAEnviar.imagenes.filter(img => 
      img.url && typeof img.url === 'string' && img.url.trim() !== ''
    )

    // Verificar que al menos haya una imagen si es requerido
    if (datosAEnviar.imagenes.length === 0) {
      throw new Error('Debe agregar al menos una imagen válida')
    }

    // Transformación específica para cada tipo de propiedad
    switch (propiedad.value.tipo) {
      case 'Terreno':
        // Mantenemos la lógica original para terrenos
        datosAEnviar = {
          ...datosAEnviar,
          calle: datosAEnviar.ubicacion.calle,
          altura: datosAEnviar.ubicacion.altura,
          entreCalle1: datosAEnviar.ubicacion.entreCalles.calle1,
          entreCalle2: datosAEnviar.ubicacion.entreCalles.calle2,
          localidad: datosAEnviar.ubicacion.localidad,
          coordenadas: typeof datosAEnviar.ubicacion.coordenadas === 'object'
            ? `${datosAEnviar.ubicacion.coordenadas.lat}, ${datosAEnviar.ubicacion.coordenadas.lng}`
            : datosAEnviar.ubicacion.coordenadas,
          superficie: datosAEnviar.superficieTotal,
          dimensiones: {
            largo: datosAEnviar.largo,
            ancho: datosAEnviar.ancho
          }
        }
        delete datosAEnviar.ubicacion
        delete datosAEnviar.superficieTotal
        delete datosAEnviar.largo
        delete datosAEnviar.ancho
        break;

      case 'Departamento':
      case 'Casa':
      default:
        // Para departamentos y otros tipos que esperan un objeto en coordenadas
        if (datosAEnviar.ubicacion?.coordenadas) {
          // Si viene como string, convertirlo a objeto
          if (typeof datosAEnviar.ubicacion.coordenadas === 'string') {
            const [lat, lng] = datosAEnviar.ubicacion.coordenadas.split(',').map(Number)
            datosAEnviar.ubicacion.coordenadas = {
              lat: isNaN(lat) ? 0 : lat,
              lng: isNaN(lng) ? 0 : lng
            }
          }
          // Si es null/undefined, establecer objeto vacío
          else if (!datosAEnviar.ubicacion.coordenadas) {
            datosAEnviar.ubicacion.coordenadas = { lat: 0, lng: 0 }
          }
        } else {
          datosAEnviar.ubicacion = {
            ...datosAEnviar.ubicacion,
            coordenadas: { lat: 0, lng: 0 }
          }
        }
        break;
    }

    console.log('Datos a enviar:', datosAEnviar) // Para depuración

    const response = await api.put(`/admin/editar-propiedad/${id}`, {
      tipo: propiedad.value.tipo,
      propiedad: datosAEnviar
    })

    propiedad.value = response.data.propiedad
    editando.value = false
    mostrarMensajeTemporal('exito', 'Propiedad actualizada correctamente')

  } catch (error) {
    console.error('Error al actualizar la propiedad:', error)
    mostrarMensajeTemporal('error', 'Error al actualizar: ' + (error.response?.data?.error || error.message))
  }
}

// Carga inicial
onMounted(async () => {
  // 1. Agregar el event listener del teclado
  window.addEventListener('keydown', manejarTeclado)

  // 2. Cargar los datos de la propiedad
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

onUnmounted(() => {
  window.removeEventListener('keydown', manejarTeclado)
})

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
