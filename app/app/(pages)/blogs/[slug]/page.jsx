'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CreateEditBlog from '@/app/components/CreateEditBlog'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { api } from '@/lib/clientApi'

const Page = () => {
  const pathname = usePathname()
  const slug = pathname.split('/').pop()

  const [blogData, setBlogData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return

    const fetchBlog = async () => {
      setLoading(true)
      try {
        const response = await api.get(`/blogs/${slug}`)
        setBlogData(response.data)
      } catch (err) {
        console.error(err)
        setError(err?.response?.data?.message || 'حدث خطأ أثناء تحميل المقال')
        toast.error('فشل في تحميل المقال')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  const handleSuccess = (data) => {
    console.log('Blog saved/updated:', data)
    toast.success('تم الحفظ بنجاح')
  }

  if (loading) return <p>جارٍ تحميل المقال...</p>
  if (error) return <p className='text-red-600'>{error}</p>

  return (
    <div className='container mx-auto py-4'>
      <CreateEditBlog
        blogSlug={slug} // edit mode
        onSuccess={handleSuccess}
      />
    </div>
  )
}

export default Page
