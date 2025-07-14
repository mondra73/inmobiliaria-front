<template>
  <div>
    <div v-if="propiedad" class="bg-slate-50 min-h-screen">
      <div class="max-w-6xl mx-auto px-6 py-8">
        <!-- Header - MODIFICADO EL BOTÓN VOLVER -->
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

            <!-- Características editables -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Características</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <!-- Dormitorios (solo para Casa/Departamento/Local) -->
                <div v-if="showHabitaciones" class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Home class="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Dormitorios</p>
                    <p v-if="!editando" class="font-medium text-slate-900">{{ propiedad.habitaciones || '-' }}</p>
                    <input v-else v-model.number="form.habitaciones" type="number" class="w-16 border rounded p-1" />
                  </div>
                </div>

                <!-- Baños -->
                <div v-if="showBanos" class="flex items-center space-x-2">
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
                <div v-if="showAmbientes" class="flex items-center space-x-2">
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
                <div v-if="showSuperficieCubierta" class="flex items-center space-x-2">
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

                <!-- Largo y Ancho (solo para Terreno/Campo) -->
                <div v-if="showLargoAncho" class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Calendar class="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Largo (m)</p>
                    <p v-if="!editando" class="font-medium text-slate-900">{{ propiedad.largo || '-' }}</p>
                    <input v-else v-model.number="form.largo" type="number" class="w-16 border rounded p-1" />
                  </div>
                </div>

                <div v-if="showLargoAncho" class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Calendar class="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Ancho (m)</p>
                    <p v-if="!editando" class="font-medium text-slate-900">{{ propiedad.ancho || '-' }}</p>
                    <input v-else v-model.number="form.ancho" type="number" class="w-16 border rounded p-1" />
                  </div>
                </div>

                <!-- Antigüedad -->
                <div v-if="showAntiguedad" class="flex items-center space-x-2">
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

            <!-- Servicios Básicos -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6" v-if="propiedad.servicios">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Servicios Básicos</h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
                <template v-if="!editando">
                  <!-- Modo visualización - solo mostrar los activos -->
                  <div v-if="propiedad.servicios.agua !== undefined && propiedad.servicios.agua"
                    class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                    <input type="checkbox" checked disabled class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                    <span class="text-sm font-medium text-slate-700">Agua corriente</span>
                  </div>
                  <div v-if="propiedad.servicios.luz !== undefined && propiedad.servicios.luz"
                    class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                    <input type="checkbox" checked disabled class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                    <span class="text-sm font-medium text-slate-700">Luz eléctrica</span>
                  </div>
                  <div v-if="propiedad.servicios.cloacas !== undefined && propiedad.servicios.cloacas"
                    class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                    <input type="checkbox" checked disabled class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                    <span class="text-sm font-medium text-slate-700">Cloacas</span>
                  </div>
                  <div v-if="propiedad.servicios.gas !== undefined && propiedad.servicios.gas"
                    class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                    <input type="checkbox" checked disabled class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                    <span class="text-sm font-medium text-slate-700">Gas natural</span>
                  </div>
                </template>
                <template v-else>
                  <!-- Modo edición - mostrar todos los checkboxes -->
                  <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                    <input type="checkbox" v-model="form.servicios.agua"
                      class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                    <span class="text-sm font-medium text-slate-700">Agua corriente</span>
                  </div>
                  <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                    <input type="checkbox" v-model="form.servicios.luz"
                      class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                    <span class="text-sm font-medium text-slate-700">Luz eléctrica</span>
                  </div>
                  <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                    <input type="checkbox" v-model="form.servicios.cloacas"
                      class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                    <span class="text-sm font-medium text-slate-700">Cloacas</span>
                  </div>
                  <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                    <input type="checkbox" v-model="form.servicios.gas"
                      class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                    <span class="text-sm font-medium text-slate-700">Gas natural</span>
                  </div>
                </template>
              </div>
            </div>

            <!-- Amenities -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6"
              v-if="propiedad.tipo === 'Casa' || propiedad.tipo === 'Departamento'">
              <h2 class="text-xl font-light mb-4 text-slate-900 font-semibold">Amenities</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
                <template v-if="!editando">
                  <!-- Modo visualización - solo mostrar los activos -->
                  <template v-if="propiedad.tipo === 'Casa'">
                    <div v-if="propiedad.amenities?.piscina"
                      class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" checked disabled
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Piscina</span>
                    </div>
                    <div v-if="propiedad.amenities?.parrilla"
                      class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" checked disabled
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Parrilla</span>
                    </div>
                    <div v-if="propiedad.amenities?.jardin"
                      class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" checked disabled
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Jardín</span>
                    </div>
                    <div v-if="propiedad.amenities?.terraza"
                      class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" checked disabled
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Terraza</span>
                    </div>
                    <div v-if="propiedad.amenities?.garage"
                      class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" checked disabled
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Garage</span>
                    </div>
                    <div v-if="propiedad.amenities?.balcon"
                      class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" checked disabled
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Balcón</span>
                    </div>
                  </template>

                  <template v-if="propiedad.tipo === 'Departamento'">
                    <div v-if="propiedad.amenities?.terraza"
                      class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" checked disabled
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Terraza</span>
                    </div>
                    <div v-if="propiedad.amenities?.garage"
                      class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" checked disabled
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Garage</span>
                    </div>
                    <div v-if="propiedad.amenities?.balcon"
                      class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" checked disabled
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Balcón</span>
                    </div>
                    <div v-if="propiedad.amenities?.tieneAscensor"
                      class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" checked disabled
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Ascensor</span>
                    </div>
                    <div v-if="propiedad.amenities?.seguridad24hs"
                      class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" checked disabled
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Seguridad 24hs</span>
                    </div>
                    <div v-if="propiedad.amenities?.piscina"
                      class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" checked disabled
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Piscina</span>
                    </div>
                    <div v-if="propiedad.amenities?.gimnasio"
                      class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" checked disabled
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Gimnasio</span>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <!-- Modo edición - mostrar todos los checkboxes disponibles para el tipo -->
                  <template v-if="propiedad.tipo === 'Casa'">
                    <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" v-model="form.amenities.piscina"
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Piscina</span>
                    </div>
                    <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" v-model="form.amenities.parrilla"
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Parrilla</span>
                    </div>
                    <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" v-model="form.amenities.jardin"
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Jardín</span>
                    </div>
                    <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" v-model="form.amenities.terraza"
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Terraza</span>
                    </div>
                    <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" v-model="form.amenities.garage"
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Garage</span>
                    </div>
                    <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" v-model="form.amenities.balcon"
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Balcón</span>
                    </div>
                  </template>

                  <template v-if="propiedad.tipo === 'Departamento'">
                    <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" v-model="form.amenities.terraza"
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Terraza</span>
                    </div>
                    <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" v-model="form.amenities.garage"
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Garage</span>
                    </div>
                    <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" v-model="form.amenities.balcon"
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Balcón</span>
                    </div>
                    <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" v-model="form.amenities.tieneAscensor"
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Ascensor</span>
                    </div>
                    <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" v-model="form.amenities.seguridad24hs"
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Seguridad 24hs</span>
                    </div>
                    <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" v-model="form.amenities.piscina"
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Piscina</span>
                    </div>
                    <div class="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
                      <input type="checkbox" v-model="form.amenities.gimnasio"
                        class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600">
                      <span class="text-sm font-medium text-slate-700">Gimnasio</span>
                    </div>
                  </template>
                </template>
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
                  <span class="text-3xl font-light text-slate-900">{{ propiedad.precio?.monto?.toLocaleString() }} {{
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
                      <p v-if="!editando" class="text-slate-600">
                        {{ propiedad.piso === 0 ? 'PB' : (propiedad.piso || '-') }}
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
import api from '../api'
import { Home, Users, Building, Wrench, DollarSign, Calendar } from 'lucide-vue-next'
import { uploadImageToCloudinary } from '../../utils/uploadToCloudinary'
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

// Campos según tipo de propiedad
const showBedroomsField = computed(() => ['Casa', 'Departamento'].includes(propiedad.value?.tipo))
const showBathroomsField = computed(() => ['Casa', 'Departamento', 'Local comercial'].includes(propiedad.value?.tipo))
const showCoveredSurfaceField = computed(() => ['Casa', 'Departamento', 'Local comercial'].includes(propiedad.value?.tipo))
const showAgeField = computed(() => ['Casa', 'Departamento', 'Local comercial'].includes(propiedad.value?.tipo))
const showRoomsField = computed(() => ['Casa', 'Departamento'].includes(propiedad.value?.tipo))
const showBasicServicesSection = computed(() =>
  ['Casa', 'Departamento', 'Local comercial', 'Fondo de Comercio', 'Terreno'].includes(propiedad.value?.tipo)
)

// Amenities
const showGarageField = computed(() => ['Casa', 'Departamento'].includes(propiedad.value?.tipo))
const showGardenField = computed(() => ['Casa'].includes(propiedad.value?.tipo))
const showPoolField = computed(() => ['Casa'].includes(propiedad.value?.tipo))
const showBalconyField = computed(() => ['Casa', 'Departamento'].includes(propiedad.value?.tipo))
const showTerraceField = computed(() => ['Casa', 'Departamento'].includes(propiedad.value?.tipo))
const showGrillField = computed(() => ['Casa'].includes(propiedad.value?.tipo))
const showAmenitiesSection = computed(() => {
  if (!propiedad.value) return false;

  const amenitiesDepartamento = [
    'garage', 'balcon', 'terraza', 'tieneAscensor',
    'seguridad24hs', 'gimnasio', 'salonDeUsosMultiples'
  ];

  // Verifica si es departamento y tiene al menos un amenity definido
  return propiedad.value.tipo === 'Departamento' &&
    amenitiesDepartamento.some(a => propiedad.value[a] !== undefined);
});

//caracteristicas
const showHabitaciones = computed(() => ['Casa', 'Departamento', 'Local comercial'].includes(propiedad.value?.tipo))
const showBanos = computed(() => ['Casa', 'Departamento', 'Local comercial'].includes(propiedad.value?.tipo))
const showAmbientes = computed(() => ['Casa', 'Departamento'].includes(propiedad.value?.tipo))
const showAntiguedad = computed(() => ['Casa', 'Departamento', 'Local comercial'].includes(propiedad.value?.tipo))
const showSuperficieTotal = computed(() => true) // Siempre visible
const showSuperficieCubierta = computed(() => ['Casa', 'Departamento', 'Local comercial'].includes(propiedad.value?.tipo))
const showLargoAncho = computed(() => ['Terreno', 'Campo'].includes(propiedad.value?.tipo))

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
    } catch (error) {
      // Token inválido
      localStorage.removeItem('auth-token');
      router.push('/propiedades-publicas');
    }
  } else {
    // No hay token
    router.push('/propiedades-publicas');
  }
};

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
    // Si hay un error decodificando (el token es inválido, corrupto, etc.),
    // o si falta alguna propiedad, asumimos que no está autorizado.
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

    // LIMPIAR EL INPUT AQUÍ (justo después de procesar todos los archivos)
    if (fileInput.value) {
      fileInput.value.value = '' // Esta es la línea importante
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
  // Hacer una copia profunda incluyendo las imágenes
  form.value = JSON.parse(JSON.stringify({
    ...propiedad.value,
    visible: propiedad.value.visible,
    imagenes: propiedad.value.imagenes?.map(img => ({
      ...img,
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
      // Para casas
      piscina: false,
      parrilla: false,
      jardin: false,
      terraza: false,
      garage: false,
      balcon: false,
      // Para departamentos
      tieneAscensor: false,
      seguridad24hs: false,
      gimnasio: false
    }
  }));

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

const guardarCambios = async () => {
  try {
    const id = route.params.id

    // 1. Validar que tenemos un tipo de propiedad válido
    if (!propiedad.value?.tipo) {
      throw new Error('Tipo de propiedad no definido')
    }

    // 2. Normalizar el tipo de propiedad de manera segura
    const tipoPropiedad = normalizarTipoPropiedad(propiedad.value.tipo)
    if (!tipoPropiedad) {
      throw new Error('Tipo de propiedad no válido')
    }

    // 3. Preparar datos para enviar
    let datosAEnviar = {
      ...JSON.parse(JSON.stringify(form.value)),
      imagenes: form.value.imagenes.filter(img => img?.url).map(img => ({
        url: img.url,
        descripcion: img.descripcion || '',
        orden: img.orden || 0,
        esPortada: img.esPortada || false
      })),
      servicios: form.value.servicios,
      amenities: form.value.amenities
    }

    // 4. Transformaciones específicas por tipo
    if (tipoPropiedad === 'Departamento' && datosAEnviar.dormitorios !== undefined) {
      datosAEnviar.habitaciones = datosAEnviar.dormitorios
      delete datosAEnviar.dormitorios
    }

    if (tipoPropiedad === 'Terreno') {
      datosAEnviar = transformarTerreno(datosAEnviar)
    }

    // 5. Validación mínima
    if (!datosAEnviar.imagenes?.length) {
      throw new Error('Debe agregar al menos una imagen válida')
    }

    // 6. Enviar datos
    const response = await api.put(`/admin/editar-propiedad/${id}`, {
      tipo: tipoPropiedad,
      propiedad: datosAEnviar
    })

    // 7. Actualizar estado
    propiedad.value = response.data.propiedad
    editando.value = false
    mostrarMensajeTemporal('exito', 'Propiedad actualizada correctamente')

  } catch (error) {
    console.error('Error en guardarCambios:', {
      error: error.message,
      stack: error.stack,
      tipo: propiedad.value?.tipo,
      formData: form.value
    })
    mostrarMensajeTemporal('error', error.message || 'Error al actualizar la propiedad')
  }
}

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
    calle: datos.ubicacion?.calle || '',
    altura: datos.ubicacion?.altura || null,
    entreCalle1: datos.ubicacion?.entreCalles?.calle1 || '',
    entreCalle2: datos.ubicacion?.entreCalles?.calle2 || '',
    localidad: datos.ubicacion?.localidad || '',
    coordenadas: typeof datos.ubicacion?.coordenadas === 'object'
      ? `${datos.ubicacion.coordenadas.lat}, ${datos.ubicacion.coordenadas.lng}`
      : datos.ubicacion?.coordenadas || '',
    superficie: datos.superficieTotal || 0,
    dimensiones: {
      largo: datos.largo || 0,
      ancho: datos.ancho || 0
    }
  }
}

// Función para verificar si un amenity debe mostrarse
const hasAmenity = (amenity) => {
  return propiedad.value[amenity] === true;
};

// Computed property para determinar si mostrar la sección
const shouldShowAmenities = computed(() => {
  if (!propiedad.value?.amenities) return false;

  if (propiedad.value.tipo === 'Casa') {
    return Object.values(propiedad.value.amenities).some(val => val === true);
  }

  if (propiedad.value.tipo === 'Departamento') {
    return Object.values(propiedad.value.amenities).some(val => val === true);
  }

  return false;
});

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
