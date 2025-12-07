import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const BlogCard = ({ blog }) => {
  return (
    <Link href={`/news/${blog.slug}`}>
      {/* Mobile Layout */}
      <div className='flex flex-row gap-3 py-2 border-b border-gray-200 hover:bg-gray-50 lg:hidden'>
        <div className='relative rounded-md overflow-hidden shrink-0 w-[158px] h-[90px]'>
          <Image
            src={blog.image_url}
            alt={blog.title}
            width={158}
            height={90}
            className='w-full h-full object-cover'
            unoptimized
          />
        </div>
        <div className='flex flex-col gap-y-1 flex-1'>
          <div className='text-[11px] font-medium text-[#5C2D91] truncate'>
            {blog.category.name}
          </div>
          <div className='line-clamp-2 font-semibold text-sm text-gray-900'>
            {blog.title}
          </div>
          {blog.description && (
            <div className='text-gray-500 line-clamp-2 text-xs'>
              {blog.description.length > 100
                ? `${blog.description.slice(0, 100)}...`
                : blog.description}
            </div>
          )}
          {blog.created_at && (
            <div className='text-xs text-gray-500 hidden xs:block'>
              {blog.created_at}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className='hidden lg:flex flex-col shadow-sm bg-white border border-[#EEEEEE] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow'>
        <div className='relative w-full aspect-video bg-gray-200'>
          <Image
            src={blog.image_url}
            alt={blog.title}
            width={400}
            height={225}
            className='w-full h-[164px] object-cover'
            unoptimized
          />
        </div>
        <div className='px-3 py-2'>
          <div className='text-[12px] font-medium text-[#5C2D91] mb-1 truncate'>
            {blog.category.name}
          </div>
          <div className='line-clamp-2 font-semibold text-base text-black'>
            {blog.title}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard;