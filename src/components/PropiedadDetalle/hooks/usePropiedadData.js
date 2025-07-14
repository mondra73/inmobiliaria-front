import { ref, onMounted } from 'vue'
import api from '../../../api'

export function usePropiedadData(id) {
  const propiedad = ref(null)

  const cargarPropiedad = async () => {
    try {
      const response = await api.get(`/user/propiedad/${id}`)
      propiedad.value = {
        ...response.data.propiedad,
        tipo: response.data.tipo
      }
    } catch (error) {
      console.error('Error al cargar propiedad', error)
    }
  }

  onMounted(cargarPropiedad)

  return { propiedad, cargarPropiedad }
}
