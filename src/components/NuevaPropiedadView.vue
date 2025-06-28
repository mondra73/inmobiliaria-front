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
      <form class="space-y-8">
        <!-- Información básica -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-xl font-light text-slate-900 mb-6">
            Información
            <span class="font-semibold">Básica</span>
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="lg:col-span-2">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="titulo">Título de la propiedad</label>
              <input id="titulo" type="text" placeholder="Ej: Casa 3 dormitorios con jardín"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="tipo-propiedad">Tipo de
                propiedad</label>
              <select id="tipo-propiedad"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm appearance-none bg-white">
                <option>Seleccionar tipo</option>
                <option>Casa</option>
                <option>Departamento</option>
                <option>Local comercial</option>
                <option>Terreno</option>
                <option>Oficina</option>
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
              <input id="precio" type="number" placeholder="$"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="moneda">Moneda</label>
              <select id="moneda"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm appearance-none bg-white">
                <option>Pesos argentinos</option>
                <option>Dólares americanos</option>
              </select>
            </div>

            <div class="lg:col-span-2">
              <label class="block mb-2 text-sm font-medium text-slate-700" for="descripcion">Descripción</label>
              <textarea id="descripcion" rows="4" placeholder="Descripción detallada de la propiedad..."
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm"></textarea>
            </div>
          </div>
        </div>

        <!-- Ubicación -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-500 p-8">
          <h2 class="text-xl font-light text-slate-900 mb-6">Ubicación</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="direccion">Dirección</label>
              <input id="direccion" type="text" placeholder="Calle y número"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="barrio">Barrio/Zona</label>
              <input id="barrio" type="text" placeholder="Nombre del barrio"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="ciudad">Ciudad</label>
              <input id="ciudad" type="text" placeholder="Ciudad"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="codigo-postal">Código postal</label>
              <input id="codigo-postal" type="text" placeholder="CP"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>
          </div>
        </div>

        <!-- Características -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-xl font-light text-slate-900 mb-6">
            Características
          </h2>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="dormitorios">Dormitorios</label>
              <input id="dormitorios" type="number" placeholder="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="banos">Baños</label>
              <input id="banos" type="number" placeholder="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="superficie">Superficie (m²)</label>
              <input id="superficie" type="number" placeholder="0"
                class="w-full p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 shadow-sm" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-slate-700" for="antiguedad">Antigüedad (años)</label>
              <input id="antiguedad" type="number" placeholder="0"
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
                <input type="checkbox"
                  class="h-5 w-5 rounded bg-white border-gray-500 border shadow-sm accent-black focus:ring-2 focus:ring-slate-300 hover:ring hover:ring-slate-200 transition" />
                <span>Garage</span>
              </label>
              <label class="flex items-center space-x-3 text-slate-700 cursor-pointer">
                <input type="checkbox"
                  class="h-5 w-5 rounded bg-white border-gray-500 border shadow-sm accent-black focus:ring-2 focus:ring-slate-300 hover:ring hover:ring-slate-200 transition" />
                <span>Jardín</span>
              </label>
              <label class="flex items-center space-x-3 text-slate-700 cursor-pointer">
                <input type="checkbox"
                  class="h-5 w-5 rounded bg-white border-gray-500 border shadow-sm accent-black focus:ring-2 focus:ring-slate-300 hover:ring hover:ring-slate-200 transition" />
                <span>Piscina</span>
              </label>
              <label class="flex items-center space-x-3 text-slate-700 cursor-pointer">
                <input type="checkbox"
                  class="h-5 w-5 rounded bg-white border-gray-500 border shadow-sm accent-black focus:ring-2 focus:ring-slate-300 hover:ring hover:ring-slate-200 transition" />
                <span>Balcón</span>
              </label>
              <label class="flex items-center space-x-3 text-slate-700 cursor-pointer">
                <input type="checkbox"
                  class="h-5 w-5 rounded bg-white border-gray-500 border shadow-sm accent-black focus:ring-2 focus:ring-slate-300 hover:ring hover:ring-slate-200 transition" />
                <span>Terraza</span>
              </label>
              <label class="flex items-center space-x-3 text-slate-700 cursor-pointer">
                <input type="checkbox"
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

          <div
            class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-slate-400 transition-colors duration-200 cursor-pointer">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
              </path>
            </svg>
            <p class="text-slate-600 mb-2">
              Arrastra las imágenes aquí o
            </p>
            <button type="button"
              class="text-slate-900 font-medium hover:text-slate-700 transition-colors duration-200">
              selecciona archivos
            </button>
            <p class="text-xs text-slate-500 mt-2">
              PNG, JPG hasta 10MB cada una
            </p>
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

import { useRouter } from 'vue-router'

const router = useRouter()

const goToDashboard = () => {
  router.push('/dashboard')
}

</script>

<style>
.custom-checkbox:checked + .checkmark::after {
    display: block;
  }
</style>
