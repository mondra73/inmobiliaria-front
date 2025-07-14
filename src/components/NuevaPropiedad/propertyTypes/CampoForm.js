export const CampoForm = {
  props: ['formData'],
  computed: {
    showSpecificFields() {
      return {
        hectareas: true,
        condicion: true,
        descripcion: true,
        coordenadas: true
      }
    }
  },
  methods: {
    preparePayload() {
      return {
        ...this.formData,
        superficieTotal: this.formData.hectareas * 10000, // Convertir hectáreas a m²
        servicios: {
          agua: Boolean(this.formData.servicios.agua),
          luz: Boolean(this.formData.servicios.luz),
          cloacas: Boolean(this.formData.servicios.cloacas),
          gas: Boolean(this.formData.servicios.gas)
        },
        // Campos específicos para campos
        condicion: this.formData.condicion || null,
        categoria: 'Campo' // Fuerza la categoría por si acaso
      }
    },
    validate() {
      const errors = []
      if (!this.formData.hectareas || this.formData.hectareas <= 0) {
        errors.push('Las hectáreas deben ser un número positivo')
      }
      if (!this.formData.condicion) {
        errors.push('La condición del campo es requerida')
      }
      if (!this.formData.ubicacion?.localidad) {
        errors.push('La localidad es requerida')
      }
      return errors
    }
  }
}
