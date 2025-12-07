'use client'

import { useState } from 'react'
import { login } from '@/services/auth'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await login({ username, password, rememberMe })
      localStorage.setItem('access_token', response.access)
      // console.log(response);
      
      router.push('/app')
    } catch (err) {
      setError('بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.')
    }

  }

  return (
    <div className='max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg p-6 space-y-6 mt-5'>
      <div className='flex justify-center '>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>تسجيل الدخول</h2>
          <p className='text-gray-500 text-lg mt-1'>الوصول إلى حسابك</p>
        </div>
      </div>

      <form className='space-y-5' onSubmit={handleLogin}>
        {error && (
          <div className='bg-red-50 border-l-4 border-red-500 p-4 rounded'>
            <p className='text-red-600 text-md'>{error}</p>
          </div>
        )}

        <div>
          <label
            htmlFor='username'
            className='block mb-2 text-md font-medium text-gray-700'
          >
            البريد الإلكتروني
          </label>
          <input
            type='text'
            id='username'
            className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5c2d91] focus:border-transparent transition-all'
            placeholder='أدخل البريد الإلكتروني'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <div className='flex justify-between mb-2'>
            <label
              htmlFor='password'
              className='text-md font-medium text-gray-700'
            >
              كلمة المرور
            </label>
            <a
              href='/user/forgot-password'
              className='text-sm font-medium text-[#5c2d91] hover:text-[#7b4db8] transition-colors'
            >
              نسيت كلمة المرور؟
            </a>
          </div>
          <input
            type='password'
            id='password'
            placeholder='••••••••'
            className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5c2d91] focus:border-transparent transition-all'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className='flex items-center gap-2'>
          <input
            id='remember'
            type='checkbox'
            className='w-4 h-4 border border-gray-300 rounded text-[#5c2d91] focus:ring-2 focus:ring-[#5c2d91]'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
          />
          <label htmlFor='remember' className='ml-2 text-md text-gray-600'>
            تذكرني
          </label>
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='w-full py-3 px-5 flex justify-center bg-[#5c2d91] hover:bg-[#7b4db8] text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-[#5c2d91]/50 disabled:opacity-70'
        >
          {isLoading ? (
            <span className='flex items-center justify-center text-center'>
              <Loader2 className='animate-spin mr-2 h-4 w-4' />
              جاري تسجيل الدخول...
            </span>
          ) : (
            'تسجيل الدخول'
          )}
        </button>

        <div className='text-center mt-6'>
          <p className='text-md text-gray-600'>
            ليس لديك حساب بعد؟{' '}
            <a
              href='/user/register'
              className='font-medium text-[#5c2d91] hover:text-[#7b4db8] transition-colors'
            >
              إنشاء حساب جديد
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
