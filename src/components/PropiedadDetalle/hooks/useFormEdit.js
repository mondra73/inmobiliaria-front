import { ref } from "vue";
import api from "../../../api";

export function useFormEdit(propiedad) {
  const editando = ref(false);
  const form = ref({
    servicios: {
      agua: false,
      luz: false,
      cloacas: false,
      gas: false,
    },
    amenities: {},
    imagenes: [],
    precio: {  // Inicialización básica
      monto: 0,
      moneda: 'ARS',
      visible: true
    }
  });

  const activarEdicion = () => {
    editando.value = true;
    form.value = {
      ...JSON.parse(JSON.stringify(propiedad.value)),
      servicios: propiedad.value.servicios || {
        agua: false,
        luz: false,
        cloacas: false,
        gas: false,
      },
      precio: {  // Inicialización completa del precio
        monto: propiedad.value.precio?.monto || 0,
        moneda: propiedad.value.precio?.moneda || 'ARS',
        visible: propiedad.value.precio?.visible ?? true  // Usamos ?? para que tome true si es null/undefined
      },
      ubicacion: {
        ...propiedad.value.ubicacion,
        coordenadas: propiedad.value.ubicacion?.coordenadas || null,
        mapaUrl: propiedad.value.ubicacion?.mapaUrl || "",
        piso: propiedad.value.ubicacion?.piso || null,
      },
      // Campos específicos por tipo
      hectareas: propiedad.value.hectareas || null,
      alturaLibre: propiedad.value.alturaLibre || null,
      antiguedadComercio: propiedad.value.antiguedadComercio || null,
      nombreComercio: propiedad.value.nombreComercio || "",

      amenities: propiedad.value.amenities || {},
      imagenes:
        propiedad.value.imagenes?.map((img) => ({
          url: img.url,
          public_id: img.public_id,
          descripcion: img.descripcion || "",
          orden: img.orden || 0,
          esPortada: img.esPortada || false,
        })) || [],
    };
  };

  const cancelarEdicion = () => {
    editando.value = false;
  };

  const guardarCambios = async () => {
    try {
      const response = await api.put(`/admin/editar-propiedad/${propiedad.value._id}`, {
        tipo: propiedad.value.tipo,
        propiedad: form.value,
      });
      propiedad.value = response.data.propiedad;
      editando.value = false;
      return true;
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      throw error;
    }
  };

  return { editando, form, activarEdicion, cancelarEdicion, guardarCambios };
}
