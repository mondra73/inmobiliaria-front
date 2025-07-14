export const FondoComercioForm = {
  props: ['formData'],
  computed: {
    showSpecificFields() {
      return {
        nombreComercio: true,
        rubro: true,
        superficieLocal: true,
        antiguedadComercio: true,
        facturacionMensual: true,
        empleados: true,
        precioVenta: true,
        precioAlquiler: true,
        incluyeMercaderia: true,
        incluyeMaquinaria: true
      }
    }
  },
  methods: {
    preparePayload() {
      return {
        ...this.formData,
        instalaciones: Array.isArray(this.formData.instalaciones)
          ? this.formData.instalaciones
          : [],
        contacto: this.formData.contacto || null
      }
    },
    validate() {
      const errors = []
      if (!this.formData.nombreComercio) {
        errors.push('El nombre del comercio es requerido')
      }
      if (!this.formData.rubro) {
        errors.push('El rubro es requerido')
      }
      if (!this.formData.precioVenta && !this.formData.precioAlquiler) {
        errors.push('Debe especificar al menos precio de venta o alquiler')
      }
      return errors
    }
  }
}
