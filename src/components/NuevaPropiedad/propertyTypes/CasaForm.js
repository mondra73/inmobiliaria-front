export const CasaForm = {
  props: ['formData'],
  computed: {
    showSpecificFields() {
      return {
        habitaciones: true,
        baños: true,
        superficieTotal: true,
        superficieCubierta: true,
        antiguedad: true,
        ambientes: true,
        piscina: true,
        parrilla: true,
        jardin: true,
        terraza: true,
        garage: true,
        balcon: true
      }
    }
  },
  methods: {
    preparePayload() {
      return {
        ...this.formData,
        servicios: {
          agua: Boolean(this.formData.servicios.agua),
          luz: Boolean(this.formData.servicios.luz),
          cloacas: Boolean(this.formData.servicios.cloacas),
          gas: Boolean(this.formData.servicios.gas)
        },
        amenities: {
          piscina: Boolean(this.formData.piscina),
          parrilla: Boolean(this.formData.parrilla),
          jardin: Boolean(this.formData.jardin),
          terraza: Boolean(this.formData.terraza),
          garage: Boolean(this.formData.garage),
          balcon: Boolean(this.formData.balcon)
        }
      }
    },
    validate() {
      const errors = []
      if (!this.formData.habitaciones && this.formData.habitaciones !== 0) {
        errors.push('El número de habitaciones es requerido')
      }
      // Agregar más validaciones según necesidad
      return errors
    }
  }
}
