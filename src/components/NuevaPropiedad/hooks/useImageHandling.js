import { ref } from 'vue'

export function useImageHandling() {
  const files = ref([])

  const handleFileUpload = (event) => {
    try {
      const uploadedFiles = Array.from(event.target.files)
      
      for (const file of uploadedFiles) {
        if (!file.type.match('image.*')) continue

        const reader = new FileReader()
        reader.onload = (e) => {
          files.value.push({
            id: Date.now() + Math.random(), // ID único para drag & drop
            file: file,
            preview: e.target.result,
            descripcion: '',
            orden: files.value.length,
            esPortada: files.value.length === 0, // La primera es portada
            offsetX: 0.5, 
            offsetY: 0.5,
            zoom: 1.0
          })
        }
        reader.readAsDataURL(file)
      }
    } catch (error) {
      console.error('Error al cargar imágenes:', error)
      throw error
    }
  }

  const removeFile = (index) => {
    files.value.splice(index, 1)
    updateOrders()
  }

  const updateOrders = () => {
    files.value = files.value.map((file, index) => ({
      ...file,
      orden: index,
      esPortada: index === 0
    }))
  }

  const handleDragEnd = () => {
    updateOrders()
  }

  return {
    files,
    handleFileUpload,
    removeFile,
    handleDragEnd, 
    updateOrders 
  }
}