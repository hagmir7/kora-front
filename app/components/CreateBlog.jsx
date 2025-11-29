'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Save, Eye, FileText, Tag, FolderOpen } from 'lucide-react'
import RichTextEditor from './ui/RichTextEditor'
import SearchSelect from './ui/SearchSelect'
import TagInput from './ui/TagInput'

export function CreateBlog() {
  const [category, setCategory] = useState(null)
  const [tags, setTags] = useState()
  const [contentHtml, setContentHtml] = useState('<p>Start writing…</p>')
  const [title, setTitle] = useState('')

  const handleEditorChange = (html) => {
    setContentHtml(html)
  }

  const handleSubmit = () => {
    console.log({ title, category, tags, contentHtml })
  }

  const handlePreview = () => {
    console.log('Preview:', { title, category, tags, contentHtml })
  }

  return (
    <div className='container mx-auto py-8 px-4'>
      {/* Metadata Section */}
      <div className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='space-y-2'>
            <Label htmlFor='title' className='text-base font-medium'>
              العنوان
            </Label>
            <Input
              type='text'
              id='title'
              placeholder='أدخل عنوان المقال...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='h-11'
            />
          </div>

          <div className='space-y-2'>
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
              onChange={setCategory}
              placeholder='اختر صنفاً...'
              labelKey='name'
            />
          </div>

          <div className='space-y-2'>
            <Label
              htmlFor='tags'
              className='text-base font-medium flex items-center gap-2'
            >
              <Tag className='h-4 w-4' />
              العلامات
            </Label>
            <TagInput name='tags' id='tags' value={tags} onChange={setTags} />
          </div>
        </div>
      </div>

      <div className='py-5'>
        <Separator />
      </div>

      {/* Content Editor Section */}
      <div className='space-y-4'>
        <div className='flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide'>
          <FileText className='h-4 w-4' />
          <span>محتوى المقال</span>
        </div>

        <div className='rounded-lg border bg-card'>
          <RichTextEditor
            initialContent={contentHtml}
            onChange={handleEditorChange}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col sm:flex-row gap-3 justify-end mt-3'>
        <Button
          type='button'
          variant='outline'
          size='lg'
          onClick={handlePreview}
          className='gap-2'
        >
          <Eye className='h-4 w-4' />
          معاينة
        </Button>
        <Button
          type='button'
          size='lg'
          onClick={handleSubmit}
          className='gap-2'
        >
          <Save className='h-4 w-4' />
          نشر المقال
        </Button>
      </div>
    </div>
  )
}
