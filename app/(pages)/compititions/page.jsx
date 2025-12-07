import CompetitionsList from '@/app/components/CompetitionsList'
import FollowUs from '@/app/components/FollowUs'
import NewsContainer from '@/app/components/NewsContainer'
import Newsletter from '@/components/Newsletter'
import PopularNews from '@/components/popular-news'


export default function Home() {

  return (
    <div className='bg-gray-50 min-h-screen font-sans pt-5' dir='rtl'>
      <main className='flex flex-row relative xl:px-5 bg-gray-50 max-w-7xl mx-auto'>
        <section className='w-full lg:w-2/3 lg:pr-4'>
          <div className='rounded-md px-4'>
            <CompetitionsList />
          </div>
        </section>

        <aside className='hidden lg:flex flex-col lg:w-1/3 bg-gray-50'>
          <PopularNews />

          <Newsletter />

          {/* Follow Us */}
          <FollowUs />
        </aside>
      </main>
    </div>
  )
}
