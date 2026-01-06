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
                <option>Galpón</option>
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

         <!-- Cliente Dueño -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-xl font-light text-slate-900 mb-6">
            Cliente <span class="font-semibold">Dueño</span>
          </h2>

          <div class="space-y-4">
            <!-- Selector de cliente existente -->
            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="cliente-dueno">
                Seleccionar Cliente Existente
              </label>
              <div class="flex gap-3">
                <select
                  id="cliente-dueno"
                  v-model="formData.clienteDueño"
                  class="flex-1 p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm appearance-none bg-white"
                >
                  <option :value="null">Sin cliente asignado</option>
                  <option
                    v-for="cliente in clientes"
                    :key="cliente._id"
                    :value="cliente._id"
                  >
                    {{ formatClienteName(cliente) }}
                  </option>
                </select>

                <!-- Botón para recargar clientes -->
                <button
                  type="button"
                  @click="cargarClientes"
                  class="px-4 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors duration-200 flex items-center"
                  :disabled="cargandoClientes"
                >
                  <svg
                    class="w-5 h-5"
                    :class="{ 'animate-spin': cargandoClientes }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </button>
              </div>
              <p class="text-sm text-slate-500 mt-2">
                Opcional: Puede asignar un cliente dueño ahora o hacerlo más tarde
              </p>
            </div>

            <!-- Información del cliente seleccionado -->
            <div v-if="clienteSeleccionado" class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 class="font-medium text-slate-700 mb-2">Cliente seleccionado:</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div><span class="font-medium">Nombre:</span> {{ clienteSeleccionado.nombre }} {{ clienteSeleccionado.apellido }}</div>
                <div><span class="font-medium">Email:</span> {{ clienteSeleccionado.mail || 'No especificado' }}</div>
                <div><span class="font-medium">Teléfono:</span> {{ clienteSeleccionado.telefono || 'No especificado' }}</div>
                <div><span class="font-medium">DNI:</span> {{ clienteSeleccionado.dni || 'No especificado' }}</div>
              </div>
            </div>

            <!-- Botón para crear nuevo cliente -->
            <div class="pt-2">
              <button
                type="button"
                @click="irANuevoCliente"
                class="text-slate-600 hover:text-slate-800 text-sm font-medium flex items-center transition-colors duration-200"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Crear nuevo cliente
              </button>
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
            <div class="mt-2">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="mapa-url">URL de Google Maps
                (opcional)</label>
              <input id="mapa-url" type="text" v-model="formData.ubicacion.mapaUrl"
                placeholder="https://maps.app.goo.gl/..."
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>
            <div v-if="formData.categoria === 'Departamento'">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="piso">Piso</label>
              <input id="piso" type="number" v-model.number="formData.ubicacion.piso" placeholder="0 (PB)" min="0"
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
              <label class="block mb-2 text-sm font-medium text-slate-700" for="habitaciones">Habitaciones</label>
              <input id="habitaciones" type="number" v-model.number="formData.habitaciones" placeholder="0" min="0"
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

            <div v-if="showFreeHeightField">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="altura-libre">Altura libre
                (metros)</label>
              <input id="altura-libre" type="number" v-model.number="formData.alturaLibre" placeholder="0" min="0"
                step="0.01"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div v-if="showRoomsField">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="ambientes">Ambientes</label>
              <input id="ambientes" type="number" v-model.number="formData.ambientes" placeholder="0" min="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div v-if="formData.categoria === 'Departamento'">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="expensas">Expensas ($)</label>
              <input id="expensas" type="number" v-model.number="formData.expensas" placeholder="0" min="0"
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
                <input type="checkbox" v-model="formData.amenities.garage"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Garage</span>
              </label>
              <label v-if="showGardenField"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.amenities.jardin"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Jardín</span>
              </label>
              <label v-if="showPoolField"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.amenities.piscina"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Piscina</span>
              </label>
              <label v-if="showBalconyField"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.amenities.balcon"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Balcón</span>
              </label>
              <label v-if="showTerraceField"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.amenities.terraza"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Terraza</span>
              </label>
              <label v-if="showGrillField"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.amenities.parrilla"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Parrilla</span>
              </label>
              <label v-if="formData.categoria === 'Departamento'"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.amenities.tieneAscensor"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Ascensor</span>
              </label>
              <label v-if="formData.categoria === 'Departamento'"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.amenities.seguridad24hs"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Seguridad 24hs</span>
              </label>
              <label v-if="formData.categoria === 'Departamento'"
                class="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                <input type="checkbox" v-model="formData.amenities.gimnasio"
                  class="mt-1 h-5 w-5 rounded border-gray-300 text-slate-600 focus:ring-slate-500">
                <span class="text-sm font-medium text-slate-700">Gimnasio</span>
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

  <!-- Grid de imágenes con drag & drop -->
  <draggable
    v-if="files.length > 0"
    v-model="files"
    class="mt-4 grid grid-cols-3 gap-4"
    item-key="id"
    @end="handleDragEnd"
  >
    <template #item="{ element: file, index }">
      <div class="relative group">
        <div class="relative overflow-hidden rounded-lg border-2 border-gray-200">
          <img
            :src="file.preview"
            class="w-full h-32 object-cover"
            :style="getFileImageStyle(file)"
          />

          <!-- Indicador de portada -->
          <div v-if="index === 0" class="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
            Portada
          </div>

          <!-- Botón para ajustar encuadre -->
          <button
            @click.prevent="openCropEditor(index)"
            class="absolute top-2 left-2 bg-blue-600 text-white rounded-lg px-2 py-1 text-xs flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity shadow-md z-10"
            :style="index === 0 ? 'top: 30px' : 'top: 2px'"
            title="Ajustar encuadre"
            type="button"
          >
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Ajustar
          </button>

          <!-- Botón eliminar -->
          <button
            @click.prevent="removeFile(index)"
            class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity z-10"
            type="button"
          >
            ×
          </button>

          <!-- Número de orden -->
          <div class="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {{ index + 1 }}
          </div>
        </div>

        <input v-model="file.descripcion" placeholder="Descripción (opcional)"
          class="text-xs w-full mt-1 p-1 border rounded" />
      </div>
    </template>
  </draggable>
</div>

        <ImageCropEditor v-if="showCropEditor" :imageUrl="currentEditingImage?.preview"
          :initialOffsetX="currentEditingImage?.offsetX || 0.5" :initialOffsetY="currentEditingImage?.offsetY || 0.5"
          :initialZoom="currentEditingImage?.zoom || 1.0" @save="saveCropSettings" @cancel="showCropEditor = false" />

        <!-- Botones de acción -->
        <div v-if="showActionButtons" class="flex justify-end space-x-4">
          <button type="button" @click="resetForm" :disabled="isLoading"
            class="px-8 py-4 border-2 border-gray-300 !text-slate-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed">
            Cancelar
          </button>
          <button type="submit" :disabled="isLoading"
            class="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
            <span v-if="!isLoading">Guardar Propiedad</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Guardando...
            </span>
          </button>
        </div>

        <!-- Mensajes de estado -->
        <div v-if="mostrarMensaje" class="mt-4">
          <div v-if="mensajeExito"
            class="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl text-sm shadow transition-opacity duration-300">
            {{ mensajeExito }}
          </div>
          <div v-else-if="mensajeError"
            class="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-xl text-sm shadow transition-opacity duration-300">
            {{ mensajeError }}
          </div>
        </div>

      </form>
    </div>

    <!-- Skeleton Loader -->
    <div v-if="isLoading" class="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div class="max-w-4xl w-full mx-auto px-6 py-8">
        <div class="animate-pulse space-y-8">
          <!-- Header Skeleton -->
          <div class="mb-8">
            <div class="flex items-center space-x-4 mb-4">
              <div class="h-8 w-8 bg-slate-200 rounded-full"></div>
              <div class="h-8 w-64 bg-slate-200 rounded"></div>
            </div>
            <div class="h-4 w-80 bg-slate-200 rounded"></div>
          </div>

          <!-- Form Skeleton -->
          <div class="space-y-6">
            <!-- Sección 1 -->
            <div class="bg-white rounded-3xl p-8 space-y-6">
              <div class="h-6 w-48 bg-slate-200 rounded"></div>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <div class="h-4 w-32 bg-slate-200 rounded"></div>
                  <div class="h-12 bg-slate-200 rounded-xl"></div>
                </div>
                <div class="space-y-2">
                  <div class="h-4 w-32 bg-slate-200 rounded"></div>
                  <div class="h-12 bg-slate-200 rounded-xl"></div>
                </div>
              </div>
            </div>

            <!-- Sección 2 -->
            <div class="bg-white rounded-3xl p-8 space-y-6">
              <div class="h-6 w-48 bg-slate-200 rounded"></div>
              <div class="grid grid-cols-2 gap-4">
                <div class="h-10 bg-slate-200 rounded-xl"></div>
                <div class="h-10 bg-slate-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api'
import { uploadImageToCloudinary } from '../../../utils/uploadToCloudinary'

import { useFormSetup } from './hooks/useFormSetup'
import { useImageHandling } from './hooks/useImageHandling'
import { CasaForm } from './propertyTypes/CasaForm';
import { DepartamentoForm } from './propertyTypes/DepartamentoForm';
import { CampoForm } from './propertyTypes/CampoForm';
import { FondoComercioForm } from './propertyTypes/FondoComercioForm';
import { GalponForm } from './propertyTypes/GalponForm';
import { LocalForm } from './propertyTypes/LocalForm';
import { TerrenoForm } from './propertyTypes/TerrenoForm';
import ImageCropEditor from './ImageCropEditor.vue'
import draggable from 'vuedraggable';

const router = useRouter()
const { formData, resetForm, handlePropertyTypeChange, getEndpoint, ...computedProps } = useFormSetup()
const { files, handleFileUpload, removeFile, handleDragEnd } = useImageHandling()

const clientes = ref([])
const cargandoClientes = ref(false)

const clienteSeleccionado = computed(() => {
  if (!formData.value.clienteDueño) return null
  return clientes.value.find(cliente => cliente._id === formData.value.clienteDueño)
})

const cargarClientes = async () => {
  try {
    cargandoClientes.value = true
    const response = await api.get('/admin/clientes?limit=100') 
    clientes.value = response.data.data
  } catch (error) {
    console.error('Error al cargar clientes:', error)
    mensajeError.value = 'Error al cargar la lista de clientes'
    mostrarMensaje.value = true
  } finally {
    cargandoClientes.value = false
  }
}

const formatClienteName = (cliente) => {
  const nombre = cliente.nombre || ''
  const apellido = cliente.apellido || ''
  const dni = cliente.dni ? ` (${cliente.dni})` : ''
  const mail = cliente.mail ? ` - ${cliente.mail}` : ''

  if (!nombre && !apellido) {
    return `Cliente sin nombre${dni}${mail}`
  }

  return `${nombre} ${apellido}${dni}${mail}`
}

const irANuevoCliente = () => {
  router.push('/nuevo-cliente')
}

const showCropEditor = ref(false)
const currentEditingImageIndex = ref(null)
const currentEditingImage = ref(null)

const openCropEditor = (index) => {
  currentEditingImageIndex.value = index;
  currentEditingImage.value = files.value[index];
  showCropEditor.value = true;

  event?.preventDefault();
  event?.stopPropagation();
}

const saveCropSettings = (cropData) => {
  if (currentEditingImageIndex.value !== null) {
    files.value[currentEditingImageIndex.value] = {
      ...files.value[currentEditingImageIndex.value],
      ...cropData
    }
  }
  showCropEditor.value = false
  currentEditingImageIndex.value = null
  currentEditingImage.value = null
}

const getFileImageStyle = (file) => {
  if (!file) return {};

  const offsetX = file.offsetX !== undefined ? file.offsetX : 0.5;
  const offsetY = file.offsetY !== undefined ? file.offsetY : 0.5;
  const zoom = file.zoom !== undefined ? file.zoom : 1.0;

  return {
    objectPosition: `${offsetX * 100}% ${offsetY * 100}%`,
    transform: `scale(${zoom})`,
    transformOrigin: `${offsetX * 100}% ${offsetY * 100}%`
  };
}

const onDragEnd = () => {
  files.value = files.value.map((file, index) => ({
    ...file,
    orden: index,
    esPortada: index === 0
  }));

  mostrarMensajeTemporal('exito', 'Orden de imágenes actualizado');
};

const {
  isCampo,
  showLocationSection,
  showFeaturesSection,
  showImagesSection,
  showActionButtons,
  showBedroomsField,
  showBathroomsField,
  showCoveredSurfaceField,
  showAgeField,
  showRoomsField,
  showBasicServicesSection,
  showGarageField,
  showGardenField,
  showPoolField,
  showBalconyField,
  showTerraceField,
  showGrillField,
  showAmenitiesSection,
  showFreeHeightField
} = computedProps

const propertyComponents = {
  'Casa': CasaForm,
  'Departamento': DepartamentoForm,
  'Terreno': TerrenoForm,
  'Local comercial': LocalForm,
  'Fondo de Comercio': FondoComercioForm,
  'Galpón': GalponForm,
  'Campo': CampoForm
}

const currentPropertyComponent = computed(() => {
  return formData.value.categoria ? propertyComponents[formData.value.categoria] : null
})

const isLoading = ref(false)
const mensajeExito = ref('')
const mensajeError = ref('')
const mostrarMensaje = ref(false)

const submitForm = async () => {
  try {
    isLoading.value = true
    mensajeExito.value = ''
    mensajeError.value = ''
    mostrarMensaje.value = false

    if (!formData.value.tituloPublicacion) throw new Error('Complete el título')
    if (!formData.value.ubicacion.localidad) throw new Error('Ingrese localidad')
    if (!formData.value.categoria) throw new Error('Seleccione tipo de propiedad')
    if (!formData.value.operacion) throw new Error('Seleccione operación')

    const uploadedImages = await Promise.all(
  files.value.map(async (file, index) => {
    const imageData = await uploadImageToCloudinary(file.file)
    return {
      url: imageData.url,
      public_id: imageData.public_id,
      descripcion: file.descripcion || '',
      orden: file.orden || index, 
      esPortada: file.esPortada || index === 0, 
      offsetX: file.offsetX !== undefined ? file.offsetX : 0.5,
      offsetY: file.offsetY !== undefined ? file.offsetY : 0.5,
      zoom: file.zoom !== undefined ? file.zoom : 1.0
    }
  })
)

    const imagenPorDefecto = {
      url: "https://res.cloudinary.com/dzobllxwh/image/upload/v1752663945/SAVE_20250716_080534_cvicml.jpg",
      public_id: "imagen_por_defecto",
      descripcion: "Imagen por defecto",
      orden: 0,
      esPortada: true
    };

    const imagenesFinales = uploadedImages.length > 0
      ? [...formData.value.imagenes, ...uploadedImages]
      : [imagenPorDefecto];

    const payload = {
      ...formData.value,
      localidad: formData.value.ubicacion.localidad,
      imagenes: imagenesFinales
    };

    if (formData.value.categoria === 'Campo') {
      payload.ubicacion = {
        localidad: formData.value.ubicacion.localidad,
        coordenadas: formData.value.ubicacion.coordenadas,
        mapaUrl: formData.value.ubicacion.mapaUrl
      };
    } else {
      payload.localidad = formData.value.ubicacion.localidad;
    }
    console.log('Payload enviado al backend:', payload)

    const endpoint = getEndpoint(formData.value.categoria)
    const response = await api.post(endpoint, payload)

    mensajeExito.value = `✅ ${formData.value.categoria} creada con éxito!`
    mostrarMensaje.value = true
    setTimeout(() => router.push(`/propiedad/${response.data.id}`), 2000)
  } catch (error) {
    console.error('Error:', error)
    mensajeError.value = `❌ ${error.response?.data?.message || error.message}`
    mostrarMensaje.value = true
  } finally {
    isLoading.value = false
  }
}

const goToDashboard = () => {
  router.push('/dashboard')
}

onMounted(() => {
  cargarClientes()
})

</script>

<style>
.custom-checkbox:checked+.checkmark::after {
  display: block;
}
</style>
