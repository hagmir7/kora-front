'use client'

import React, { useState } from 'react'
import { api } from '@/lib/clientApi'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setSuccess('')
    setError('')

    try {
      const res = await api.post('/newsletter/', { email }) // <-- your API endpoint
      setSuccess('تم الاشتراك في النشرة الإخبارية بنجاح!')
      setEmail('')
    } catch (err) {
      console.error(err)
      setError('حدث خطأ، يرجى المحاولة مرة أخرى.')
    }

    setLoading(false)
  }

  const isValidEmail = email.includes('@') && email.includes('.')

  return (
    <div className='rounded-[22px] bg-white p-5 shadow-sm mb-4' dir='rtl'>
      <div className="bg-[url('/images/newsletter.png')] bg-right-top bg-no-repeat">
        <div>
          <div className='font-bold text-[22px] mb-2'>
            انضم إلى قائمة نشرتنا الإخبارية
          </div>
          <div className='text-base pb-2'>
            اشترك للحصول على محتوى حصري وتحديثات منتقاة
          </div>
        </div>
      </div>

      {/* Email Input */}
      <div className='w-full mt-3'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='أدخل بريدك الإلكتروني'
          className='w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-700 focus:outline-none text-right'
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValidEmail || loading}
          className={`w-full mt-4 py-2 rounded-md font-medium text-center
            ${
              !isValidEmail || loading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#5C2D91] text-white hover:bg-[#4b2376]'
            }`}
        >
          {loading ? 'جاري الإرسال...' : 'إشترك'}
        </button>

        {/* Messages */}
        {success && (
          <p className='text-green-600 text-sm mt-3 text-right'>{success}</p>
        )}
        {error && (
          <p className='text-red-600 text-sm mt-3 text-right'>{error}</p>
        )}
      </div>
    </div>
  )
}

export default Newsletter
