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
    <Link href={`/competitions/${competition.slug}`} className='block h-full'>
      <div className='bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-3 cursor-pointer group border border-gray-100 hover:border-blue-200 h-full flex flex-col'>
        {/* Header Section */}
        <div className='flex items-start gap-4 mb-2'>
          {/* Logo */}
          <div className='flex-shrink-0 w-16 h-16 relative group-hover:scale-110 transition-transform duration-300'>
            {competition.logo ? (
              <div className='w-full h-full rounded-lg overflow-hidden bg-gray-50 p-2'>
                <Image
                  src={competition.logo}
                  alt={competition.name}
                  fill
                  className='object-contain rounded-lg'
                  sizes='64px'
                  unoptimized
                />
              </div>
            ) : (
              <div className='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center'>
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

          {/* Competition Title */}
          <div className='flex-1 min-w-0'>
            <h3 className='font-bold mb-1 text-sm md:text-base text-gray-900 group-hover:text-[#612d99] transition-colors line-clamp-2 leading-tight'>
              {competition.title}
            </h3>

            {/* Type Badge */}
            <div className='mt-3'>
              <span
                className={`inline-flex text-xs px-2.5 py-1 rounded-full font-semibold ${getTypeBadgeColor(
                  competition.type
                )}`}
              >
                {getTypeLabel(competition.type)}
              </span>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className='flex flex-col gap-2 mt-auto pt-3 border-t border-gray-100'>
          {/* Country */}
          {competition.country && (
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <svg
                className='w-4 h-4 text-gray-400 flex-shrink-0'
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
              <span className='truncate'>{competition.country.name}</span>
            </div>
          )}

          {/* Season and Arrow */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <svg
                className='w-4 h-4 text-gray-400 flex-shrink-0'
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

            {/* Arrow Icon */}
            <div className='flex-shrink-0 bg-gray-50 group-hover:bg-blue-50 rounded-full p-1.5 transition-colors'>
              <svg
                className='w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:-translate-x-0.5 transition-all'
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
      </div>
    </Link>
  )
}
