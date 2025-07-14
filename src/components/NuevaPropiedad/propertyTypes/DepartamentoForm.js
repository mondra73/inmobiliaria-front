export const DepartamentoForm = {
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
        piso: true,
        expensas: true,
        tieneAscensor: true,
        seguridad24hs: true,
        gimnasio: true
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
          terraza: Boolean(this.formData.terraza),
          garage: Boolean(this.formData.garage),
          balcon: Boolean(this.formData.balcon),
          tieneAscensor: Boolean(this.formData.tieneAscensor),
          seguridad24hs: Boolean(this.formData.seguridad24hs),
          gimnasio: Boolean(this.formData.gimnasio)
        }
      }
    },
    validate() {
      const errors = []
      if (!this.formData.piso && this.formData.piso !== 0) {
        errors.push('El número de piso es requerido')
      }
      return errors
    }
  }
}
