import axios from 'axios'

// Test token for development
const TEST_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0NTkyNDIxLCJpYXQiOjE3NjQ1MDYwMjEsImp0aSI6ImI2ZTRhOGJiMWE2YTRhNWFiNGU2Mjg4ZTgyZWU2YzQ0IiwidXNlcl9pZCI6IjEifQ.CEJ8C7rG8SRv-fyun9LmJ5mG1MMIs5ZbJ0KmcmKVM5E'

const getAuthToken = () => {
  // In development, use test token
  if (process.env.NODE_ENV === 'development') {
    return TEST_TOKEN
  }

  // In production, use localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('authToken') || ''
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
