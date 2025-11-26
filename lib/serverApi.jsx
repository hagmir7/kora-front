// lib/api.server.js
import axios from 'axios'
import cookie from 'cookie'

/**
 * Server-side axios factory for Next.js.
 * Usage:
 *  - getServerSideProps({ req }) => const api = createServerApi(req)
 *  - Next API route (req, res) => const api = createServerApi(req)
 *  - App Router: call createServerApi() and set api.defaults.headers.common.Authorization manually from cookies()
 */
const DEFAULT_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000/api/'
    : 'http://192.168.1.113/api/')

export function createServerApi(req) {
  const instance = axios.create({
    baseURL: DEFAULT_BASE,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  // read token from incoming request cookies if available
  try {
    const cookieHeader = req?.headers?.cookie
    if (cookieHeader) {
      const parsed = cookie.parse(cookieHeader)
      const token = parsed.authToken || parsed.token || ''
      if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
  } catch (e) {
    // ignore cookie parsing errors
  }

  return instance
}
