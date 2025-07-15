<template>
  <div>
    <div v-if="propiedad" class="bg-slate-50 min-h-screen">
      <div class="max-w-6xl mx-auto px-6 py-8">
        <!-- Header -->
        <PropertyHeader :propiedad="propiedad" :editando="editando" @edit="activarEdicion" @save="guardarCambios"
          @cancel="cancelarEdicion" @delete="confirmarEliminacion" />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Columna principal -->
          <div class="lg:col-span-2 space-y-8">
            <ImageGallery :imagenes="editando ? form.imagenes : propiedad.imagenes" :editando="editando"
              :imagenSeleccionada="imagenSeleccionada" :imagenActual="imagenActual" @image-upload="handleImageUpload"
              @image-remove="eliminarImagen" @select-image="seleccionarImagen" @prev-image="anteriorImagen"
              @next-image="siguienteImagen" @open-modal="abrirModal" />


            <PropertyFeatures :propiedad="propiedad" :editando="editando" :form="form" />

            <ServicesSection v-if="showServices" :servicios="editando ? form.servicios : propiedad.servicios"
              :editando="editando" />

            <AmenitiesSection v-if="showAmenities" :amenities="editando ? form.amenities : propiedad.amenities"
              :tipo="propiedad.tipo" :editando="editando" />

            <PropertyDescription :descripcion="editando ? form.descripcion : propiedad.descripcion"
              :editando="editando" />

            <PropertyLocation :ubicacion="editando ? form.ubicacion : propiedad.ubicacion" :tipo="propiedad.tipo"
              :editando="editando" />
          </div>

          <!-- Sidebar -->
          <PropertySidebar :propiedad="propiedad" :editando="editando" :form="form" />
        </div>
      </div>
    </div>

    <!-- Modales y mensajes -->
    <ImageModal v-if="modalAbierto" :imagen="imagenActual" @close="cerrarModal" @prev="anteriorImagen"
      @next="siguienteImagen" />

    <ConfirmationModal v-if="mostrarModalConfirmacion" @confirm="eliminarPropiedad"
      @cancel="mostrarModalConfirmacion = false" />

    <ToastMessage :message="mensajeExito || mensajeError" :type="mensajeExito ? 'success' : 'error'"
      :visible="mostrarMensaje" />
  </div>
</template>

<script setup>
// Importaciones de Vue
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Hooks locales
import { usePropiedadData } from './hooks/usePropiedadData'
import { useFormEdit } from './hooks/useFormEdit'
import { useServicesAmenities } from './hooks/useServicesAmenities'
import { useImageHandling } from './hooks/useImageHandling'

// Componentes
import PropertyHeader from './components/PropertyHeader.vue'
import ImageGallery from './components/ImageGallery.vue'
import PropertyFeatures from './components/PropertyFeatures.vue'
import ServicesSection from './components/ServicesSection.vue'
import AmenitiesSection from './components/AmenitiesSection.vue'
import PropertyDescription from './components/PropertyDescription.vue'
import PropertyLocation from './components/PropertyLocation.vue'
import PropertySidebar from './components/PropertySidebar.vue'
import ImageModal from './components/ImageModal.vue'
import ConfirmationModal from './components/ConfirmationModal.vue'
import ToastMessage from './components/ToastMessage.vue'

// Inicialización
const route = useRoute()
const confirmarEliminacion = ref(false)
const imagenActual = ref(null)

// 1. Primero obtener la referencia reactiva de la propiedad
const { propiedad, cargarPropiedad } = usePropiedadData(route.params.id)

// 2. Luego inicializar form y editando
const { editando, form, activarEdicion, cancelarEdicion, guardarCambios } = useFormEdit(propiedad)

// 3. Inicializar servicios/amenities
const { showServices, showAmenities } = useServicesAmenities(propiedad)

// 4. Inicializar manejo de imágenes (pasar las refs completas)
const imageHandling = useImageHandling(
  propiedad,  // pasa la ref completa, no propiedad.value
  form,       // pasa la ref completa
  editando    // pasa la ref completa si el hook lo necesita
)

// Desestructuración después de asegurar que todo está inicializado
const {
  imagenSeleccionada,
  modalAbierto,
  handleImageUpload,
  eliminarImagen,
  anteriorImagen,
  siguienteImagen,
  abrirModal,
  cerrarModal
} = imageHandling

// Estados para mensajes y modales
const mensajeExito = ref('')
const mensajeError = ref('')
const mostrarMensaje = ref(false)
const mostrarModalConfirmacion = ref(false)
const eliminando = ref(false)

const seleccionarImagen = (index) => {
  imagenSeleccionada.value = index
  imagenActual.value = (editando.value ? form.imagenes : propiedad.value.imagenes)[index]
}


// Carga inicial
onMounted(() => {
  cargarPropiedad()
})
</script>