<template>
    <div class="bg-slate-50 min-h-screen">
        <!-- Main content -->
        <main class="p-8">
            <header class="flex justify-between items-center mb-8">
                <div>
                    <h2 class="text-3xl font-light text-slate-900">
                        Nuestras <span class="font-semibold">Propiedades</span>
                    </h2>
                    <p class="text-slate-600 mt-1">Explora nuestro catálogo de propiedades disponibles</p>
                </div>
            </header>

            <!-- Filtros -->
            <section class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="relative">
                        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input type="text" placeholder="Buscar propiedades..."
                            class="pl-10 border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200 w-full" />
                    </div>
                    <select
                        class="border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 w-full">
                        <option disabled selected>Tipo de propiedad</option>
                        <option>Casa</option>
                        <option>Departamento</option>
                        <option>Terreno</option>
                        <option>Local comercial</option>
                        <option>Campo</option>
                        <option>Fondo de comercio</option>
                    </select>
                    <select
                        class="border-2 border-gray-300 rounded-xl hover:border-gray-400 focus:border-slate-600 w-full">
                        <option disabled selected>Operación</option>
                        <option>Venta</option>
                        <option>Alquiler</option>
                        <option>Alquiler temporal</option>
                    </select>
                </div>
            </section>

            <!-- Tarjetas de propiedades -->
            <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
                <div v-for="casa in propiedadesVisibles" :key="casa.id" @click="irADetallePropiedad(casa.id)"
                    class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <div class="relative">
                        <img :src="casa.imagenes?.[0]?.url || '/placeholder.svg?height=200&width=300'"
                            :alt="casa.titulo" class="w-full h-48 object-cover" />
                        <span
                            class="absolute top-4 left-4 bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded">
                            {{ casa.operacion }}
                        </span>
                    </div>

                    <div class="p-6">
                        <h3 class="font-semibold text-slate-900 text-lg mb-1 line-clamp-2">
                            {{ casa.titulo }}
                        </h3>
                        <div class="text-slate-600 text-sm mb-1 flex items-center">
                            <Home class="w-4 h-4 mr-1" />
                            <span>{{ casa.ubicacion.calle }} {{ casa.ubicacion.altura }}, {{ casa.ubicacion.localidad
                                }}</span>
                        </div>
                        <div class="text-slate-600 text-sm mb-3 flex items-center">
                            <span>Publicado: {{ formatDate(casa.fechaPublicada) }}</span>
                        </div>
                        <div class="text-2xl font-light text-slate-900 mb-2">
                            {{ formatPrice(casa.precio) }}
                        </div>
                        <div class="text-sm text-slate-600 flex flex-wrap gap-4">
                            <span v-if="casa.caracteristicas.dormitorios">{{ casa.caracteristicas.dormitorios }}
                                dorm.</span>
                            <span v-if="casa.caracteristicas.baños">{{ casa.caracteristicas.baños }} baños</span>
                            <span v-if="casa.caracteristicas.superficieTotal">{{ casa.caracteristicas.superficieTotal
                                }}m²</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Si no hay resultados -->
            <p v-if="propiedadesVisibles.length === 0" class="text-center text-slate-500 mt-12">No hay propiedades disponibles en este momento.</p>

            <!-- Paginación -->
            <div class="flex justify-center mt-8">
                <div class="flex space-x-2">
                    <button
                        class="rounded-xl bg-transparent border border-gray-300 px-4 py-2 hover:bg-gray-100">Anterior</button>
                    <button class="bg-slate-900 text-white rounded-xl px-4 py-2">1</button>
                    <button
                        class="rounded-xl bg-transparent border border-gray-300 px-4 py-2 hover:bg-gray-100">2</button>
                    <button
                        class="rounded-xl bg-transparent border border-gray-300 px-4 py-2 hover:bg-gray-100">3</button>
                    <button
                        class="rounded-xl bg-transparent border border-gray-300 px-4 py-2 hover:bg-gray-100">Siguiente</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Home, Search } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()
const propiedades = ref([])

function irADetallePropiedad(id) {
    router.push(`/propiedad/${id}`)
}

function formatDate(fecha) {
    return new Date(fecha).toLocaleDateString('es-AR')
}

function formatPrice(precio) {
    const symbol = precio.moneda === 'USD' ? '$' : '$'
    const currency = precio.moneda === 'USD' ? 'USD' : 'ARS'
    return `${symbol}${precio.monto?.toLocaleString()} ${currency}`
}

const propiedadesVisibles = computed(() => {
  return propiedades.value || [] // Esto previene el error
})

onMounted(async () => {
  try {
    const res = await api.get('/user/propiedades-publicas')
    propiedades.value = res.data.propiedades || [] 
  } catch (err) {
    console.error('Error al cargar propiedades:', err)
    propiedades.value = [] 
  }
})

</script>

<style scoped>
/* Mantenemos los mismos estilos que el original */
</style>