export const LocalForm = {
  props: ['formData'],
  computed: {
    showSpecificFields() {
      return {
        baños: true,
        superficieTotal: true,
        antiguedad: true,
        expensas: true,
        frente: true,
        fondo: true,
        habilitacionMunicipal: true
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
      if (!this.formData.rubro) {
        errors.push('El rubro del local es requerido')
      }
      return errors
    }
  }
}
