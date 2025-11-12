import React from 'react'

const Sketelon = () => {
  return (
    <div className='pb-8'>
      {[1, 2].map((section) => (
        <div key={section} className='rounded-md md:mt-4 px-4'>
          {/* Competition name skeleton */}
          <div className='h-4 w-48 bg-gray-200 rounded animate-pulse mb-2'></div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            {[1, 2, 3, 4].map((card) => (
              <div
                key={card}
                className='mt-1.5 p-[1px] rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300'
              >
                <div className='relative bg-white rounded-2xl h-[88px] p-2'>
                  <div className='h-full flex flex-row justify-between items-center animate-pulse'>
                    {/* Home Team Skeleton */}
                    <div className='flex w-2/5 flex-row justify-end items-center'>
                      <div className='flex flex-col items-center w-20'>
                        <div className='w-10 h-10 bg-gray-200 rounded-full'></div>
                        <div className='mt-1.5 h-3 w-16 bg-gray-200 rounded'></div>
                      </div>
                      <div className='flex w-9 justify-center'>
                        <div className='h-8 w-6 bg-gray-200 rounded'></div>
                      </div>
                    </div>

                    {/* Status Skeleton */}
                    <div className='flex flex-col justify-center items-center w-1/3'>
                      <div className='h-4 w-12 bg-gray-200 rounded'></div>
                    </div>

                    {/* Away Team Skeleton */}
                    <div className='flex w-2/5 flex-row-reverse justify-end items-center'>
                      <div className='flex flex-col items-center w-20'>
                        <div className='w-10 h-10 bg-gray-200 rounded-full'></div>
                        <div className='mt-1.5 h-3 w-16 bg-gray-200 rounded'></div>
                      </div>
                      <div className='flex w-9 justify-center'>
                        <div className='h-8 w-6 bg-gray-200 rounded'></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Sketelon
