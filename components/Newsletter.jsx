import React from 'react'

const Newsletter = () => {
  return (
    <div className='rounded-[22px] bg-white p-5 shadow-sm mb-4'>
      <div className="bg-[url('/images/newsletter.png')] bg-right-top bg-no-repeat">
        <div className=''>
          <div className='font-bold text-[22px] mb-2'>
            انضم إلى قائمة نشرتنا الإخبارية
          </div>
          <div className='text-base pb-2'>
            اشترك للحصول على محتوى حصري وتحديثات منتقاة
          </div>
        </div>
      </div>
      <div className='w-full mt-3'>
        <input
          type='email'
          placeholder='أدخل بريدك الإلكتروني'
          className='w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-700 focus:outline-none'
        />
        <button
          className='w-full mt-4 py-2 bg-gray-200 text-gray-400 rounded-md font-medium text-center'
          disabled
        >
          <span>إشترك</span>
        </button>
      </div>
    </div>
  )
}

export default Newsletter
