import axios from 'axios'

const getAuthToken = () => {
  // In development, use test token
  if (process.env.NODE_ENV === 'development') {
    return localStorage.getItem('access_token') || ''
  }

  // In production, use localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('access_token') || ''
  }

  return ''
}

let baseURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8000/api/'
} else {
  baseURL = 'http://192.168.1.113/api/'
}

export const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
