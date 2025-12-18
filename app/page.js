
import MatchCard from './components/MatchCard';
import Newsletter from '@/components/Newsletter';
import PopularNews from '@/components/popular-news';
import FollowUs from './components/FollowUs';


export default async function Home() {
  return (
    <div className="pt-2 md:pt-5" dir="rtl">
      <main className="flex flex-row relative xl:px-5 bg-gray-50 max-w-7xl mx-auto">
        {/* Main Content */}
        <section className="w-full lg:w-2/3 lg:pr-4">
          {/* Champions League Section */}
          <div className="rounded-md md:mt-4 px-0 md:px-4">
            <h1 className='px-2'>جدول مباريات اليوم</h1>
            <MatchCard />
          </div>
        </section>

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col lg:w-1/3 bg-gray-50">
          {/* Latest Blogs */}
          <PopularNews />
          {/* News letter */}
          <Newsletter />
          {/* Follow Us */}
          <FollowUs />
        </aside>
      </main>
    </div>
  );
}