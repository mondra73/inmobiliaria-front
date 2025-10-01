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
                class="w-full h-96 object-cover cursor-pointer"
                :style="getImageStyle(propiedad.imagenes?.[imagenSeleccionada])" @click="abrirModal" />

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

  <!-- Grid de imágenes con drag & drop -->
  <draggable
    v-model="form.imagenes"
    class="grid grid-cols-4 gap-2"
    item-key="public_id"
    @end="onDragEnd"
  >
    <template #item="{ element: imagen, index }">
      <div class="relative group">
        <div class="relative overflow-hidden rounded-lg border-2 border-gray-200">
          <img
            :src="imagen.url"
            :class="['w-full h-20 object-cover']"
            :style="getThumbnailStyle(imagen)"
          />

          <!-- Indicador de portada -->
          <div v-if="index === 0" class="absolute top-1 left-1 bg-blue-500 text-white px-1 py-0.5 text-xs rounded">
            Portada
          </div>

          <!-- Botón para ajustar encuadre -->
          <button
            @click.stop="openCropEditor(index)"
            class="absolute top-1 left-1 bg-blue-600 text-white rounded px-1 py-0.5 text-xs flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity z-10"
            :style="index === 0 ? 'top: 18px' : 'top: 1px'"
            title="Ajustar encuadre"
            type="button"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </button>

          <!-- Botón eliminar -->
          <button
            @click.stop="eliminarImagen(index)"
            class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity z-10"
            type="button"
          >
            ×
          </button>

          <!-- Número de orden -->
          <div class="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {{ index + 1 }}
          </div>
        </div>

        <input v-model="imagen.descripcion" placeholder="Descripción"
          class="text-xs w-full mt-1 p-1 border rounded" />
      </div>
    </template>
  </draggable>
</div>

              <!-- Miniaturas en modo visualización -->
              <div v-else-if="propiedad.imagenes?.length > 1" class="p-4">
                <div class="grid grid-cols-4 gap-2">
                  <div v-for="(imagen, index) in propiedad.imagenes" :key="index" class="relative cursor-pointer"
                    @click="seleccionarImagen(index)">
                    <img :src="imagen.url" :alt="imagen.descripcion"
                      :class="['w-full h-20 object-cover rounded-lg hover:opacity-80', imagenSeleccionada === index ? 'ring-2 ring-blue-500' : '']"
                      :style="getThumbnailStyle(imagen)" />
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
                    <!-- Modifica esta línea: -->
                    <p v-if="!editando" class="font-medium text-slate-900">
                      {{ item.id === 'superficieTotal' && propiedad.tipo === 'Terreno'
                        ? propiedad.superficie || '-'
                        : propiedad[item.id] || '-'
                      }}
                    </p>
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

                  <p v-if="propiedad.ubicacion?.calle" class="text-slate-700">
                    {{ propiedad.ubicacion.calle }} {{ propiedad.ubicacion.altura ? propiedad.ubicacion.altura : '' }}
                  </p>

                  <!-- Mostrar entre calles si existen -->
                  <p v-if="propiedad.ubicacion?.entreCalles?.calle1 && propiedad.ubicacion?.entreCalles?.calle2"
                    class="text-slate-500 text-sm">
                    Entre {{ propiedad.ubicacion.entreCalles.calle1 }} y {{ propiedad.ubicacion.entreCalles.calle2 }}
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
                <!-- Para terrenos en modo edición -->
                <template v-if="propiedad.tipo === 'Terreno' && editando">
                  <!-- Calle -->
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Calle</label>
                    <input v-model="form.calle" class="w-full border rounded p-2" />
                  </div>

                  <!-- Altura y Localidad en grid -->
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-slate-700 mb-1">Altura</label>
                      <input v-model.number="form.altura" type="number" class="w-full border rounded p-2" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-slate-700 mb-1">Localidad</label>
                      <input v-model="form.localidad" class="w-full border rounded p-2" />
                    </div>
                  </div>

                  <!-- Entre calles en grid -->
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-slate-700 mb-1">Entre calle 1</label>
                      <input v-model="form.entreCalle1" class="w-full border rounded p-2" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-slate-700 mb-1">Entre calle 2</label>
                      <input v-model="form.entreCalle2" class="w-full border rounded p-2" />
                    </div>
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
    <div v-if="modalAbierto" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]"
      @click.self="cerrarModal">
      <div class="relative max-w-5xl w-full px-4">
        <img :src="propiedad.imagenes?.[imagenSeleccionada]?.url"
          :alt="propiedad.imagenes?.[imagenSeleccionada]?.descripcion"
          class="w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
          :style="getImageStyle(propiedad.imagenes?.[imagenSeleccionada], true)" />
        <button @click="cerrarModal" class="absolute top-4 right-4 text-white text-3xl font-light z-[10000]">
          &times;
        </button>
        <button v-if="imagenSeleccionada > 0" @click.stop="anteriorImagen"
          class="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-4xl px-3 rounded-full z-[10000]">
          ‹
        </button>
        <button v-if="imagenSeleccionada < propiedad.imagenes.length - 1" @click.stop="siguienteImagen"
          class="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white text-4xl px-3 rounded-full z-[10000]">
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

    <!-- Modal Editor de Encuadre -->
    <ImageCropEditor v-if="showCropEditor" :imageUrl="currentEditingImage?.url || currentEditingImage?.preview"
      :initialOffsetX="currentEditingImage?.offsetX || 0.5" :initialOffsetY="currentEditingImage?.offsetY || 0.5"
      :initialZoom="currentEditingImage?.zoom || 1.0" @save="saveCropSettings" @cancel="showCropEditor = false" />

  </div>

</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../../api'
import { Home, Users, Building, Wrench, DollarSign, Calendar } from 'lucide-vue-next'
import { uploadImageToCloudinary } from '../../../utils/uploadToCloudinary'
import { jwtDecode } from 'jwt-decode';
import { useFormEdit } from './hooks/useFormEdit';
import ImageCropEditor from '../NuevaPropiedad/ImageCropEditor.vue';
import draggable from 'vuedraggable';
import { watch } from 'vue'



// Estados reactivos
const propiedad = ref(null)
const route = useRoute()
const router = useRouter()
const imagenSeleccionada = ref(0)
const modalAbierto = ref(false)

const fileInput = ref(null)
const mensajeExito = ref('')
const mensajeError = ref('')
const mostrarMensaje = ref(false)
const mostrarModalConfirmacion = ref(false)
const eliminando = ref(false)
const mostrarModalConfirmacionImagen = ref(false)
const imagenAEliminar = ref(null)
const showCropEditor = ref(false);
const currentEditingImageIndex = ref(null);
const currentEditingImage = ref(null);

const { editando, form, activarEdicion, cancelarEdicion, guardarCambios } = useFormEdit(propiedad);

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

// Computed property para generar la URL del mapa - VERSIÓN CON CONVERSIÓN
const urlMapa = computed(() => {
  const ubicacion = propiedad.value?.ubicacion;
  if (!ubicacion) return '';

  // 1. Si tenemos coordenadas, usarlas (ya funciona)
  if (ubicacion.coordenadas) {
    try {
      let lat, lng;

      if (typeof ubicacion.coordenadas === 'string') {
        [lat, lng] = ubicacion.coordenadas.split(',').map(c => c.trim());
      } else if (typeof ubicacion.coordenadas === 'object') {
        lat = ubicacion.coordenadas.lat;
        lng = ubicacion.coordenadas.lng;
      }

      if (lat && lng) {
        return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
      }
    } catch (e) {
      console.error("Error con coordenadas:", e);
    }
  }

  // 2. Si tenemos mapaUrl, convertirlo a formato embed si es necesario
  if (ubicacion.mapaUrl) {
    return convertirUrlAEmbed(ubicacion.mapaUrl);
  }

  return '';
});

// Función para convertir URLs de Google Maps a formato embed
const convertirUrlAEmbed = (url) => {
  // Si ya es una URL de embed, devolverla tal cual
  if (url.includes('output=embed') || url.includes('/embed/')) {
    return url;
  }

  // Si es un enlace abreviado de Google (maps.app.goo.gl), devolverlo tal cual (funciona)
  if (url.includes('maps.app.goo.gl') || url.includes('goo.gl/maps')) {
    return url;
  }

  // Si es una URL normal de Google Maps, intentar extraer las coordenadas
  if (url.includes('google.com/maps') || url.includes('google.com.ar/maps')) {
    try {
      // Intentar extraer coordenadas del formato /@lat,lng
      const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordMatch) {
        const lat = coordMatch[1];
        const lng = coordMatch[2];
        return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
      }

      // Intentar extraer coordenadas del formato !3dlat!4dlng
      const coordMatch2 = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
      if (coordMatch2) {
        const lat = coordMatch2[1];
        const lng = coordMatch2[2];
        return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
      }
    } catch (e) {
      console.error('Error convirtiendo URL de Google Maps:', e);
    }
  }

  // Si no se pudo convertir, devolver la URL original (aunque probablemente no funcione)
  return url;
};

// Función para obtener el estilo de la imagen con encuadre
const getImageStyle = (imagen, isModal = false) => {
  if (!imagen) return {};

  // Valores por defecto para backward compatibility
  const offsetX = imagen.offsetX !== undefined ? imagen.offsetX : 0.5;
  const offsetY = imagen.offsetY !== undefined ? imagen.offsetY : 0.5;
  const zoom = imagen.zoom !== undefined ? imagen.zoom : 1.0;

  // Para modal usamos 'contain', para galería 'cover'
  const objectFit = isModal ? 'contain' : 'cover';

  return {
    objectFit: objectFit,
    objectPosition: `${offsetX * 100}% ${offsetY * 100}%`,
    transform: `scale(${zoom})`,
    transformOrigin: `${offsetX * 100}% ${offsetY * 100}%`
  };
};

// Función cuando termina el drag en edición
const onDragEnd = () => {
  // Actualizar orden y portada automáticamente
  form.value.imagenes = form.value.imagenes.map((imagen, index) => ({
    ...imagen,
    orden: index,
    esPortada: index === 0
  }));

  mostrarMensajeTemporal('exito', 'Orden de imágenes actualizado');
};

const getThumbnailStyle = (imagen) => {
  if (!imagen) return {};

  const offsetX = imagen.offsetX !== undefined ? imagen.offsetX : 0.5;
  const offsetY = imagen.offsetY !== undefined ? imagen.offsetY : 0.5;

  return {
    objectPosition: `${offsetX * 100}% ${offsetY * 100}%`
  };
};

const openCropEditor = (index) => {
  currentEditingImageIndex.value = index;
  currentEditingImage.value = form.value.imagenes[index];
  showCropEditor.value = true;
};

// Función para guardar los ajustes de encuadre
const saveCropSettings = (cropData) => {
  if (currentEditingImageIndex.value !== null) {
    form.value.imagenes[currentEditingImageIndex.value] = {
      ...form.value.imagenes[currentEditingImageIndex.value],
      ...cropData
    };

    mostrarMensajeTemporal('exito', 'Encuadre ajustado correctamente');
  }

  showCropEditor.value = false;
  currentEditingImageIndex.value = null;
  currentEditingImage.value = null;
};

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
      show: true,
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
  const uploadedFiles = Array.from(event.target.files);
  if (!uploadedFiles.length) return;

  try {
    for (const file of uploadedFiles) {
      if (!file.type.match('image.*')) continue;

      const { url, public_id } = await uploadImageToCloudinary(file);

      if (url && public_id) {
        form.value.imagenes.push({
          url,
          public_id,
          descripcion: '',
          orden: form.value.imagenes.length,
          esPortada: form.value.imagenes.length === 0, // Solo portada si es la primera
          offsetX: 0.5,
          offsetY: 0.5,
          zoom: 1.0
        });
      }
    }

    if (fileInput.value) {
      fileInput.value.value = '';
    }

    mostrarMensajeTemporal('exito', 'Imágenes subidas correctamente');
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    mostrarMensajeTemporal('error', 'Error al subir imágenes: ' + error.message);
  }
};

const eliminarImagen = (index) => {
  imagenAEliminar.value = index;
  mostrarModalConfirmacionImagen.value = true;
};

const confirmarEliminacionImagen = async () => {
  const index = imagenAEliminar.value;
  mostrarModalConfirmacionImagen.value = false;

  form.value.imagenes.splice(index, 1);

  form.value.imagenes = form.value.imagenes.map((imagen, index) => ({
    ...imagen,
    orden: index,
    esPortada: index === 0
  }));

  if (imagenSeleccionada.value >= form.value.imagenes.length) {
    imagenSeleccionada.value = Math.max(0, form.value.imagenes.length - 1);
  }

  mostrarMensajeTemporal('exito', 'Imagen eliminada');
};

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

// Watcher para debuggear el mapa
watch([() => propiedad.value, mostrarMapa, urlMapa], ([newProp, newMostrar, newUrl], [oldProp, oldMostrar, oldUrl]) => {
  console.log('🔄 Cambios en mapa:');
  console.log('Propiedad:', newProp?._id);
  console.log('mostrarMapa:', newMostrar);
  console.log('urlMapa:', newUrl);
  console.log('---');
}, { deep: true, immediate: true });

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
