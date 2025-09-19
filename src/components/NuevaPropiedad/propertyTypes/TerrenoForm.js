export const TerrenoForm = {
  props: ['formData'],
  computed: {
    showSpecificFields() {
      return {
        largo: true,
        ancho: true,
        superficieTotal: true
      }
    }
  },
  methods: {
    preparePayload() {
      return {
        ...this.formData,
        // Campos de ubicación que el backend espera en nivel raíz
        calle: this.formData.calle || '',
        altura: this.formData.altura || null,
        entreCalle1: this.formData.entreCalle1 || '',
        entreCalle2: this.formData.entreCalle2 || '',
        localidad: this.formData.localidad || '',

        superficie: this.formData.superficieTotal,
        dimensiones: {
          largo: this.formData.largo,
          ancho: this.formData.ancho
        },
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
      if (!this.formData.largo) {
        errors.push('El largo del terreno es requerido')
      }
      return errors
    }
  }
}
