// import { api } from '@/lib/api'
// import { api } from '@/lib/clientApi'
import { api } from '@/lib/clientApi'
import axios from 'axios'
import Cookies from 'js-cookie' 


export const register = async (userData) => {
  return axios.post(`register`, userData)
}



export const login = async ({ username, password, rememberMe }) => {
  if (typeof window === 'undefined') {
    throw new Error('login() must be called from the browser (client-side).')
  }

  try {
    const response = await api.post(
      'auth/token',
      { username, password, rememberMe },
      { headers: { 'Content-Type': 'application/json' } }
    )

    const data = response.data || {}
    const token =
      data.access_token ||
      data.accessToken ||
      data.token ||
      (data.data && (data.data.access_token || data.data.token))

    if (!token) {
      return data
    }

    try {
      localStorage.setItem('access_token', token)
      console.log('[login] saved token to localStorage')
    } catch (err) {
  
      
      try {
        sessionStorage.setItem('access_token', token)
      } catch (err2) {
        console.error('[login] sessionStorage also failed:', err2)
      }
    }

    if (rememberMe) {
      Cookies.set('access_token', token, { expires: 7 })
    }

    return { ...data, _tokenStored: !!token }
  } catch (error) {
    console.error(
      'Login failed:',
      error.response?.data || error.message || error
    )
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
