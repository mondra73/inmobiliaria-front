import { ref } from 'vue'
import api from '../../../api'

export function useFormEdit(propiedad) {
  const editando = ref(false)
  const form = ref({})

  const activarEdicion = () => {
    editando.value = true
    form.value = JSON.parse(JSON.stringify({
      ...propiedad.value,
      servicios: propiedad.value.servicios || {},
      amenities: propiedad.value.amenities || {}
    }))
  }

  const cancelarEdicion = () => {
    editando.value = false
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

  return { editando, form, activarEdicion, cancelarEdicion, guardarCambios }
}
