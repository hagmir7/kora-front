import CompetitionsList from '@/app/components/CompetitionsList'
import FollowUs from '@/app/components/FollowUs'
import Newsletter from '@/components/Newsletter'
import PopularNews from '@/components/popular-news'
import { createServerApi } from '@/lib/serverApi'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function Page({ params }) {
  const { slug } = await params
  const api = createServerApi()

  let competition = null

  try {
    const response = await api.get(`competitions/${slug}`)
    competition = response.data
  } catch (error) {
    console.error('Error fetching competition:', error)
    notFound()
  }

  if (!competition) {
    notFound()
  }

  const getTypeLabel = (type) => {
    const labels = {
      League: 'دوري',
      Cup: 'كأس',
      SuperCup: 'كأس السوبر',
      International: 'دولي',
      Qualifier: 'تصفيات',
      Tournament: 'بطولة',
      Continental: 'قاري',
    }
    return labels[type] || type
  }

  const getTypeBadgeColor = (type) => {
    const colors = {
      League: 'bg-blue-100 text-blue-700 border border-blue-200',
      Cup: 'bg-green-100 text-green-700 border border-green-200',
      SuperCup: 'bg-purple-100 text-purple-700 border border-purple-200',
      International: 'bg-red-100 text-red-700 border border-red-200',
      Qualifier: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      Tournament: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
      Continental: 'bg-pink-100 text-pink-700 border border-pink-200',
    }
    return colors[type] || 'bg-gray-100 text-gray-700 border border-gray-200'
  }

  return (
    <div className='bg-gray-50 min-h-screen font-sans pt-5' dir='rtl'>
      <main className='flex flex-row relative xl:px-5 bg-gray-50 max-w-7xl mx-auto'>
        <section className='w-full lg:w-2/3 lg:pr-4'>
          <div className='rounded-md px-4'>
            {/* Competition Header */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6'>
              <div className='flex items-start gap-6 mb-6'>
                {/* Logo */}
                <div className='flex-shrink-0 w-24 h-24 relative'>
                  {competition.logo ? (
                    <div className='w-full h-full rounded-xl overflow-hidden bg-gray-50 p-3 border border-gray-100'>
                      <Image
                        src={competition.logo}
                        alt={competition.title}
                        fill
                        className='object-contain'
                        sizes='96px'
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center'>
                      <svg
                        className='w-12 h-12 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9'
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Title and Info */}
                <div className='flex-1'>
                  <h1 className='text-md md:text-lg xl:text-xl font-bold text-gray-900 mb-3'>
                    {competition.title}
                  </h1>

                  <div className='flex flex-wrap items-center gap-3'>
                    {/* Type Badge */}
                    <span
                      className={`inline-flex text-sm px-3 py-1.5 rounded-full font-semibold ${getTypeBadgeColor(
                        competition.type
                      )}`}
                    >
                      {getTypeLabel(competition.type)}
                    </span>

                    {/* Season */}
                    <div className='flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full'>
                      <svg
                        className='w-4 h-4 text-gray-500'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                      <span className='font-medium'>{competition.season}</span>
                    </div>

                    {/* Country */}
                    {competition.country && (
                      <div className='flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full'>
                        <svg
                          className='w-4 h-4 text-gray-500'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                        <span>{competition.country.name}</span>
                      </div>
                    )}
                  </div>

                  {/* English Name */}
                  {competition.name && (
                    <p className='text-sm text-gray-500 mt-3 font-medium'>
                      {competition.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              {competition.description && (
                <div className='border-t border-gray-100 pt-4'>
                  <h2 className='text-sm md:text-base font-semibold text-gray-900 mb-2'>
                    نبذة عن البطولة
                  </h2>
                  <p className='text-gray-700 text-sm leading-relaxed'>
                    {competition.description}
                  </p>
                </div>
              )}
            </div>

            {/* Tabs Section (Placeholder for future content) */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6'>
              <div className='border-b border-gray-200'>
                <nav className='flex' aria-label='Tabs'>
                  <button className='px-6 py-4 text-sm font-semibold text-blue-600 border-b-2 border-blue-600'>
                    الجدول
                  </button>
                  <button className='px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50'>
                    المباريات
                  </button>
                  <button className='px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50'>
                    الإحصائيات
                  </button>
                  <button className='px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50'>
                    الفرق
                  </button>
                </nav>
              </div>

              <div className='p-6'>
                <div className='text-center py-12 text-gray-500'>
                  <svg
                    className='w-16 h-16 mx-auto mb-4 text-gray-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                  <p className='text-lg font-medium'>
                    لا توجد بيانات متاحة حالياً
                  </p>
                  <p className='text-sm mt-1'>سيتم إضافة المحتوى قريباً</p>
                </div>
              </div>
            </div>

            {/* Additional Content Section */}
            {competition.body && (
              <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6'>
                <h2 className='text-xl font-bold text-gray-900 mb-4'>
                  تفاصيل إضافية
                </h2>
                <div
                  className='prose blog-prose prose-gray max-w-none text-gray-700 text-sm leading-relaxed'
                  dangerouslySetInnerHTML={{ __html: competition.body }}
                />
              </div>
            )}
          </div>
        </section>

        <aside className='hidden lg:flex flex-col lg:w-1/3 bg-gray-50'>
          <PopularNews />
          <Newsletter />
          <FollowUs />
        </aside>
      </main>
    </div>
  )
}
