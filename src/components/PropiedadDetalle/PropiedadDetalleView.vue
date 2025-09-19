<template>
  <div>
    <div v-if="propiedad" class="bg-slate-50 min-h-screen">
      <div class="max-w-6xl mx-auto px-6 py-8">
        <div class="flex items-center space-x-4 mb-8">
          <button @click="handleVolver"
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
              <button v-if="puedeEditarEliminar" @click="toggleVisibilidad" :class="[
                'text-xs font-medium px-2 py-1 rounded',
                editando ? form.visible ? 'bg-gray-100 text-gray-800' : 'bg-slate-200 text-slate-600'
                  : propiedad.visible ? 'bg-gray-100 text-gray-800' : 'bg-slate-200 text-slate-600',
                !editando && 'opacity-50 cursor-not-allowed'
              ]" :disabled="!editando">
                {{ editando ? form.visible ? 'Visible' : 'Oculta' : propiedad.visible ? 'Visible' : 'Oculta' }}
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
            <button v-if="!editando && puedeEditarEliminar" @click="activarEdicion"
              class="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm">
              Editar
            </button>
            <button v-else-if="editando && puedeEditarEliminar" @click="guardarCambios"
              class="bg-green-600 text-white px-4 py-2 rounded-xl text-sm">
              Guardar
            </button>
            <button v-if="editando && puedeEditarEliminar" @click="cancelarEdicion"
              class="border border-slate-200 bg-white px-4 py-2 rounded-xl text-sm">
              Cancelar
            </button>

            <button v-if="puedeEditarEliminar" @click="confirmarEliminacion" :disabled="eliminando" :class="[
              'px-4 py-2 rounded-xl text-sm transition-colors',
              eliminando ? 'bg-red-400 cursor-wait' : 'bg-red-600 hover:bg-red-700 text-white'
            ]">
              <span v-if="!eliminando">Eliminar</span>
              <span v-else>Eliminando...</span>
            </button>

            <a v-if="puedeEditarEliminar" :href="`/propiedad/${propiedad._id}`" target="_blank"
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
                <input type="file" multiple @change="handleImageUpload" class="mb-4" accept="image/*" ref="fileInput" />

                <div class="grid grid-cols-4 gap-2">
                  <div v-for="(imagen, index) in form.imagenes" :key="index" class="relative group">
                    <img :src="imagen.url" :class="['w-full h-20 object-cover rounded-lg',
                      imagenSeleccionada === index ? 'ring-2 ring-blue-500' : '']" />

                    <!-- Botón de eliminar (cruz) -->
                    <button @click.stop="eliminarImagen(index)" class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center
               opacity-80 hover:opacity-100 transition-opacity delete-image-btn" title="Eliminar imagen">
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

            <!-- Descripción editable -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Descripción</h2>
              <p v-if="!editando" class="text-slate-700 leading-relaxed whitespace-pre-line">{{ propiedad.descripcion }}
              </p>
              <textarea v-else v-model="form.descripcion"
                class="text-slate-700 leading-relaxed border border-gray-300 rounded p-2 w-full h-32"></textarea>
            </div>

            <!-- Caracteristicas -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6" v-if="propiedad">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Características</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="item in featureItems" :key="item.id" class="flex items-center space-x-2">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="item.iconBg">
                    <component :is="item.icon" class="w-4 h-4" :class="item.iconColor" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">{{ item.label }}</p>
                    <p v-if="!editando" class="font-medium text-slate-900">{{ propiedad[item.id] || '-' }}</p>
                    <input v-else v-model.number="form[item.id]" type="number" class="w-16 border rounded p-1" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Servicios Basicos -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6" v-if="propiedad?.servicios">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Servicios Básicos</h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
                <div v-for="(label, key) in serviciosConfig" :key="key"
                  class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                  <input type="checkbox" :checked="editando ? form.servicios[key] : propiedad.servicios[key]"
                    :disabled="!editando" @change="editando && (form.servicios[key] = $event.target.checked)"
                    class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                  <span class="text-sm font-medium text-slate-700">{{ label }}</span>
                </div>
              </div>
            </div>

            <!-- Amenities -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6" v-if="amenitiesConfig[propiedad.tipo]">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Amenities</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
                <div v-for="(label, key) in amenitiesConfig[propiedad.tipo]" :key="key"
                  class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                  <input type="checkbox" :checked="editando ? form.amenities[key] : propiedad.amenities?.[key]"
                    :disabled="!editando" @change="editando && (form.amenities[key] = $event.target.checked)"
                    class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                  <span class="text-sm font-medium text-slate-700">{{ label }}</span>
                </div>
              </div>
            </div>

            <!-- Ubicación editable -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Ubicación</h2>

              <!-- Modo visualización -->
              <template v-if="!editando">
                <!-- Para Terrenos (estructura simple) -->
                <template v-if="propiedad.tipo === 'Terreno'">
                  <p class="text-slate-700">
                    {{ propiedad.ubicacion?.localidad || 'Sin localidad especificada' }}
                  </p>
                </template>

                <!-- Para otros tipos de propiedades (estructura compleja) -->
                <template v-else>
                  <!-- Calle y altura -->
                  <p class="text-slate-700">
                    {{ propiedad.ubicacion?.calle }} {{ propiedad.ubicacion?.altura }}
                  </p>

                  <!-- Localidad -->
                  <p class="text-slate-700">
                    {{ propiedad.ubicacion?.localidad }}
                  </p>

                  <!-- Piso (solo para Departamentos) -->
                  <p v-if="propiedad.tipo === 'Departamento' && propiedad.ubicacion?.piso !== undefined"
                    class="text-slate-700">
                    Piso: {{ propiedad.ubicacion.piso === 0 ? 'PB' : propiedad.ubicacion.piso }}
                  </p>

                  <!-- Entre calles -->
                  <p v-if="propiedad.tipo !== 'Terreno' &&
                    propiedad.ubicacion?.entreCalles &&
                    propiedad.ubicacion.entreCalles.calle1 &&
                    propiedad.ubicacion.entreCalles.calle2" class="text-slate-500 text-sm">
                    Entre {{ propiedad.ubicacion.entreCalles.calle1 }} y {{ propiedad.ubicacion.entreCalles.calle2 }}
                  </p>
                </template>

                <!-- Mapa (común para todos los tipos) -->
                <div v-if="mostrarMapa" class="mt-4 w-full h-64 rounded-xl overflow-hidden shadow-lg">
                  <iframe width="100%" height="100%" style="border:0" loading="lazy" allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade" :src="urlMapa">
                  </iframe>
                </div>
              </template>

              <!-- Modo edición -->
              <div v-else class="space-y-4">
                <!-- Para Terrenos -->
                <template v-if="propiedad.tipo === 'Terreno'">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Localidad</label>
                    <input v-model="form.localidad" class="w-full border rounded p-2" />
                  </div>
                </template>

                <!-- Para otros tipos de propiedades -->
                <template v-else>
                  <!-- Calle -->
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Calle</label>
                    <input v-model="form.ubicacion.calle" class="w-full border rounded p-2" />
                  </div>

                  <!-- Altura y Localidad -->
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

                  <!-- Piso (solo para Departamentos) -->
                  <div v-if="propiedad.tipo === 'Departamento'" class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-slate-700 mb-1">Piso</label>
                      <input v-model.number="form.ubicacion.piso" type="number" class="w-full border rounded p-2" />
                    </div>
                  </div>

                  <!-- Entre calles -->
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
                </template>

                <!-- Coordenadas (común para todos los tipos) -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Coordenadas (Latitud)</label>
                    <input :value="getCoordenadaValue('lat')" @input="e => actualizarCoordenada('lat', e.target.value)"
                      type="number" step="0.000001" class="w-full border rounded p-2" placeholder="Ej: -34.603722" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Coordenadas (Longitud)</label>
                    <input :value="getCoordenadaValue('lng')" @input="e => actualizarCoordenada('lng', e.target.value)"
                      type="number" step="0.000001" class="w-full border rounded p-2" placeholder="Ej: -58.381592" />
                  </div>
                </div>

                <!-- Mapa URL (común para todos los tipos) -->
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">URL del Mapa</label>
                  <input v-model="form.ubicacion.mapaUrl" class="w-full border rounded p-2" />
                </div>
              </div>
            </div>

          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <div class="bg-white rounded-3xl border border-gray-100 p-6">
              <!-- Precio y visibilidad -->
              <div class="text-center mb-6">
                <!-- Botón de visibilidad del precio (ahora arriba) -->
                <div class="flex justify-center mb-2">
                  <button v-if="puedeEditarEliminar" @click="toggleVisibilidadPrecio" :class="[
                    'text-xs font-medium px-2 py-1 rounded mb-2',
                    editando ? form.precio.visible ? 'bg-gray-100 text-gray-800' : 'bg-slate-200 text-slate-600'
                      : propiedad.precio.visible ? 'bg-gray-100 text-gray-800' : 'bg-slate-200 text-slate-600',
                    !editando && 'opacity-50 cursor-not-allowed'
                  ]" :disabled="!editando">
                    {{ editando ? form.precio.visible ? 'Precio Visible' : 'Precio Oculto' : propiedad.precio.visible ?
                      'Precio Visible' : 'Precio Oculto' }}
                  </button>
                </div>

                <!-- Contenedor del precio -->
                <div class="flex flex-col items-center">
                  <!-- Icono y monto del precio -->
                  <div class="flex items-center justify-center">
                    <DollarSign class="w-6 h-6 text-green-600 mr-1" />
                    <span v-if="!editando" class="text-3xl font-light text-slate-900">
                      {{ propiedad.precio?.visible ? propiedad.precio.monto?.toLocaleString() : 'Consultar' }}
                      {{ propiedad.precio?.visible ? propiedad.precio?.moneda : '' }}
                    </span>
                    <div v-else class="flex items-center space-x-2">
                      <input v-model.number="form.precio.monto" type="number"
                        class="text-3xl font-light text-slate-900 border border-gray-300 rounded p-2 w-32" />
                      <select v-model="form.precio.moneda"
                        class="text-3xl font-light text-slate-900 border border-gray-300 rounded p-2">
                        <option value="ARS">ARS</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>

                  <p class="text-slate-600 mt-1">Precio de {{ propiedad.operacion }}</p>
                </div>
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
                      Date(propiedad.fechaPublicacion).toLocaleDateString('es-AR') }}</p>
                    <input v-else v-model="form.fechaPublicacion" type="date" class="w-full border rounded p-1" />
                  </div>
                </div>

                <!-- Características adicionales según tipo -->
                <template v-if="propiedad.tipo === 'Departamento'">
                  <div class="flex items-start space-x-3">
                    <Building class="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p class="font-medium text-slate-900">Piso</p>
                      <p v-if="!editando" class="text-slate-600">
                        {{ mostrarPiso }}
                      </p>
                      <input v-else v-model.number="form.piso" type="number" class="w-full border rounded p-1" />
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <DollarSign class="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p class="font-medium text-slate-900">Expensas</p>
                      <p v-if="!editando" class="text-slate-600">{{ propiedad.expensas?.toLocaleString() || '-' }}</p>
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

    <!-- Modal de Confirmación para Eliminar Imagen -->
    <div v-if="mostrarModalConfirmacionImagen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 class="text-lg font-medium mb-4">Confirmar eliminación</h3>
        <p class="mb-6">¿Estás seguro que deseas eliminar esta imagen?</p>

        <div class="flex justify-end space-x-3">
          <button @click="mostrarModalConfirmacionImagen = false"
            class="px-4 py-2 border border-gray-300 rounded-xl text-sm">
            Cancelar
          </button>
          <button @click="confirmarEliminacionImagen"
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
import api from '../../api'
import { Home, Users, Building, Wrench, DollarSign, Calendar } from 'lucide-vue-next'
import { uploadImageToCloudinary } from '../../../utils/uploadToCloudinary'
import { jwtDecode } from 'jwt-decode';

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
  imagenes: [],
  servicios: {
    agua: false,
    luz: false,
    cloacas: false,
    gas: false
  },
  garage: false,
  jardin: false,
  piscina: false,
  balcon: false,
  terraza: false,
  parrilla: false
})
const fileInput = ref(null)
const mensajeExito = ref('')
const mensajeError = ref('')
const mostrarMensaje = ref(false)
const mostrarModalConfirmacion = ref(false)
const eliminando = ref(false)
const mostrarModalConfirmacionImagen = ref(false)
const imagenAEliminar = ref(null)

// Computed property para determinar si mostrar el mapa
const mostrarMapa = computed(() => {
  const ubicacion = propiedad.value?.ubicacion;
  if (!ubicacion) return false;

  // Para terrenos, verificar si tenemos coordenadas válidas
  if (ubicacion.coordenadas) {
    try {
      // Si es string (formato "lat,lng")
      if (typeof ubicacion.coordenadas === 'string') {
        const [lat, lng] = ubicacion.coordenadas.split(',').map(coord => parseFloat(coord.trim()));
        return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
      }
      // Si es objeto {lat, lng}
      else if (typeof ubicacion.coordenadas === 'object') {
        return ubicacion.coordenadas.lat !== 0 && ubicacion.coordenadas.lng !== 0;
      }
    } catch (e) {
      console.error("Error procesando coordenadas:", e);
      return false;
    }
  }

  // También verificar mapaUrl
  if (ubicacion.mapaUrl) {
    return true;
  }

  return false;
});

// Computed property para generar la URL del mapa
const urlMapa = computed(() => {
  const ubicacion = propiedad.value?.ubicacion;

  if (!ubicacion) return '';

  // Manejar coordenadas
  if (ubicacion.coordenadas) {
    try {
      // Si es string (formato "lat,lng")
      if (typeof ubicacion.coordenadas === 'string') {
        const [lat, lng] = ubicacion.coordenadas.split(',').map(c => c.trim());
        if (lat && lng) {
          return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
        }
      }
      // Si es objeto {lat, lng}
      else if (typeof ubicacion.coordenadas === 'object') {
        return `https://maps.google.com/maps?q=${ubicacion.coordenadas.lat},${ubicacion.coordenadas.lng}&z=15&output=embed`;
      }
    } catch (e) {
      console.error("Error procesando coordenadas:", e);
      return '';
    }
  }

  // Manejar mapaUrl
  if (ubicacion.mapaUrl) {
    try {
      // Convertir URL normal de Google Maps a embed
      if (ubicacion.mapaUrl.includes('google.com/maps/')) {
        return ubicacion.mapaUrl
          .replace('google.com/maps/', 'google.com/maps/embed/')
          .replace('?', '?pb=');
      }
      // Si ya es un embed URL
      if (ubicacion.mapaUrl.includes('embed')) {
        return ubicacion.mapaUrl;
      }
    } catch (e) {
      console.error("Error procesando mapaUrl:", e);
    }
  }

  return '';
});


// Configuración reutilizable
const serviciosConfig = {
  agua: 'Agua corriente',
  luz: 'Luz eléctrica',
  cloacas: 'Cloacas',
  gas: 'Gas natural'
}

const amenitiesConfig = {
  Casa: {
    piscina: 'Piscina',
    parrilla: 'Parrilla',
    jardin: 'Jardín',
    terraza: 'Terraza',
    garage: 'Garage',
    balcon: 'Balcón'
  },
  Departamento: {
    terraza: 'Terraza',
    garage: 'Garage',
    balcon: 'Balcón',
    tieneAscensor: 'Ascensor',
    seguridad24hs: 'Seguridad 24hs',
    piscina: 'Piscina',
    gimnasio: 'Gimnasio'
  }
}

const featureItems = computed(() => {
  if (!propiedad.value) return []

  return [
    {
      id: 'habitaciones',
      label: 'Dormitorios',
      icon: Home,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      show: ['Casa', 'Departamento', 'Local comercial'].includes(propiedad.value.tipo)
    },
    {
      id: 'baños',
      label: 'Baños',
      icon: Users,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      show: ['Casa', 'Departamento', 'Local comercial'].includes(propiedad.value.tipo)
    },
    {
      id: 'ambientes',
      label: 'Ambientes',
      icon: Building,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      show: ['Casa', 'Departamento'].includes(propiedad.value.tipo)
    },
    {
      id: 'superficieTotal',
      label: 'Sup. Total (m²)',
      icon: Wrench,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      show: true
    },
    {
      id: 'superficieCubierta',
      label: 'Sup. Cubierta (m²)',
      icon: Home,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      show: ['Casa', 'Departamento', 'Local comercial'].includes(propiedad.value.tipo)
    },
    {
      id: 'largo',
      label: 'Largo (m)',
      icon: Calendar,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      show: ['Terreno', 'Campo'].includes(propiedad.value.tipo)
    },
    {
      id: 'ancho',
      label: 'Ancho (m)',
      icon: Calendar,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      show: ['Terreno', 'Campo'].includes(propiedad.value.tipo)
    },
    {
      id: 'antiguedad',
      label: 'Antigüedad (años)',
      icon: Calendar,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      show: ['Casa', 'Departamento', 'Local comercial'].includes(propiedad.value.tipo)
    }
  ].filter(item => item.show)
})

const handleVolver = () => {
  const token = localStorage.getItem('auth-token');

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // Verificar si el token es válido y no ha expirado
      if (decoded.exp > currentTime) {
        router.push('/propiedades');
      } else {
        // Token expirado
        localStorage.removeItem('auth-token');
        router.push('/propiedades-publicas');
      }
    } catch {
      // Token inválido
      localStorage.removeItem('auth-token');
      router.push('/propiedades-publicas');
    }
  } else {
    // No hay token
    router.push('/propiedades-publicas');
  }
};

const mostrarPiso = computed(() => {
  const piso = propiedad.value?.ubicacion?.piso;

  if (piso === 0) return 'PB';
  if (piso !== null && piso !== undefined) return piso;
  return '-';
});

const puedeEditarEliminar = computed(() => {
  try {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      return false; // Si no hay token, no puede editar/eliminar
    }

    const decoded = jwtDecode(token);
    // Verificar si el rol es 'admin' Y si el token no ha expirado
    const currentTime = Date.now() / 1000; // Fecha actual en segundos UNIX
    return decoded.rol === 'admin' && decoded.exp > currentTime;

  } catch (error) {
    console.error('Error al decodificar el token o token inválido:', error);
    return false;
  }
});

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

      const { url, public_id } = await uploadImageToCloudinary(file)

      if (url && public_id) {
        form.value.imagenes.push({
          url,
          public_id,
          descripcion: '',
          orden: form.value.imagenes.length,
          esPortada: false
        })
      }
    }

    if (fileInput.value) {
      fileInput.value.value = ''
    }

    mostrarMensajeTemporal('exito', 'Imágenes subidas correctamente')
  } catch (error) {
    console.error('Error al subir imágenes:', error)
    mostrarMensajeTemporal('error', 'Error al subir imágenes: ' + error.message)
  }
}

const eliminarImagen = (index) => {
  imagenAEliminar.value = index
  mostrarModalConfirmacionImagen.value = true
}

const confirmarEliminacionImagen = async () => {
  const index = imagenAEliminar.value
  mostrarModalConfirmacionImagen.value = false

  // Animación de fade out (opcional)
  const imageElement = document.querySelector(`.image-container-${index}`);
  if (imageElement) {
    imageElement.classList.add('fade-out');
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  // Eliminar la imagen
  form.value.imagenes.splice(index, 1)

  // Ajustar la imagen seleccionada si es necesario
  if (imagenSeleccionada.value >= form.value.imagenes.length) {
    imagenSeleccionada.value = Math.max(0, form.value.imagenes.length - 1)
  }

  mostrarMensajeTemporal('exito', 'Imagen eliminada')
}

const eliminarPropiedad = async () => {
  eliminando.value = true

  try {
    const id = route.params.id
    await api.delete(`/admin/eliminar-propiedad/${id}`)

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

  // Copia profunda de la propiedad
  form.value = JSON.parse(JSON.stringify({
    ...propiedad.value,
    visible: propiedad.value.visible,
    imagenes: propiedad.value.imagenes?.map(img => ({
      url: img.url,
      public_id: img.public_id,
      descripcion: img.descripcion || '',
      orden: img.orden || 0,
      esPortada: img.esPortada || false
    })) || [],
    servicios: propiedad.value.servicios || {
      agua: false,
      luz: false,
      cloacas: false,
      gas: false
    },
    amenities: propiedad.value.amenities || {
      piscina: false,
      parrilla: false,
      jardin: false,
      terraza: false,
      garage: false,
      balcon: false,
      tieneAscensor: false,
      seguridad24hs: false,
      gimnasio: false
    }
  }))

  // Para Terrenos: asegurar que la estructura de ubicación sea correcta
  if (propiedad.value.tipo === 'Terreno') {
    // Si la propiedad original tiene ubicación plana, convertir a estructura anidada
    if (propiedad.value.localidad && !form.value.ubicacion) {
      form.value.ubicacion = {
        localidad: propiedad.value.localidad,
        coordenadas: propiedad.value.coordenadas,
        mapaUrl: propiedad.value.mapaUrl
      }
    }

    // Asegurar que siempre tengamos un objeto ubicacion
    if (!form.value.ubicacion) {
      form.value.ubicacion = {
        localidad: '',
        coordenadas: null,
        mapaUrl: ''
      }
    }
    form.value.localidad = form.value.ubicacion.localidad;
  }

  // Convertir coordenadas (0,0) a null
  if (form.value.ubicacion?.coordenadas) {
    if (typeof form.value.ubicacion.coordenadas === 'string') {
      const [lat, lng] = form.value.ubicacion.coordenadas.split(',').map(coord => parseFloat(coord.trim()));
      if (lat === 0 && lng === 0) {
        form.value.ubicacion.coordenadas = null;
      }
    } else if (form.value.ubicacion.coordenadas.lat === 0 && form.value.ubicacion.coordenadas.lng === 0) {
      form.value.ubicacion.coordenadas = null;
    }
  }

  // Para Departamentos específicamente
  if (propiedad.value.tipo === 'Departamento') {
    // Mapear habitaciones a dormitorios si es necesario
    if (form.value.habitaciones !== undefined && form.value.dormitorios === undefined) {
      form.value.dormitorios = form.value.habitaciones
    }
  }

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
    console.log('Nuevo estado de visible:', form.value.visible);
  }
}

const toggleVisibilidadPrecio = () => {
  if (editando.value) {
    form.value.precio.visible = !form.value.precio.visible
  }
}

const guardarCambios = async () => {
  try {
    const id = route.params.id;

    // 1. Validación básica
    if (!propiedad.value?.tipo) {
      throw new Error('Tipo de propiedad no definido');
    }

    // 2. Normalizar tipo
    const tipoPropiedad = normalizarTipoPropiedad(propiedad.value.tipo);
    if (!tipoPropiedad) {
      throw new Error('Tipo de propiedad no válido');
    }

    // 3. Validar imágenes
    const imagenesInvalidas = form.value.imagenes.some(img => !img.public_id);
    if (imagenesInvalidas) {
      throw new Error('Todas las imágenes deben tener un public_id válido');
    }

    // 4. Preparar datos para enviar (con corrección para piso)
    let datosAEnviar = {
      ...JSON.parse(JSON.stringify(form.value)),
      // Eliminar campo piso en raíz si existe (solo debe estar en ubicacion)
      ...(form.value.piso && { piso: undefined }),
      imagenes: form.value.imagenes.map(img => ({
        url: img.url,
        public_id: img.public_id,
        descripcion: img.descripcion || '',
        orden: img.orden || 0,
        esPortada: img.esPortada || false
      })),
      servicios: form.value.servicios,
      amenities: form.value.amenities,
      // Asegurar estructura correcta de ubicacion
      ubicacion: {
        ...form.value.ubicacion,
        // Convertir piso a número
        piso: form.value.ubicacion?.piso !== undefined
          ? parseInt(form.value.ubicacion.piso) || 0
          : undefined
      }
    };

    // 5. Transformaciones específicas por tipo
    if (tipoPropiedad === 'Departamento') {
      // Manejo especial para piso
      if (datosAEnviar.ubicacion.piso === undefined && form.value.piso !== undefined) {
        datosAEnviar.ubicacion.piso = parseInt(form.value.piso) || 0;
      }

      // Mantener compatibilidad con habitaciones/dormitorios
      if (datosAEnviar.dormitorios !== undefined) {
        datosAEnviar.habitaciones = datosAEnviar.dormitorios;
        delete datosAEnviar.dormitorios;
      }
    }

    if (tipoPropiedad === 'Terreno') {
      datosAEnviar = transformarTerreno(datosAEnviar);
    }

    // 6. Depuración: Mostrar datos que se enviarán
    console.log('Datos a enviar:', JSON.stringify({
      tipo: tipoPropiedad,
      propiedad: datosAEnviar
    }, null, 2));

    // 7. Enviar datos
    const response = await api.put(`/admin/editar-propiedad/${id}`, {
      tipo: tipoPropiedad,
      propiedad: datosAEnviar
    });

    // 8. Actualizar estado
    propiedad.value = response.data.propiedad;
    editando.value = false;
    mostrarMensajeTemporal('exito', 'Propiedad actualizada correctamente');

  } catch (error) {
    console.error('Error en guardarCambios:', {
      error: error.message,
      stack: error.stack,
      tipo: propiedad.value?.tipo,
      formData: form.value
    });
    mostrarMensajeTemporal('error', error.message || 'Error al actualizar la propiedad');
  }
};

// Funciones auxiliares
const normalizarTipoPropiedad = (tipo) => {
  if (!tipo) return null

  const tiposValidos = {
    'departamento': 'Departamento',
    'depto': 'Departamento',
    'casa': 'Casa',
    'terreno': 'Terreno',
    'campo': 'Campo',
    'galpon': 'Galpon',
    'local': 'Local',
    'fondo comercio': 'FondoComercio',
    'fondocomercio': 'FondoComercio'
  }
  return tiposValidos[tipo.toString().toLowerCase().trim()] || tipo
}

const transformarTerreno = (datos) => {
  return {
    ...datos,
    // Para terrenos, mantenemos la estructura simple de ubicacion
    ubicacion: {
      localidad: datos.localidad || datos.ubicacion?.localidad || '',
      coordenadas: typeof datos.ubicacion?.coordenadas === 'object'
        ? `${datos.ubicacion.coordenadas.lat}, ${datos.ubicacion.coordenadas.lng}`
        : datos.ubicacion?.coordenadas || '',
      mapaUrl: datos.ubicacion?.mapaUrl || ''
    },
    superficie: datos.superficieTotal || 0,
    dimensiones: {
      largo: datos.largo || 0,
      ancho: datos.ancho || 0
    }
  }
}

const getCoordenadaValue = (tipo) => {
  if (!form.value.ubicacion.coordenadas) return '';

  if (typeof form.value.ubicacion.coordenadas === 'string') {
    const parts = form.value.ubicacion.coordenadas.split(',');
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);
    return tipo === 'lat' ? (isNaN(lat) ? '' : lat) : (isNaN(lng) ? '' : lng);
  }

  // Si es objeto
  const value = form.value.ubicacion.coordenadas[tipo === 'lat' ? 'lat' : 'lng'];
  return value === 0 || value === null ? '' : value;
};

const actualizarCoordenada = (tipo, valor) => {
  let numValor = valor === '' ? null : parseFloat(valor);

  // Si el valor es 0, lo convertimos a null
  if (numValor === 0) {
    numValor = null;
  }

  if (typeof form.value.ubicacion.coordenadas === 'string') {
    const parts = form.value.ubicacion.coordenadas.split(',');
    if (tipo === 'lat') {
      form.value.ubicacion.coordenadas = `${numValor || ''},${parts[1] || ''}`;
    } else {
      form.value.ubicacion.coordenadas = `${parts[0] || ''},${numValor || ''}`;
    }
  } else {
    // Si no existe el objeto coordenadas, crearlo
    if (!form.value.ubicacion.coordenadas) {
      form.value.ubicacion.coordenadas = { lat: null, lng: null };
    }

    form.value.ubicacion.coordenadas = {
      ...form.value.ubicacion.coordenadas,
      [tipo === 'lat' ? 'lat' : 'lng']: numValor
    };

    // Si ambas coordenadas son null, poner todo el objeto como null
    if (form.value.ubicacion.coordenadas.lat === null && form.value.ubicacion.coordenadas.lng === null) {
      form.value.ubicacion.coordenadas = null;
    }
  }
};

// Carga inicial
onMounted(async () => {
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

/* Estilo para el botón de eliminar */
.delete-image-btn {
  transition: all 0.2s ease;
}

.delete-image-btn:hover {
  transform: scale(1.1);
  background-color: #ef4444;
  /* Rojo más intenso */
}

.fade-out {
  opacity: 0;
  transition: opacity 0.2s ease-out;
}
</style>
