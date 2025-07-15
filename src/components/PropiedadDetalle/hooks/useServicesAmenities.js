import { computed } from 'vue'

export function useServicesAmenities(propiedad) {
  const showServices = computed(() => {
    return ['Casa', 'Departamento', 'Local', 'FondoComercio', 'Terreno'].includes(propiedad.value?.tipo)
  })

  const showAmenities = computed(() => {
    if (!propiedad.value) return false
    return ['Casa', 'Departamento'].includes(propiedad.value.tipo)
  })

  const amenitiesConfig = computed(() => {
    const tipo = propiedad.value?.tipo
    const config = {}

    if (tipo === 'Casa') {
      Object.assign(config, {
        piscina: 'Piscina',
        parrilla: 'Parrilla',
        jardin: 'Jardín',
        terraza: 'Terraza',
        garage: 'Garage',
        balcon: 'Balcón'
      })
    } else if (tipo === 'Departamento') {
      Object.assign(config, {
        terraza: 'Terraza',
        garage: 'Garage',
        balcon: 'Balcón',
        tieneAscensor: 'Ascensor',
        seguridad24hs: 'Seguridad 24hs',
        piscina: 'Piscina',
        gimnasio: 'Gimnasio'
      })
    }

    return config
  })

  return {
    showServices,
    showAmenities,
    amenitiesConfig
  }
}