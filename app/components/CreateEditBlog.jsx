'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Save, FileText, Tag, FolderOpen, ImageIcon } from 'lucide-react'
import RichTextEditor from './ui/RichTextEditor'
import SearchSelect from './ui/SearchSelect'
import TagInput from './ui/TagInput'
import { api } from '@/lib/clientApi'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function CreateEditBlog({ blogSlug = null, onSuccess = null }) {
  const [category, setCategory] = useState(null)
  const [tags, setTags] = useState([])
  const [contentHtml, setContentHtml] = useState('<p></p>')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [existingImage, setExistingImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [isDirty, setIsDirty] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!blogSlug) return

    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        const response = await api.get(`blogs/${blogSlug}`)
        if (!mounted) return
        const data = response.data
        setTitle(data.title || '')
        setDescription(data.description ?? '')
        setContentHtml(data.body || '<p></p>')
        setCategory(data.category || null)
        setTags(
          Array.isArray(data.tags)
            ? data.tags.map((t) => (typeof t === 'string' ? t : t.name || t))
            : []
        )
        setExistingImage(data.image_url ?? data.image ?? null)
      } catch (err) {
        console.error('Failed to load blog:', err)
        toast.error('فشل في تحميل المقال')
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [blogSlug])

  const handleEditorChange = (html) => {
    setContentHtml(html)
    setIsDirty(true)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null
    setImageFile(file)
    if (file) setExistingImage(null)
    setIsDirty(true)
  }

  const clearForm = () => {
    setTitle('')
    setDescription('')
    setCategory(null)
    setTags([])
    setImageFile(null)
    setExistingImage(null)
    setContentHtml('<p></p>')
    setError(null)
    setProgress(0)
    setIsDirty(false)
  }

  const handleSubmit = async () => {
    setError(null)
    if (!title.trim()) {
      setError('من فضلك أدخل العنوان')
      toast.error('من فضلك أدخل العنوان')
      return
    }

    setLoading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('body', contentHtml)

      if (description.trim()) formData.append('description', description)
      if (category) formData.append('category_id', category?.id ?? category)

      if (tags && Array.isArray(tags)) {
        formData.append('tags', tags.join(','))
      }

      if (imageFile) {
        formData.append('image_url', imageFile)
      }

      let response
      if (blogSlug) {
        response = await api.put(`blogs/${blogSlug}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (ev) => {
            const pct = Math.round((ev.loaded * 100) / (ev.total || 1))
            setProgress(pct)
          },
        })
      } else {
        response = await api.post('blogs', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (ev) => {
            const pct = Math.round((ev.loaded * 100) / (ev.total || 1))
            setProgress(pct)
          },
        })
        router.push('/app/blogs/' + response.data.slug)
      }

      toast.success(
        blogSlug ? 'تم تحديث المقال بنجاح' : 'تم نشر المقال بنجاح',
        {
          description: blogSlug
            ? 'تم تحديث المقال بنجاح'
            : 'تم نشر المقال بنجاح',
        }
      )

      setIsDirty(false)
      if (typeof onSuccess === 'function') onSuccess(response.data)
      if (!blogSlug) clearForm()
    } catch (err) {
      console.error(err)
      const errorMessage =
        err?.response?.data?.message ?? err.message ?? 'حدث خطأ'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container mx-auto py-2 px-4'>
      {/* Top grid: form fields */}
      <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Left: main fields (span 2 on large screens) */}
          <div className='lg:col-span-2'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Title */}
              <div className='col-span-1'>
                <Label htmlFor='title' className='text-base font-medium'>
                  العنوان
                </Label>
                <Input
                  type='text'
                  id='title'
                  placeholder='أدخل عنوان المقال...'
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                    setIsDirty(true)
                  }}
                />
              </div>

              {/* Category */}
              <div className='col-span-1'>
                <Label
                  htmlFor='category'
                  className='text-base font-medium flex items-center gap-2'
                >
                  <FolderOpen className='h-4 w-4' />
                  الصنف
                </Label>
                <SearchSelect
                  apiUrl='categories'
                  value={category}
                  onChange={(v) => {
                    setCategory(v)
                    setIsDirty(true)
                  }}
                  placeholder='اختر صنفاً...'
                  labelKey='name'
                />
              </div>

              {/* Description full width */}
              <div className='col-span-1 md:col-span-2'>
                <Label htmlFor='description' className='text-base font-medium'>
                  الوصف
                </Label>
                <Textarea
                  id='description'
                  placeholder='أدخل وصف مختصر للمقال...'
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                    setIsDirty(true)
                  }}
                  rows={3}
                  className='resize-none'
                />
              </div>
            </div>
          </div>

          {/* Right column: image + tags */}
          <aside className='flex flex-col gap-4'>
            {/* Image input */}
            <div>
              <Label
                htmlFor='image'
                className='text-base font-medium flex items-center gap-2'
              >
                <ImageIcon className='h-4 w-4' />
                صورة
              </Label>
              <Input
                id='image'
                placeholder='إختر صورة'
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                aria-describedby='image-help'
              />
              <div id='image-help' className='mt-2'>
                {imageFile && (
                  <p className='text-sm'>المختار: {imageFile.name}</p>
                )}
                {!imageFile && existingImage && (
                  <div className='mt-2'>
                    <p className='text-sm'>الصورة الحالية:</p>
                    {/* <div className='mt-1 w-full max-w-xs'>
                      <Image
                        width={400}
                        height={240}
                        src={existingImage}
                        alt='current'
                        className='rounded object-contain max-h-40'
                        unoptimized
                      />
                    </div> */}
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label
                htmlFor='tags'
                className='text-base font-medium flex items-center gap-2'
              >
                <Tag className='h-4 w-4' />
                العلامات
              </Label>
              <TagInput
                name='tags'
                id='tags'
                value={tags}
                onChange={(v) => {
                  setTags(v)
                  setIsDirty(true)
                }}
              />
            </div>

            {/* Optionally show small meta / progress in right column */}
            <div className='mt-auto'>
              {progress > 0 && loading && (
                <p className='text-sm'>تحميل الصورة: {progress}%</p>
              )}
              {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
            </div>
          </aside>
        </div>

        <Separator />

        {/* Editor */}
        <div className='space-y-4'>
          <div className='flex items-center gap-2 text-md text-black uppercase tracking-wide'>
            <FileText className='h-4 w-4' />
            <span>محتوى المقال</span>
          </div>
          <div className='rounded-lg border'>
            {(!blogSlug || !loading) && (
              <RichTextEditor
                key={blogSlug || 'new'}
                initialContent={contentHtml}
                onChange={handleEditorChange}
              />
            )}
          </div>
        </div>

        {/* Actions */}
        <div className='flex flex-col sm:flex-row gap-3 justify-end mt-3'>
          <Button
            type='button'
            size='lg'
            onClick={handleSubmit}
            className='gap-2'
            disabled={loading}
          >
            <Save className='h-4 w-4' />
            {loading
              ? `جارٍ الحفظ (${progress}%)`
              : blogSlug
              ? 'تحديث المقال'
              : 'نشر المقال'}
          </Button>
          <Button
            type='button'
            variant='ghost'
            onClick={clearForm}
            disabled={loading}
          >
            مسح الحقول
          </Button>
        </div>
      </form>
    </div>
  )
}
