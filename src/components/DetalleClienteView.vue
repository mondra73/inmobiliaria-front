<template>
  <div class="bg-slate-50 min-h-screen">
    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="flex items-center space-x-4 mb-8">
        <button @click="volver" class="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl bg-white hover:bg-slate-50 transition-colors duration-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Volver</span>
        </button>
        <div class="flex-1">
          <div class="flex items-center space-x-3 mb-2">
            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Cliente Activo</span>
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Comprador</span>
            <span v-if="cliente.preferenciasBusqueda && cliente.preferenciasBusqueda.some(p => p.altaPrioridad)"
                  class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Alta Prioridad</span>
          </div>

          <!-- Título editable -->
          <h1 v-if="!editando" class="text-3xl font-light text-slate-900">
            {{ cliente.nombre }} <span class="font-semibold">{{ cliente.apellido }}</span>
          </h1>
          <div v-else class="flex space-x-2 items-center">
            <input v-model="form.nombre"
                   class="text-3xl font-light text-slate-900 border border-gray-300 rounded p-2 w-48"
                   placeholder="Nombre" />
            <input v-model="form.apellido"
                   class="text-3xl font-semibold text-slate-900 border border-gray-300 rounded p-2 w-48"
                   placeholder="Apellido" />
          </div>
        </div>
        <div class="flex space-x-2">
          <button v-if="!editando" @click="activarEdicion"
                  class="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            <span>Editar</span>
          </button>
          <button v-else @click="guardarCambios"
                  class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Guardar</span>
          </button>
          <button v-if="editando" @click="cancelarEdicion"
                  class="border border-gray-300 text-slate-700 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 transition-colors duration-200">
            Cancelar
          </button>
          <button @click="enviarEmail"
                  class="border border-gray-300 text-slate-700 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 transition-colors duration-200 flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span>Enviar Email</span>
          </button>
        </div>
      </div>

      <!-- Estado de carga -->
      <div v-if="cargando" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900"></div>
      </div>

      <!-- Mensaje de error -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
        {{ error }}
      </div>

      <!-- Contenido principal cuando hay datos -->
      <div v-if="!cargando && cliente" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Columna principal -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Información Personal -->
          <div class="bg-white rounded-3xl shadow-sm border border-gray-100">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-xl font-light text-slate-900">
                <span class="font-semibold">Información Personal</span>
              </h2>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Nombre Completo</p>
                    <div v-if="!editando" class="font-medium text-slate-900">{{ cliente.nombre }} {{ cliente.apellido }}</div>
                    <div v-else class="flex space-x-2">
                      <input v-model="form.nombre" class="border rounded p-1 w-32" placeholder="Nombre" />
                      <input v-model="form.apellido" class="border rounded p-1 w-32" placeholder="Apellido" />
                    </div>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">DNI</p>
                    <div v-if="!editando" class="font-medium text-slate-900">{{ cliente.dni || 'No especificado' }}</div>
                    <input v-else v-model="form.dni" class="border rounded p-1 w-full" placeholder="DNI" />
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Fecha de Creación</p>
                    <p class="font-medium text-slate-900">{{ formatDate(cliente.fechaCreacion) }}</p>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H8a2 2 0 00-2-2V6m8 0H8m0 0v.01M8 6v6h8V6M8 12v.01"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Profesión</p>
                    <div v-if="!editando" class="font-medium text-slate-900">{{ cliente.profesion || 'No especificada' }}</div>
                    <input v-else v-model="form.profesion" class="border rounded p-1 w-full" placeholder="Profesión" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Información de Contacto -->
          <div class="bg-white rounded-3xl shadow-sm border border-gray-100">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-xl font-light text-slate-900">
                <span class="font-semibold">Contacto</span>
              </h2>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Teléfono</p>
                    <div v-if="!editando" class="font-medium text-slate-900">{{ cliente.telefono || 'No especificado' }}</div>
                    <input v-else v-model="form.telefono" class="border rounded p-1 w-full" placeholder="Teléfono" />
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Email</p>
                    <div v-if="!editando" class="font-medium text-slate-900">{{ cliente.mail || 'No especificado' }}</div>
                    <input v-else v-model="form.mail" type="email" class="border rounded p-1 w-full" placeholder="Email" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Preferencias de Búsqueda -->
          <div class="bg-white rounded-3xl shadow-sm border border-gray-100">
    <div class="p-6 border-b border-gray-100 flex justify-between items-center">
      <h2 class="text-xl font-light text-slate-900">
        <span class="font-semibold">Preferencias de Búsqueda</span>
      </h2>
      <button v-if="editando" @click="agregarPreferencia"
              class="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
        + Agregar Preferencia
      </button>
    </div>
    <div class="p-6">
      <div v-if="!cliente.preferenciasBusqueda || cliente.preferenciasBusqueda.length === 0"
           class="text-center text-slate-500 py-4">
        No hay preferencias de búsqueda configuradas
      </div>

      <div v-else v-for="(preferencia, index) in form.preferenciasBusqueda" :key="index"
           class="mb-6 last:mb-0 border-b border-gray-100 pb-6 last:border-b-0">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-slate-600">Tipo de Propiedad</p>
              <div v-if="!editando" class="font-medium text-slate-900">{{ preferencia.tipoPropiedad || 'No especificado' }}</div>
              <select v-else v-model="preferencia.tipoPropiedad" class="border rounded p-1 w-full" required>
                <option value="">Seleccionar tipo</option>
                <option value="Casa">Casa</option>
                <option value="Dpto">Departamento</option>
                <option value="Terreno">Terreno</option>
                <option value="Campo">Campo</option>
                <option value="Galpon">Galpón</option>
                <option value="Local">Local</option>
                <option value="FondoComercio">Fondo de Comercio</option>
              </select>
              <span v-if="editando && !preferencia.tipoPropiedad" class="text-red-500 text-xs">Campo requerido</span>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-slate-600">Tipo de Operación</p>
              <div v-if="!editando" class="font-medium text-slate-900">{{ preferencia.tipoOperacion || 'No especificado' }}</div>
              <select v-else v-model="preferencia.tipoOperacion" class="border rounded p-1 w-full" required>
                <option value="">Seleccionar operación</option>
                <option value="Alquiler">Alquiler</option>
                <option value="Compra">Compra</option>
              </select>
              <span v-if="editando && !preferencia.tipoOperacion" class="text-red-500 text-xs">Campo requerido</span>
            </div>
          </div>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-slate-600">Estado</p>
                      <div class="flex items-center space-x-2">
                        <span :class="[
                          'px-2 py-1 rounded-full text-xs',
                          preferencia.activa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        ]">
                          {{ preferencia.activa ? 'Activa' : 'Inactiva' }}
                        </span>
                        <button v-if="editando" @click="preferencia.activa = !preferencia.activa"
                                class="text-xs text-blue-600 hover:text-blue-800">
                          {{ preferencia.activa ? 'Desactivar' : 'Activar' }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center space-x-2 md:col-span-2">
                    <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm text-slate-600">Descripción</p>
                      <div v-if="!editando" class="font-medium text-slate-900">{{ preferencia.descripcion || 'Sin descripción' }}</div>
                      <textarea v-else v-model="preferencia.descripcion"
                                class="border rounded p-1 w-full" placeholder="Descripción de la preferencia"
                                rows="2"></textarea>
                    </div>
                  </div>
                </div>

                <div v-if="editando" class="flex justify-end space-x-2">
          <button @click="eliminarPreferencia(index)"
                  class="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200">
            Eliminar Preferencia
          </button>
        </div>
      </div>
    </div>
  </div>

          <!-- Ofertas como Vendedor -->
          <div class="bg-white rounded-3xl shadow-sm border border-gray-100">
    <div class="p-6 border-b border-gray-100 flex justify-between items-center">
      <h2 class="text-xl font-light text-slate-900">
        <span class="font-semibold">Propiedades en Venta/Alquiler</span>
      </h2>
      <button v-if="editando" @click="agregarOferta"
              class="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
        + Agregar Propiedad
      </button>
    </div>
    <div class="p-6">
      <div v-if="!cliente.oferente || cliente.oferente.length === 0"
           class="text-center text-slate-500 py-4">
        No hay propiedades registradas como oferente
      </div>

      <div v-else v-for="(oferta, index) in form.oferente" :key="index"
           class="mb-4 p-4 bg-slate-50 rounded-lg last:mb-0">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div>
              <p class="text-sm text-slate-600 mb-1">Propiedad</p>
              <div v-if="!editando" class="font-medium text-slate-900">{{ oferta.propiedad }}</div>
              <input v-else v-model="oferta.propiedad"
                     class="border rounded p-1 w-full mb-2" placeholder="Nombre de la propiedad"
                     required />
              <span v-if="editando && !oferta.propiedad" class="text-red-500 text-xs">Campo requerido</span>
            </div>

            <div>
              <p class="text-sm text-slate-600 mb-1">Descripción</p>
              <div v-if="!editando && oferta.descripcion" class="text-sm text-slate-600">{{ oferta.descripcion }}</div>
              <textarea v-else v-model="oferta.descripcion"
                        class="border rounded p-1 w-full" placeholder="Descripción de la propiedad"
                        rows="2"></textarea>
            </div>

            <div class="flex items-center space-x-2 mt-2">
              <span :class="[
                'px-2 py-1 rounded-full text-xs',
                oferta.activa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              ]">
                {{ oferta.activa ? 'Activa' : 'Inactiva' }}
              </span>
              <button v-if="editando" @click="oferta.activa = !oferta.activa"
                      class="text-xs text-blue-600 hover:text-blue-800">
                {{ oferta.activa ? 'Desactivar' : 'Activar' }}
              </button>
            </div>
          </div>

          <button v-if="editando" @click="eliminarOferta(index)"
                  class="bg-red-100 text-red-700 px-2 py-1 rounded text-sm hover:bg-red-200 ml-2">
            ×
          </button>
        </div>
      </div>
    </div>
    </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Estado del Cliente -->
          <div class="bg-white rounded-3xl shadow-sm border border-gray-100">
            <div class="p-6">
              <div class="text-center mb-6">
                <div class="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-slate-900">{{ cliente.nombre }} {{ cliente.apellido }}</h3>
                <p class="text-slate-600">Cliente desde {{ formatMonthYear(cliente.fechaCreacion) }}</p>
              </div>

              <div class="border-t border-gray-200 my-4"></div>

              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <div>
                    <p class="font-medium text-slate-900">Nivel de Interés</p>
                    <p class="text-sm text-slate-600">
                      {{ cliente.preferenciasBusqueda && cliente.preferenciasBusqueda.length > 0 ? 'Alto - Búsqueda activa' : 'Sin preferencias' }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <p class="font-medium text-slate-900">Última Actualización</p>
                    <p class="text-sm text-slate-600">{{ formatDate(cliente.fechaCreacion) }}</p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <div>
                    <p class="font-medium text-slate-900">Preferencias Activas</p>
                    <p class="text-sm text-slate-600">
                      {{ cliente.preferenciasBusqueda ? cliente.preferenciasBusqueda.filter(p => p.activa).length : 0 }} activas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Acciones Rápidas -->
          <div class="bg-white rounded-3xl shadow-sm border border-gray-100">
            <div class="p-6 border-b border-gray-100">
              <h3 class="text-lg font-light text-slate-900">
                <span class="font-semibold">Acciones</span>
              </h3>
            </div>
            <div class="p-6 space-y-3">
              <button @click="llamarCliente"
                      class="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>Llamar Cliente</span>
              </button>
              <button @click="enviarEmail"
                      class="w-full border border-gray-300 text-slate-700 py-3 px-4 rounded-xl bg-transparent hover:bg-slate-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>Enviar Email</span>
              </button>
              <button @click="programarVisita"
                      class="w-full border border-gray-300 text-slate-700 py-3 px-4 rounded-xl bg-transparent hover:bg-slate-50 transition-colors duration-200">
                Programar Visita
              </button>
              <button @click="enviarPropiedades"
                      class="w-full border border-gray-300 text-slate-700 py-3 px-4 rounded-xl bg-transparent hover:bg-slate-50 transition-colors duration-200">
                Enviar Propiedades
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensajes de estado -->
    <div class="fixed bottom-4 right-4 z-50">
      <transition name="fade">
        <div v-if="mostrarMensaje" class="max-w-xs">
          <div v-if="mensajeExito"
            class="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl text-sm shadow-lg">
            {{ mensajeExito }}
          </div>
          <div v-else-if="mensajeError"
            class="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-xl text-sm shadow-lg">
            {{ mensajeError }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'

const route = useRoute()
const router = useRouter()

const cliente = ref({})
const cargando = ref(true)
const error = ref(null)
const editando = ref(false)

// Estados para mensajes
const mensajeExito = ref('')
const mensajeError = ref('')
const mostrarMensaje = ref(false)

// Formulario reactivo
const form = reactive({
  nombre: '',
  apellido: '',
  dni: '',
  profesion: '',
  telefono: '',
  mail: '',
  preferenciasBusqueda: [],
  oferente: []
})

// Obtener datos del cliente al montar el componente
onMounted(async () => {
  await obtenerCliente()
})

const obtenerCliente = async () => {
  cargando.value = true
  error.value = null

  try {
    const response = await api.get(`/admin/cliente/${route.params.id}`)

    if (response.data.success) {
      cliente.value = response.data.data
      // Inicializar el formulario con los datos actuales
      Object.assign(form, {
        nombre: cliente.value.nombre || '',
        apellido: cliente.value.apellido || '',
        dni: cliente.value.dni || '',
        profesion: cliente.value.profesion || '',
        telefono: cliente.value.telefono || '',
        mail: cliente.value.mail || '',
        preferenciasBusqueda: cliente.value.preferenciasBusqueda ?
          [...cliente.value.preferenciasBusqueda] : [],
        oferente: cliente.value.oferente ? [...cliente.value.oferente] : []
      })
    }
  } catch (err) {
    console.error('Error al obtener cliente:', err)
    error.value = err.response?.data?.message || 'Error al cargar los datos del cliente'
  } finally {
    cargando.value = false
  }
}

// Funciones de edición
const activarEdicion = () => {
  editando.value = true
}

// const validarFormulario = () => {
//   // Validar preferencias de búsqueda
//   for (let i = 0; i < form.preferenciasBusqueda.length; i++) {
//     const pref = form.preferenciasBusqueda[i]
//     if (!pref.tipoPropiedad || !pref.tipoOperacion) {
//       mostrarMensajeTemporal('error', `La preferencia ${i + 1} debe tener tipo de propiedad y operación seleccionados`)
//       return false
//     }
//   }

//   // Validar ofertas
//   for (let i = 0; i < form.oferente.length; i++) {
//     const oferta = form.oferente[i]
//     if (!oferta.propiedad || oferta.propiedad.trim() === '') {
//       mostrarMensajeTemporal('error', `La propiedad ${i + 1} debe tener un nombre`)
//       return false
//     }
//   }

//   return true
// }

const limpiarDatosParaEnvio = () => {
  const datosLimpios = { ...form }

  // Filtrar preferencias vacías o incompletas
  datosLimpios.preferenciasBusqueda = datosLimpios.preferenciasBusqueda
    .filter(pref => pref.tipoPropiedad && pref.tipoOperacion)
    .map(pref => ({
      tipoPropiedad: pref.tipoPropiedad,
      tipoOperacion: pref.tipoOperacion,
      presupuesto: pref.presupuesto || null,
      descripcion: pref.descripcion || '',
      activa: pref.activa !== undefined ? pref.activa : true,
      financiacion: pref.financiacion !== undefined ? pref.financiacion : true,
      fechaCreacionPreferencia: pref.fechaCreacionPreferencia || new Date()
    }))

  // Filtrar ofertas vacías
  datosLimpios.oferente = datosLimpios.oferente
    .filter(oferta => oferta.propiedad && oferta.propiedad.trim() !== '')
    .map(oferta => ({
      propiedad: oferta.propiedad.trim(),
      descripcion: oferta.descripcion || '',
      activa: oferta.activa !== undefined ? oferta.activa : true
    }))

  return datosLimpios
}

const cancelarEdicion = () => {
  // Restaurar los datos originales
  Object.assign(form, {
    nombre: cliente.value.nombre || '',
    apellido: cliente.value.apellido || '',
    dni: cliente.value.dni || '',
    profesion: cliente.value.profesion || '',
    telefono: cliente.value.telefono || '',
    mail: cliente.value.mail || '',
    preferenciasBusqueda: cliente.value.preferenciasBusqueda ?
      [...cliente.value.preferenciasBusqueda] : [],
    oferente: cliente.value.oferente ? [...cliente.value.oferente] : []
  })
  editando.value = false
}

const guardarCambios = async () => {
  // Validar antes de enviar
  // if (!validarFormulario()) {
  //   return
  // }

  try {
    // Limpiar datos antes de enviar
    const datosLimpios = limpiarDatosParaEnvio()

    const response = await api.put(`/admin/editar-cliente/${route.params.id}`, datosLimpios)

    if (response.data.success) {
      cliente.value = response.data.data
      mostrarMensajeTemporal('exito', 'Cambios guardados correctamente')
      editando.value = false
    }
  } catch (err) {
    console.error('Error al guardar cambios:', err)
    if (err.response?.data?.errors) {
      // Mostrar errores de validación del backend
      const errores = err.response.data.errors.join(', ')
      mostrarMensajeTemporal('error', `Errores de validación: ${errores}`)
    } else {
      mostrarMensajeTemporal('error', err.response?.data?.message || 'Error al guardar los cambios')
    }
  }
}

// Funciones para manejar preferencias
const agregarPreferencia = () => {
  form.preferenciasBusqueda.push({
    tipoPropiedad: '',
    tipoOperacion: '',
    presupuesto: null,
    descripcion: '',
    activa: true,
    financiacion: true,
    fechaCreacionPreferencia: new Date()
  })
}

const eliminarPreferencia = (index) => {
  form.preferenciasBusqueda.splice(index, 1)
}

// Funciones para manejar ofertas
const agregarOferta = () => {
  form.oferente.push({
    propiedad: '',
    descripcion: '',
    activa: true
  })
}

const eliminarOferta = (index) => {
  form.oferente.splice(index, 1)
}

// Funciones de navegación
const volver = () => {
  router.back()
}

// Funciones de acciones
const llamarCliente = () => {
  if (cliente.value.telefono) {
    window.open(`tel:${cliente.value.telefono}`, '_blank')
  }
}

const enviarEmail = () => {
  if (cliente.value.mail) {
    window.open(`mailto:${cliente.value.mail}`, '_blank')
  }
}

const programarVisita = () => {
  console.log('Programar visita para:', cliente.value.nombre)
}

const enviarPropiedades = () => {
  console.log('Enviar propiedades a:', cliente.value.mail)
}

// Funciones de utilidad
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

const formatDate = (fecha) => {
  if (!fecha) return 'No especificada'
  return new Date(fecha).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatMonthYear = (fecha) => {
  if (!fecha) return 'fecha desconocida'
  return new Date(fecha).toLocaleDateString('es-AR', {
    month: 'long',
    year: 'numeric'
  })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
