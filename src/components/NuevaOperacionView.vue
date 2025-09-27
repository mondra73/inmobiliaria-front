<template>
  <div class="bg-slate-50 min-h-screen">
    <div class="max-w-4xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-4 mb-4">
          <button @click="volver" class="text-slate-600 hover:text-slate-900 transition-colors duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <h1 class="text-3xl font-light text-slate-900">
            Crear Nueva <span class="font-semibold">Operación</span>
          </h1>
        </div>
        <p class="text-slate-600">
          Registra una operación concretada (venta, alquiler o alquiler temporal)
        </p>
      </div>

      <!-- Formulario -->
      <form class="space-y-8" @submit.prevent="crearOperacion">
        <!-- Datos de la operación -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-xl font-light text-slate-900 mb-6">
            Datos de la <span class="font-semibold">Operación</span>
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="text-sm font-medium text-slate-700 block mb-2">Tipo de operación *</label>
              <select
                v-model="operacion"
                required
                class="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200"
              >
                <option value="">Seleccionar tipo de operación</option>
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
                <option value="alquiler temporal">Alquiler Temporal</option>
              </select>
            </div>

            <div class="relative">
              <label class="text-sm font-medium text-slate-700 block mb-2">Propiedad *</label>
              <input
                v-model="propiedadSearch"
                @input="showPropiedadResults = propiedadSearch.length >= 2"
                @focus="showPropiedadResults = true"
                type="text"
                required
                class="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200"
                placeholder="Buscar propiedad..."
              />
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <div
                v-if="showPropiedadResults"
                class="absolute z-20 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto"
              >
                <div
                  v-for="prop in filteredPropiedades"
                  :key="prop.id"
                  class="p-3 hover:bg-slate-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  @click="selectPropiedad(prop)"
                >
                  <p class="font-medium text-slate-900">{{ prop.titulo }}</p>
                  <p class="text-sm text-slate-600">
                    {{ prop.ubicacion?.calle }} {{ prop.ubicacion?.altura }}, {{ prop.ubicacion?.localidad }}
                    <span v-if="prop.precio?.monto" class="text-green-600 ml-2">
                      ${{ prop.precio.monto.toLocaleString() }} {{ prop.precio.moneda }}
                    </span>
                  </p>
                </div>
                <div v-if="filteredPropiedades.length === 0" class="p-3 text-slate-600 text-sm">
                  No se encontraron propiedades
                </div>
              </div>
            </div>

            <div>
              <label class="text-sm font-medium text-slate-700 block mb-2">Monto</label>
              <input
                v-model="montoDinero"
                type="number"
                step="0.01"
                class="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200"
                placeholder="0.00"
              />
            </div>

            <div>
              <label class="text-sm font-medium text-slate-700 block mb-2">Moneda</label>
              <select
                v-model="moneda"
                class="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200"
              >
                <option value="">Seleccionar moneda</option>
                <option value="ARS">Pesos Argentinos (ARS)</option>
                <option value="USD">Dólares Americanos (USD)</option>
                <option value="EUR">Euros (EUR)</option>
              </select>
            </div>

            <div>
              <label class="text-sm font-medium text-slate-700 block mb-2">Fecha de concreción</label>
              <input
                v-model="fechaConcretada"
                type="date"
                class="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200"
              />
              <p class="text-xs text-slate-500 mt-1">Si no se especifica, se usará la fecha actual</p>
            </div>

            <div class="lg:col-span-2">
              <label class="text-sm font-medium text-slate-700 block mb-2">Descripción</label>
              <textarea
                v-model="descripcion"
                rows="3"
                class="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200"
                placeholder="Detalles adicionales de la operación (opcional)..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Participantes -->
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-xl font-light text-slate-900 mb-6">
            Participantes de la <span class="font-semibold">Operación</span>
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Oferente -->
            <div class="relative">
              <label class="text-sm font-medium text-slate-700 block mb-2">Oferente (quien ofrece) *</label>
              <input
                v-model="oferenteSearch"
                @input="showOferenteResults = oferenteSearch.length >= 2"
                @focus="showOferenteResults = true"
                type="text"
                required
                class="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200"
                placeholder="Buscar cliente oferente..."
              />
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <div
                v-if="showOferenteResults"
                class="absolute z-10 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto"
              >
                <div
                  v-for="c in filteredOferentes"
                  :key="c._id"
                  class="p-3 hover:bg-slate-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  @click="selectOferente(c)"
                >
                  <p class="font-medium text-slate-900">{{ c.nombre }} {{ c.apellido }}</p>
                  <p class="text-sm text-slate-600">{{ c.mail }}</p>
                </div>
                <div v-if="filteredOferentes.length === 0" class="p-3 text-slate-600 text-sm">
                  No se encontraron clientes
                </div>
              </div>
            </div>

            <!-- Receptor -->
            <div class="relative">
              <label class="text-sm font-medium text-slate-700 block mb-2">Receptor (quien recibe) *</label>
              <input
                v-model="receptorSearch"
                @input="showReceptorResults = receptorSearch.length >= 2"
                @focus="showReceptorResults = true"
                type="text"
                required
                class="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-200 transition-all duration-200"
                placeholder="Buscar cliente receptor..."
              />
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <div
                v-if="showReceptorResults"
                class="absolute z-10 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto"
              >
                <div
                  v-for="c in filteredReceptores"
                  :key="c._id"
                  class="p-3 hover:bg-slate-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  @click="selectReceptor(c)"
                >
                  <p class="font-medium text-slate-900">{{ c.nombre }} {{ c.apellido }}</p>
                  <p class="text-sm text-slate-600">{{ c.mail }}</p>
                </div>
                <div v-if="filteredReceptores.length === 0" class="p-3 text-slate-600 text-sm">
                  No se encontraron clientes
                </div>
              </div>
            </div>
          </div>

          <!-- Info ayuda -->
          <div class="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <p class="text-sm font-medium text-blue-900">Información sobre participantes</p>
                <p class="text-sm text-blue-700 mt-1">
                  <strong>Oferente:</strong> Cliente que ofrece la propiedad<br />
                  <strong>Receptor:</strong> Cliente que recibe la propiedad
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="resetForm"
            class="px-8 py-4 border-2 border-gray-300 text-slate-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="cargando"
            class="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors duration-200 shadow-md flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="cargando" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{{ cargando ? 'Creando...' : 'Crear Operación' }}</span>
          </button>
        </div>
      </form>
    </div>

    <div class="fixed bottom-4 right-4 z-50">
  <transition name="fade">
    <div v-if="mostrarMensaje" class="max-w-xs">
      <div v-if="mensajeExito" class="mensaje-exito px-4 py-3 rounded-xl text-sm shadow-lg">
        {{ mensajeExito }}
      </div>
      <div v-else-if="mensajeError" class="mensaje-error px-4 py-3 rounded-xl text-sm shadow-lg">
        {{ mensajeError }}
      </div>
    </div>
  </transition>
</div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from '../api'

const router = useRouter();

// Campos del formulario
const operacion = ref("");
const propiedadSearch = ref("");
const propiedadId = ref("");
const montoDinero = ref(null);
const moneda = ref("");
const fechaConcretada = ref("");
const descripcion = ref("");
const cargando = ref(false);

// Estados para mensajes
const mensajeExito = ref("");
const mensajeError = ref("");
const mostrarMensaje = ref(false);

// Búsqueda de participantes
const oferenteSearch = ref("");
const receptorSearch = ref("");
const oferenteId = ref("");
const receptorId = ref("");
const showOferenteResults = ref(false);
const showReceptorResults = ref(false);
const showPropiedadResults = ref(false);

// Datos cargados desde API
const todasLasPropiedades = ref([]);
const todosLosClientes = ref([]);

// Cargar datos al montar el componente
onMounted(async () => {
  await cargarPropiedades();
  await cargarClientes();
});

// Cargar propiedades desde API
const cargarPropiedades = async () => {
  try {
    const response = await api.get('/admin/todas-propiedades');
    if (response.data.casas) {
      todasLasPropiedades.value = response.data.casas;
    }
  } catch (error) {
    console.error('Error al cargar propiedades:', error);
    mostrarMensajeTemporal('error', 'Error al cargar las propiedades');
  }
};

// Cargar clientes desde API
const cargarClientes = async () => {
  try {
    const response = await api.get('/admin/clientes?limit=1000');
    if (response.data.success) {
      todosLosClientes.value = response.data.data;
    }
  } catch (error) {
    console.error('Error al cargar clientes:', error);
    mostrarMensajeTemporal('error', 'Error al cargar los clientes');
  }
};

// Filtros computados
const filteredPropiedades = computed(() => {
  if (!propiedadSearch.value) return todasLasPropiedades.value.slice(0, 10);

  return todasLasPropiedades.value.filter(prop =>
    prop.titulo.toLowerCase().includes(propiedadSearch.value.toLowerCase()) ||
    (prop.ubicacion?.calle && prop.ubicacion.calle.toLowerCase().includes(propiedadSearch.value.toLowerCase())) ||
    (prop.ubicacion?.localidad && prop.ubicacion.localidad.toLowerCase().includes(propiedadSearch.value.toLowerCase()))
  ).slice(0, 10);
});

const filteredOferentes = computed(() => {
  if (!oferenteSearch.value) return todosLosClientes.value.slice(0, 10);

  return todosLosClientes.value.filter(cliente =>
    cliente.nombre.toLowerCase().includes(oferenteSearch.value.toLowerCase()) ||
    cliente.apellido.toLowerCase().includes(oferenteSearch.value.toLowerCase()) ||
    (cliente.mail && cliente.mail.toLowerCase().includes(oferenteSearch.value.toLowerCase()))
  ).slice(0, 10);
});

const filteredReceptores = computed(() => {
  if (!receptorSearch.value) return todosLosClientes.value.slice(0, 10);

  return todosLosClientes.value.filter(cliente =>
    cliente.nombre.toLowerCase().includes(receptorSearch.value.toLowerCase()) ||
    cliente.apellido.toLowerCase().includes(receptorSearch.value.toLowerCase()) ||
    (cliente.mail && cliente.mail.toLowerCase().includes(receptorSearch.value.toLowerCase()))
  ).slice(0, 10);
});

// Funciones de selección
function selectPropiedad(propiedad) {
  propiedadSearch.value = propiedad.titulo;
  propiedadId.value = propiedad.id;
  showPropiedadResults.value = false;
}

function selectOferente(cliente) {
  oferenteSearch.value = `${cliente.nombre} ${cliente.apellido}`;
  oferenteId.value = cliente._id;
  showOferenteResults.value = false;
}

function selectReceptor(cliente) {
  receptorSearch.value = `${cliente.nombre} ${cliente.apellido}`;
  receptorId.value = cliente._id;
  showReceptorResults.value = false;
}

// Función para mostrar mensajes temporales
function mostrarMensajeTemporal(tipo, texto, duracion = 4000) {
  if (tipo === 'exito') {
    mensajeExito.value = texto;
    mensajeError.value = '';
  } else {
    mensajeError.value = texto;
    mensajeExito.value = '';
  }

  mostrarMensaje.value = true;

  setTimeout(() => {
    mostrarMensaje.value = false;
  }, duracion);
}

// Función para volver atrás
function volver() {
  router.back();
}

// Envío del formulario - CORREGIDO
async function crearOperacion() {
  // Validación de campos obligatorios
  if (!operacion.value) {
    mostrarMensajeTemporal('error', 'Seleccione el tipo de operación');
    return;
  }

  if (!propiedadId.value) {
    mostrarMensajeTemporal('error', 'Seleccione una propiedad');
    return;
  }

  if (!oferenteId.value) {
    mostrarMensajeTemporal('error', 'Seleccione un cliente oferente');
    return;
  }

  if (!receptorId.value) {
    mostrarMensajeTemporal('error', 'Seleccione un cliente receptor');
    return;
  }

  cargando.value = true;

  try {
    const payload = {
      operacion: operacion.value,
      oferente: oferenteId.value,
      receptor: receptorId.value,
      propiedad: propiedadId.value,
      montoDinero: montoDinero.value ? parseFloat(montoDinero.value) : null,
      moneda: moneda.value,
      descripcion: descripcion.value,
      fechaConcretada: fechaConcretada.value || new Date().toISOString().split('T')[0]
    };

    console.log('Enviando payload:', payload);

    const response = await api.post("/admin/nueva-operacion", payload);

    console.log('Respuesta del servidor:', response);

    // Manejar diferentes formatos de respuesta
    if (response.data.success || response.status === 200 || response.status === 201) {
      mostrarMensajeTemporal('exito', 'Operación creada exitosamente');

      // Esperar un poco antes de redirigir para que el usuario vea el mensaje
      setTimeout(() => {
        resetForm();
        router.push('/operaciones');
      }, 1500);
    } else {
      throw new Error(response.data.message || 'Error al crear operación');
    }

  } catch (err) {
    console.error('Error completo al crear operación:', err);

    // Manejar diferentes formatos de error
    let mensajeError = 'Error al crear la operación';

    if (err.response) {
      // Error de axios con respuesta del servidor
      if (err.response.data && err.response.data.message) {
        mensajeError = err.response.data.message;
      } else if (err.response.status === 400) {
        mensajeError = 'Datos inválidos enviados al servidor';
      } else if (err.response.status === 500) {
        mensajeError = 'Error interno del servidor';
      }
    } else if (err.message) {
      // Error general
      mensajeError = err.message;
    }

    mostrarMensajeTemporal('error', mensajeError);
  } finally {
    cargando.value = false;
  }
}

function resetForm() {
  operacion.value = "";
  propiedadSearch.value = "";
  propiedadId.value = "";
  montoDinero.value = null;
  moneda.value = "";
  fechaConcretada.value = "";
  descripcion.value = "";
  oferenteSearch.value = "";
  receptorSearch.value = "";
  oferenteId.value = "";
  receptorId.value = "";
}
</script>

<style scoped>
/* Estilos para los mensajes de notificación */
.mensaje-exito {
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
}

.mensaje-error {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
