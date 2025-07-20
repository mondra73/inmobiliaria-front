import { ref, computed, reactive  } from 'vue'

export function useFormSetup() {

  const initialFormData = reactive({
    tituloPublicacion: '',
    operacion: '',
    visible: false,
    ubicacion: {
      calle: '',
      altura: null,
      piso: null,
      entreCalles: {
        calle1: '',
        calle2: ''
      },
      localidad: '',
      coordenadas: null,
      mapaUrl: ''
    },
    expensas: null,
    descripcion: '',
    antiguedad: null,
    categoria: '',
    precio: {
      monto: null,
      moneda: 'ARS'
    },
    baños: null,
    habitaciones: null,
    ambientes: null,
    superficieTotal: null,
    superficieCubierta: null,
    hectareas: null,
    largo: null,
    ancho: null,
    servicios: {
      agua: false,
      luz: false,
      cloacas: false,
      gas: false
    },
    amenities: {
    piscina: false,
    parrilla: false,
    jardin: false,
    terraza: false,
    garage: false,
    balcon: false
  },
    tieneAscensor: false,
    seguridad24hs: false,
    gimnasio: false,
    imagenes: []
  })

  const formData = ref({...initialFormData})

  // Todas las computed properties como en tu código original
  const showLocationSection = computed(() => !!formData.value.categoria)
  const showFeaturesSection = computed(() => !!formData.value.categoria)
  const showImagesSection = computed(() => !!formData.value.categoria)
  const showActionButtons = computed(() => !!formData.value.categoria)
  const isCampo = computed(() => formData.value.categoria === 'Campo')
  const showBedroomsField = computed(() => ['Casa', 'Departamento'].includes(formData.value.categoria))
  const showBathroomsField = computed(() => ['Casa', 'Departamento', 'Local comercial', 'Galpón'].includes(formData.value.categoria))
  const showCoveredSurfaceField = computed(() => ['Casa', 'Departamento', 'Local comercial', 'Galpón'].includes(formData.value.categoria))
  const showAgeField = computed(() => ['Casa', 'Departamento', 'Local comercial', 'Fondo de Comercio', 'Galpón'].includes(formData.value.categoria))
  const showRoomsField = computed(() => ['Casa', 'Departamento'].includes(formData.value.categoria))
  const showBasicServicesSection = computed(() =>
    ['Casa', 'Departamento', 'Local comercial', 'Fondo de Comercio', 'Terreno'].includes(formData.value.categoria)
  )
  const showGarageField = computed(() => ['Casa', 'Departamento'].includes(formData.value.categoria))
  const showGardenField = computed(() => ['Casa'].includes(formData.value.categoria))
  const showPoolField = computed(() => ['Casa'].includes(formData.value.categoria))
  const showBalconyField = computed(() => ['Casa', 'Departamento'].includes(formData.value.categoria))
  const showTerraceField = computed(() => ['Casa', 'Departamento'].includes(formData.value.categoria))
  const showGrillField = computed(() => ['Casa'].includes(formData.value.categoria))
  const showAmenitiesSection = computed(() => ['Casa', 'Departamento'].includes(formData.value.categoria))
  const showFreeHeightField = computed(() => formData.value.categoria === 'Galpón')

  // Función resetForm idéntica a la actual
  const resetForm = () => {
    const categoria = formData.value.categoria
    const moneda = formData.value.precio.moneda

    // Limpia el formulario manteniendo la reactividad
    Object.assign(formData.value, JSON.parse(JSON.stringify(initialFormData)))

    formData.value.categoria = categoria
    formData.value.precio.moneda = moneda
  }

  // Función handlePropertyTypeChange idéntica a la actual
  const handlePropertyTypeChange = () => {
    resetForm()
    console.log('Tipo de propiedad seleccionado:', formData.value.categoria)
  }

  // Mapeo de endpoints
  const endpointsPorCategoria = {
    'Casa': '/admin/nueva-casa',
    'Departamento': '/admin/nuevo-dpto',
    'Campo': '/admin/nuevo-campo',
    'Fondo de Comercio': '/admin/nuevo-fondo',
    'Local comercial': '/admin/nuevo-local',
    'Terreno': '/admin/nuevo-terreno',
    'Galpón': '/admin/nuevo-galpon',
  }

  const getEndpoint = (categoria) => {
    return endpointsPorCategoria[categoria] || ''
  }

  return {
    formData,
    resetForm,
    handlePropertyTypeChange,
    getEndpoint,
    showLocationSection,
    showFeaturesSection,
    showImagesSection,
    showActionButtons,
    isCampo,
    showBedroomsField,
    showBathroomsField,
    showCoveredSurfaceField,
    showAgeField,
    showRoomsField,
    showBasicServicesSection,
    showGarageField,
    showGardenField,
    showPoolField,
    showBalconyField,
    showTerraceField,
    showGrillField,
    showAmenitiesSection,
    showFreeHeightField
  }
}
