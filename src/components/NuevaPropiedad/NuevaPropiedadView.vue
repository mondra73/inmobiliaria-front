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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api'
import { uploadImageToCloudinary } from '../../../utils/uploadToCloudinary'

// 1. Importar todos los módulos
import { useFormSetup } from './hooks/useFormSetup'
import { useImageHandling } from './hooks/useImageHandling'
import { CasaForm } from './propertyTypes/CasaForm';
import { DepartamentoForm } from './propertyTypes/DepartamentoForm';
import { CampoForm } from './propertyTypes/CampoForm';
import { FondoComercioForm } from './propertyTypes/FondoComercioForm';
import { GalponForm } from './propertyTypes/GalponForm';
import { LocalForm } from './propertyTypes/LocalForm';
import { TerrenoForm } from './propertyTypes/TerrenoForm';


// 2. Inicializar hooks y router
const router = useRouter()
const { formData, resetForm, handlePropertyTypeChange, getEndpoint, ...computedProps } = useFormSetup()
const { files, handleFileUpload, removeFile } = useImageHandling()

// 3. Destructuring COMPLETO de computed properties
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
  showAmenitiesSection
} = computedProps

// 4. Mapeo de componentes por tipo
const propertyComponents = {
  'Casa': CasaForm,
  'Departamento': DepartamentoForm,
  'Terreno': TerrenoForm,
  'Local comercial': LocalForm,
  'Fondo de Comercio': FondoComercioForm,
  'Galpón': GalponForm,
  'Campo': CampoForm
}

// 5. Componente actual basado en la categoría seleccionada
const currentPropertyComponent = computed(() => {
  return formData.value.categoria ? propertyComponents[formData.value.categoria] : null
})

// 6. Estado del formulario (idéntico a tu versión)
const isLoading = ref(false)
const mensajeExito = ref('')
const mensajeError = ref('')
const mostrarMensaje = ref(false)

// 7. Función submitForm
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

    // Subir imágenes y preparar payload
    const uploadedImages = await Promise.all(
      files.value.map(async (file, index) => {
        const imageData = await uploadImageToCloudinary(file.file)
        return {
          url: imageData.url,
          public_id: imageData.public_id,
          descripcion: file.descripcion || '',
          orden: index,
          esPortada: index === 0
        }
      })
    )

    // Imagen por defecto
    const imagenPorDefecto = {
      url: "https://res.cloudinary.com/dzobllxwh/image/upload/v1752663945/SAVE_20250716_080534_cvicml.jpg",
      public_id: "imagen_por_defecto",
      descripcion: "Imagen por defecto",
      orden: 0,
      esPortada: true
    };

    // Si no se cargaron imágenes, usar imagen por defecto
    const imagenesFinales = uploadedImages.length > 0
      ? [...formData.value.imagenes, ...uploadedImages]
      : [imagenPorDefecto];

    const payload = {
      ...formData.value,
      localidad: formData.value.ubicacion.localidad,
      imagenes: imagenesFinales
    };

    // Ajuste ESPECÍFICO para Campo
    if (formData.value.categoria === 'Campo') {
      payload.ubicacion = {
        localidad: formData.value.ubicacion.localidad,
        coordenadas: formData.value.ubicacion.coordenadas,
        mapaUrl: formData.value.ubicacion.mapaUrl
      };
    } else {
      // Para las demás propiedades, mantener la estructura actual
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

// 8.
const goToDashboard = () => {
  router.push('/dashboard')
}

</script>

<style>
.custom-checkbox:checked+.checkmark::after {
  display: block;
}
</style>
