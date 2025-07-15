import { ref, watch } from 'vue'
import api from '../../../api'

export function useFormEdit(propiedad) {
  const editando = ref(false)
  const form = ref({
    tituloPublicacion: '',
    operacion: '',
    visible: true,
    precio: { monto: 0, moneda: 'ARS' },
    descripcion: '',
    imagenes: [],
    servicios: {
      agua: false,
      luz: false,
      cloacas: false,
      gas: false
    },
    amenities: {},
    ubicacion: {
      calle: '',
      altura: null,
      localidad: '',
      entreCalles: {
        calle1: '',
        calle2: ''
      },
      coordenadas: {
        lat: 0,
        lng: 0
      }
    }
  })

  watch(propiedad, (newVal) => {
    if (newVal) {
      form.value = {
        ...JSON.parse(JSON.stringify(newVal)),
        servicios: newVal.servicios || {
          agua: false,
          luz: false,
          cloacas: false,
          gas: false
        },
        amenities: newVal.amenities || {}
      }
    }
  }, { immediate: true })

  const activarEdicion = () => {
    editando.value = true
  }

  const cancelarEdicion = () => {
    editando.value = false
    // Restaurar los valores originales
    form.value = JSON.parse(JSON.stringify(propiedad.value))
  }

  const guardarCambios = async () => {
    try {
      const response = await api.put(`/admin/editar-propiedad/${propiedad.value._id}`, {
        tipo: propiedad.value.tipo,
        propiedad: form.value
      })
      propiedad.value = response.data.propiedad
      editando.value = false
      return true
    } catch (error) {
      console.error('Error al guardar cambios:', error)
      throw error
    }
  }

  return { 
    editando, 
    form, 
    activarEdicion, 
    cancelarEdicion, 
    guardarCambios 
  }
}