import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_PROD_API_BASE_URL + '/api',
  withCredentials: true
})

// Interceptor para agregar el token CORRECTAMENTE
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth-token') // Exactamente como está guardado
  
  if (token) {
    config.headers['auth-token'] = token // Sin Bearer, solo el token
    // Elimina el header Authorization si no lo necesitas
    delete config.headers['Authorization']
  }
  
  return config
})

// Interceptor de respuestas (mantenemos igual)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-token')
      window.location.href = '/login?sessionExpired=true'
    }
    return Promise.reject(error)
  }
)

export default api