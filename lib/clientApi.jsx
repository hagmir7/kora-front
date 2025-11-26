import axios from 'axios'

const getAuthToken = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('authToken') || ''
  }
  return ''
}

// Fix for environment detection
let baseURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8000/api/'
} else {
  baseURL = 'http://192.168.1.113/api/'
}

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Attach token to every request if it exists
api.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
