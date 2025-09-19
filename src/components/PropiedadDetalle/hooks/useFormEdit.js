import { ref } from "vue";
import api from "../../../api";
import { TerrenoForm } from "../../NuevaPropiedad/propertyTypes/TerrenoForm";

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
    precio: {
      monto: 0,
      moneda: 'ARS',
      visible: true
    }
  });

  const activarEdicion = () => {
    editando.value = true;

    // Clonar la propiedad
    const clonedPropiedad = JSON.parse(JSON.stringify(propiedad.value));

    // Para terrenos, mapear superficie a superficieTotal
    if (clonedPropiedad.tipo === 'Terreno') {
      clonedPropiedad.superficieTotal = clonedPropiedad.superficie;
    }

    form.value = {
      ...clonedPropiedad,
      servicios: clonedPropiedad.servicios || {
        agua: false,
        luz: false,
        cloacas: false,
        gas: false,
      },
      precio: clonedPropiedad.precio || {
        monto: 0,
        moneda: 'ARS',
        visible: true
      },
      // Para terrenos, mantener la estructura plana
      ...(clonedPropiedad.tipo === 'Terreno' && {
        calle: clonedPropiedad.ubicacion?.calle || '',
        altura: clonedPropiedad.ubicacion?.altura || null,
        entreCalle1: clonedPropiedad.ubicacion?.entreCalles?.calle1 || '',
        entreCalle2: clonedPropiedad.ubicacion?.entreCalles?.calle2 || '',
        localidad: clonedPropiedad.ubicacion?.localidad || ''
      })
    };
  };

  const cancelarEdicion = () => {
    editando.value = false;
  };

  const prepararPayloadParaBackend = () => {
    if (form.value.tipo === 'Terreno') {
      return TerrenoForm.methods.preparePayload.call({ formData: form.value });
    }
    return form.value;
  };

  const guardarCambios = async () => {
    try {
      const payload = prepararPayloadParaBackend();

      const response = await api.put(`/admin/editar-propiedad/${propiedad.value._id}`, {
        tipo: propiedad.value.tipo,
        propiedad: payload,
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
