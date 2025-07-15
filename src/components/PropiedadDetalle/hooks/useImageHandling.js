import { ref, computed } from 'vue'
import { uploadImageToCloudinary } from '../../../../utils/uploadToCloudinary'

export function useImageHandling(propiedad, form, editando) {
  const imagenSeleccionada = ref(0)
  const modalAbierto = ref(false)
  const mostrarModalConfirmacionImagen = ref(false)
  const imagenAEliminar = ref(null)

  const imagenActual = computed(() => {
  const imagenes = editando?.value ? form.value.imagenes : propiedad.value?.imagenes || []
  return imagenes[imagenSeleccionada.value] || null
  })

  const seleccionarImagen = (index) => {
    imagenSeleccionada.value = index
  }

  const anteriorImagen = () => {
    if (imagenSeleccionada.value > 0) {
      imagenSeleccionada.value--
    }
  }

  const siguienteImagen = () => {
  const imagenes = editando?.value ? form.value.imagenes : propiedad.value?.imagenes || []
  if (imagenSeleccionada.value < imagenes.length - 1) {
    imagenSeleccionada.value++
  }
  }

  const abrirModal = () => {
    modalAbierto.value = true
  }

  const cerrarModal = () => {
    modalAbierto.value = false
  }

  const handleImageUpload = async (event) => {
    const files = event.target?.files || event
    if (!files || !files.length) return

    try {
      for (const file of files) {
        if (!file.type?.match('image.*')) continue
        
        const { url, public_id } = await uploadImageToCloudinary(file)
        if (url) {
          form.value.imagenes.push({
            url,
            public_id,
            descripcion: '',
            orden: form.value.imagenes.length,
            esPortada: false
          })
        }
      }
    } catch (error) {
      console.error('Error al subir imágenes:', error)
      throw error
    }
  }

  const eliminarImagen = (index) => {
    imagenAEliminar.value = index
    mostrarModalConfirmacionImagen.value = true
  }

  const confirmarEliminacionImagen = () => {
    form.value.imagenes.splice(imagenAEliminar.value, 1)
    if (imagenSeleccionada.value >= form.value.imagenes.length) {
      imagenSeleccionada.value = Math.max(0, form.value.imagenes.length - 1)
    }
    mostrarModalConfirmacionImagen.value = false
  }

  return {
    imagenSeleccionada,
    modalAbierto,
    imagenActual,
    mostrarModalConfirmacionImagen,
    seleccionarImagen,
    anteriorImagen,
    siguienteImagen,
    abrirModal,
    cerrarModal,
    handleImageUpload,
    eliminarImagen,
    confirmarEliminacionImagen
  }
}