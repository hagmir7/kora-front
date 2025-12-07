import FollowUs from '@/app/components/FollowUs'
import { notFound } from 'next/navigation'
import { createServerApi } from '@/lib/serverApi'
import Image from 'next/image'
import Newsletter from '@/components/Newsletter'
import PopularNews from '@/components/popular-news'


export async function generateMetadata({ params }) {
  const { slug } = await params
  const api = createServerApi()

  try {
    const { data: blog } = await api.get(`blogs/${slug}`)

    const title = blog.title || 'أخر الأخبار'
    const description =
      blog.description?.slice(0, 160) ||
      `اقرأ أحدث المقالات حول ${blog?.category?.name || 'الأخبار'}`

    const keywords =
      blog.tags?.join(', ') ||
      `${blog.title}, ${blog.category?.name}, blog, article`

    const image = blog.image_url || '/default.jpg'

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `https://koratab.com/news/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://koratab.com/news/${slug}`,
        type: 'article',
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
    }
  } catch (err) {
    return {
      title: 'Blog not found',
      description: 'The blog you are looking for does not exist.',
    }
  }
}



export default async function Page({ params }) {
  const { slug } = await params
  const api = createServerApi()

  let blog
  try {
    const { data } = await api.get(`blogs/${slug}`)
    blog = data
  } catch (err) {
    console.error('Error fetching blog:', err.message)
    notFound()
  }

  if (!blog) notFound()

  return (
    <div className='pt-2 md:pt-5' dir='rtl'>
      <main className='flex flex-row relative xl:px-5 bg-gray-50 max-w-7xl mx-auto gap-2'>
        {/* Main Content */}
        <section className='w-full lg:w-2/3 lg:pr-4'>
          <article className='bg-white rounded-[22px] px-4 md:px-6 py-6 shadow-sm mb-2'>
            <h1 className='text-xl md:text-2xl font-bold text-gray-900 mb-4'>
              {blog.title}
            </h1>

            <div className='flex items-center gap-4 text-gray-500 text-sm mb-6'>
              <span>
                {new Date(blog.created_at).toLocaleDateString('ar-EG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>

              {blog.category && (
                <span>
                  <span className='inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium'>
                    {blog.category.name}
                  </span>
                </span>
              )}
            </div>

            {blog.image_url && (
              <div className='relative w-ful mb-6 rounded-lg overflow-hidden'>
                <Image
                  src={blog.image_url}
                  alt={blog.title}
                  width={400}
                  height={400}
                  className='object-cover w-full h-auto'
                  unoptimized
                />
              </div>
            )}

            {blog.description && (
              <p className='text-lg text-gray-700 mb-6 leading-relaxed'>
                {blog.description}
              </p>
            )}

            <div
              className='blog-prose prose-lg max-w-none text-gray-800 leading-relaxed'
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />
          </article>
        </section>

        {/* Sidebar */}
        <aside className='hidden lg:flex flex-col lg:w-1/3 bg-gray-50'>
          <PopularNews />
          <Newsletter />
          <FollowUs />
        </aside>
      </main>
    </div>
  )
}
