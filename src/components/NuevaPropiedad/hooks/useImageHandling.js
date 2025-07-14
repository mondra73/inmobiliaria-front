import { ref } from 'vue'

export function useImageHandling() {
  const files = ref([])

  const handleFileUpload = (event) => {
    try {
      const uploadedFiles = Array.from(event.target.files)
      files.value = []

      for (const file of uploadedFiles) {
        if (!file.type.match('image.*')) continue

        const reader = new FileReader()
        reader.onload = (e) => {
          files.value.push({
            file: file,
            preview: e.target.result,
            descripcion: ''
          })
        }
        reader.readAsDataURL(file)
      }
    } catch (error) {
      console.error('Error al cargar imágenes:', error)
      throw error // Lo manejaremos en el componente principal
    }
  }

  const removeFile = (index) => {
    files.value.splice(index, 1)
  }

  return {
    files,
    handleFileUpload,
    removeFile
  }
}
