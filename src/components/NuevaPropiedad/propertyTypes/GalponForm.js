export const GalponForm = {
  props: ['formData'],
  computed: {
    showSpecificFields() {
      return {
        superficieTotal: true,
        superficieCubierta: true,
        alturaLibre: true,
        baños: true,
        condicion: true,
        categoria: true
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
        }
      }
    },
    validate() {
      const errors = []
      if (!this.formData.superficieTotal) {
        errors.push('La superficie total es requerida')
      }
      if (!this.formData.condicion) {
        errors.push('La condición del galpón es requerida')
      }
      return errors
    }
  }
}
