import axios from 'axios'

// Determina el entorno actual (development, production, etc.)
const env = import.meta.env.MODE || 'development'

// Configuración base según entorno
const baseConfig = {
  development: {
    baseURL: import.meta.env.VITE_DEV_API_BASE_URL,
    timeout: parseInt(import.meta.env.VITE_DEFAULT_TIMEOUT),
    withCredentials: false
  },
  production: {
    baseURL: import.meta.env.VITE_PROD_API_BASE_URL,
    timeout: parseInt(import.meta.env.VITE_DEFAULT_TIMEOUT),
    withCredentials: true
  },
  staging: {
    baseURL: import.meta.env.VITE_STAGING_API_BASE_URL,
    timeout: parseInt(import.meta.env.VITE_DEFAULT_TIMEOUT),
    withCredentials: true
  }
}

// Crea instancia de axios con la configuración adecuada
const api = axios.create(baseConfig[env] || baseConfig.development)

// Interceptor para autenticación
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers['auth-token'] = token
  }
  return config
}, error => Promise.reject(error))

// Interceptor de respuestas
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login?sessionExpired=true'
    }
    return Promise.reject(error)
  }
)

export default api
