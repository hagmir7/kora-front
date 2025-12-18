import FollowUs from '@/app/components/FollowUs'
import Newsletter from '@/components/Newsletter'
import PopularNews from '@/components/popular-news'
import MatchContent from '@/app/components/match-content'
import React from 'react'

export default async function Page({ params }) {
  const { slug } = await params

  return (
    <div className='pt-2 md:pt-5' dir='rtl'>
      <main className='flex flex-row relative xl:px-5 bg-gray-50 max-w-7xl mx-auto'>
        <section className='w-full lg:w-2/3 lg:pr-4'>
          {/* Champions League Section */}
          <div className='rounded-md md:mt-4 px-0 md:px-4'>
            <MatchContent slug={slug} />
          </div>
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
