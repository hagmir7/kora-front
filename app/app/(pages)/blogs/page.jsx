import { BlogTable } from '@/components/blog-table'
import React from 'react'
import data from './data.json'
import { createServerApi } from '@/lib/serverApi'

const Page = async () => {
  const api = createServerApi()

  let blogs = []
  try {
    const { data } = await api.get('blogs')
    blogs = data.results
  } catch (err) {
    console.error('Error fetching blogs:', err.message)
  }
  return (
    <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
      <BlogTable data={blogs} />
    </div>
  )
}

export default Page
