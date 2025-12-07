import VideoCard from '@/app/components/VideoCard'
import { createServerApi } from '@/lib/serverApi'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link';
import React from 'react';

const PopularNews = async () => {
  const api = createServerApi()

  let blogs = []
  try {
    const response = await api.get('popular-blogs')
    blogs = response.data
  } catch (error) {}
  return (
    <div className='bg-white shadow-sm mb-4 rounded-[22px]'>
      <header
        style={{
          backgroundImage:
            'url(https://prod-media.beinsports.com/image/hero_editorial_background.png)',
        }}
        className='bg-gradient-to-r from-purple-900 to-purple-700 text-white rounded-t-[22px] px-4 py-4'
      >
        <h2 className='text-lg font-semibold'>أبرز أخبار كرة القدم</h2>
      </header>
      <div className='px-4 pt-2'>
        {blogs.map((blog, idx) => (
          <VideoCard key={idx} {...blog} />
        ))}
        <div className='pt-2 pb-4'>
          <Link
            href='/news'
            className='flex items-center text-purple-700 font-medium'
          >
            <span>أظهر المزيد</span>
            <ChevronDown className='mr-1 w-4 h-4' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularNews
