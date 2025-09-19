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

    // Usa la misma estructura que en NuevaPropiedad
    form.value = JSON.parse(JSON.stringify({
      ...propiedad.value,
      servicios: propiedad.value.servicios || {
        agua: false,
        luz: false,
        cloacas: false,
        gas: false,
      },
      precio: propiedad.value.precio || {
        monto: 0,
        moneda: 'ARS',
        visible: true
      },
      // Para terrenos, mantener la estructura plana que ya funciona
      ...(propiedad.value.tipo === 'Terreno' && {
        calle: propiedad.value.ubicacion?.calle || '',
        altura: propiedad.value.ubicacion?.altura || null,
        entreCalle1: propiedad.value.ubicacion?.entreCalles?.calle1 || '',
        entreCalle2: propiedad.value.ubicacion?.entreCalles?.calle2 || '',
        localidad: propiedad.value.ubicacion?.localidad || ''
      })
    }));
  };

    const cancelarEdicion = () => {
    editando.value = false;
  };

  const prepararPayloadParaBackend = () => {
    // USA LA LÓGICA QUE YA TIENES Y FUNCIONA EN TerrenoForm
    if (form.value.tipo === 'Terreno') {
      return TerrenoForm.methods.preparePayload.call({ formData: form.value });
    }

    // Para otros tipos, envía el form tal cual
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
