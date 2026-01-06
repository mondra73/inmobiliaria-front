import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_PROD_API_BASE_URL + '/api',
  withCredentials: true
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth-token') 
  
  if (token) {
    config.headers['auth-token'] = token 
    delete config.headers['Authorization']
  }
  
  return config
})

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