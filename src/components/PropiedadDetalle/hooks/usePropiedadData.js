import { ref, onMounted } from 'vue'
import api from '../../../api'

export function usePropiedadData(id) {
  const propiedad = ref(null)
  const loading = ref(true)
  const error = ref(null)

  const cargarPropiedad = async () => {
    try {
      loading.value = true
      const response = await api.get(`/user/propiedad/${id}`)
      propiedad.value = {
        ...response.data.propiedad,
        tipo: response.data.tipo,
        servicios: response.data.propiedad.servicios || {
          agua: false,
          luz: false,
          cloacas: false,
          gas: false
        },
        amenities: response.data.propiedad.amenities || {}
      }
    } catch (err) {
      error.value = err.message || 'Error al cargar la propiedad'
    } finally {
      loading.value = false
    }
  }

  onMounted(cargarPropiedad)

  return { 
    propiedad, 
    loading, 
    error, 
    cargarPropiedad 
  }
}