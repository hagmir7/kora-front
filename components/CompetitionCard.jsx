// components/CompetitionCard.jsx
import Image from 'next/image'
import Link from 'next/link'

export default function CompetitionCard({ competition }) {
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
      League: 'bg-blue-100 text-blue-800',
      Cup: 'bg-green-100 text-green-800',
      SuperCup: 'bg-purple-100 text-purple-800',
      International: 'bg-red-100 text-red-800',
      Qualifier: 'bg-yellow-100 text-yellow-800',
      Tournament: 'bg-indigo-100 text-indigo-800',
      Continental: 'bg-pink-100 text-pink-800',
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Link href={`/competitions/${competition.slug}`}>
      <div className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 cursor-pointer group'>
        <div className='flex items-center gap-4'>
          {/* Logo */}
          <div className='flex-shrink-0 w-16 h-16 relative'>
            {competition.logo ? (
              <Image
                src={competition.logo}
                alt={competition.name}
                fill
                className='object-contain'
                sizes='64px'
              />
            ) : (
              <div className='w-full h-full bg-gray-200 rounded-lg flex items-center justify-center'>
                <svg
                  className='w-8 h-8 text-gray-400'
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

          {/* Competition Info */}
          <div className='flex-1 min-w-0'>
            <h3 className='font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1'>
              {competition.title}
            </h3>

            <div className='flex items-center gap-2 mt-1 flex-wrap'>
              {/* Type Badge */}
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeBadgeColor(
                  competition.type
                )}`}
              >
                {getTypeLabel(competition.type)}
              </span>

              {/* Country */}
              {competition.country && (
                <span className='text-xs text-gray-500 flex items-center gap-1'>
                  <svg
                    className='w-3 h-3'
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
                  {competition.country.name}
                </span>
              )}

              {/* Season */}
              <span className='text-xs text-gray-500'>
                {competition.season}
              </span>
            </div>
          </div>

          {/* Arrow Icon */}
          <div className='flex-shrink-0'>
            <svg
              className='w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
