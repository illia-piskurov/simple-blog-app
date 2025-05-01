import axios from 'axios'

const api = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshRes = await api.post('/auth/refresh')
        const newAccessToken = refreshRes.data.accessToken

        localStorage.setItem('accessToken', newAccessToken)
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(err)
  }
)

export default api
