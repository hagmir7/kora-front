// components/NewsContainer.js
import { createServerApi } from '@/lib/serverApi'
import BlogCard from './BlogCard'

const NewsContainer = async () => {
  const api = createServerApi()

  let blogs = []
  try {
    const { data } = await api.get('blogs')
    blogs = data.results
  } catch (err) {
    console.error('Error fetching blogs:', err.message)
  }

  return (
    <div className='mb-3 lg:mb-4 lg:rounded-[22px]'>
      {/* Header */}
      <header
        className='block lg:py-4 h-10 lg:h-[56px] px-4 lg:px-4 flex items-center relative bg-cover bg-center bg-no-repeat gap-x-1.5 lg:rounded-t-[22px] scale-x-[-1] flex-row-reverse text-white'
        style={{
          backgroundImage:
            'url("https://prod-media.beinsports.com/image/default_banner.webp")',
        }}
      >
        <div className='flex gap-x-1.5 lg:gap-x-2.5 items-center truncate scale-x-[-1]'>
          <h1 className='text-md rtl:text-md font-medium rtl:font-semibold whitespace-nowrap truncate lg:text-lg'>
            أحدث مقاطع الفيديو
          </h1>
        </div>
      </header>

      {/* Video Grid */}
      <div className='w-full mb-8'>
        <div className='lg:rounded-[22px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-3 gap-y-4 py-2 pt-3'>
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsContainer
