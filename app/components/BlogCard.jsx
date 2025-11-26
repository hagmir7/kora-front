import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const BlogCard = ({ blog }) => {
  return (
    <Link href={blog.slug} className='flex last:mb-0'>
      <div className='shadow-sm overflow-hidden flex flex-col bg-white border-[#EEEEEE] w-full rounded-[12px] border border-solid lg:rounded-2xl hover:shadow-lg transition-shadow duration-300'>
        {/* Thumbnail */}
        <div className='shrink-0 relative bg-[#d1d1d1] group aspect-w-16 aspect-h-9'>
          <div className='relative w-full pt-[56.25%]'>
            <Image
              src={blog.image_url}
              alt={blog.title}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
            />
          </div>
        </div>

        {/* Content */}
        <div className='flex justify-center flex-col rtl:pr-2.5 rtl:pl-6 lg:px-4 lg:pt-[10px] bg-white px-[4px] py-[8px]'>
          {/* Category */}
          <div className='block items-center font-medium text-[11px] text-[#5C2D91] lg:text-[12px] rtl:text-[12px] lg:rtl:text-[14px] leading-[120%] rtl:leading-[140%] mb-1 lg:mb-[10px] truncate'>
            {blog.category.name}
          </div>

          {/* Title */}
          <div className='line-clamp-2 text-[12px] rtl:text-[14px] lg:text-[16px] font-medium text-[#1A1A1A] break-words leading-[120%] rtl:leading-[140%]'>
            {blog.title}
          </div>
        </div>
      </div>
    </Link>
  )
}


export default BlogCard;