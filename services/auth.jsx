// import { api } from '@/lib/api'
// import { api } from '@/lib/clientApi'
import { api } from '@/lib/clientApi'
import axios from 'axios'

export const register = async (userData) => {
  return axios.post(`register`, userData)
}

export const login = async ({ username, password, rememberMe }) => {
  try {
    const response = await api.post(
      'auth/token',
      { username, password, rememberMe },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const data = response.data

    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token)
      if (rememberMe) {
        Cookies.set('access_token', data.access_token, { expires: 7 }) // 7 days
      }
    }

    return data
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message)
    throw error
  }
}

export const forgotPassword = async (email) => {
  return axios.post(`forgot-password`, { email })
}

export const logout = async () => {
  const access_token = localStorage.getItem('access_token')
  if (!access_token) return

  await axios.post(
    `logout`,
    {},
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  )

  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
}

export const User = async () => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return null
  }

  const user = localStorage.getItem('user')
  if (user) {
    try {
      return JSON.parse(user)
    } catch {
      localStorage.removeItem('user')
    }
  }

  const access_token = localStorage.getItem('access_token')
  if (!access_token) return null

  try {
    const response = await api.get(`user`, {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error)
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    return null
  }
}
