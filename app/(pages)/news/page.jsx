import FollowUs from '@/app/components/FollowUs'
import NewsContainer from '@/app/components/NewsContainer'
import NewsCardGroup from '@/app/components/NewsContainer'
import VideoCard from '@/app/components/VideoCard'
import Newsletter from '@/components/Newsletter'
import { ChevronDown } from 'lucide-react'

export default function Home() {
  // const [selectedDate, setSelectedDate] = useState('today');

  const videos = [
    {
      title: 'انتقال ملكية استاد سان سيرو إلى ميلان وإنتر',
      description:
        'انتقلت اليوم الأربعاء ملكية استاد سان سيرو والمنطقة المحيطة به رسمياً لناديي ميلان وإنتر.',
      time: '14:45',
      thumbnail: '/api/placeholder/158/90',
    },
    {
      title: 'جون ماكغين يواصل مشواره مع أستون فيلا حتى عام 2028',
      description:
        'أعلن أستون فيلا اليوم الأربعاء تجديد عقد لاعبه جون ماكغين حتى عام 2028.',
      time: '14:35',
      thumbnail: '/api/placeholder/158/90',
    },
    {
      title: 'برشلونة ضيفاً على كلوب بروج',
      description:
        'ينزل برشلونة ضيفاً على كلوب بروج في مباراة صعبة ضمن مواجهات الجولة الرابعة.',
      time: '10:22',
      thumbnail: '/api/placeholder/158/90',
    },
  ]

  return (
    <div className='bg-gray-50 min-h-screen font-sans pt-5' dir='rtl'>
      <main className='flex flex-row relative xl:px-5 bg-gray-50 max-w-7xl mx-auto'>
        <section className='w-full lg:w-2/3 lg:pr-4'>
          <div className='rounded-md px-4'>
            <NewsContainer />
          </div>
        </section>

        <aside className='hidden lg:flex flex-col lg:w-1/3 bg-gray-50'>
          <div className='bg-white shadow-sm mb-4 rounded-[22px]'>
            <header
              style={{
                backgroundImage:
                  'url(https://prod-media.beinsports.com/image/hero_editorial_background.png)',
              }}
              className='bg-gradient-to-r from-purple-900 to-purple-700 text-white rounded-t-[22px] px-4 py-4'
            >
              <h2 className='text-lg font-semibold'>أحدث مقاطع الفيديو</h2>
            </header>
            <div className='px-4 pt-2'>
              {videos.map((video, idx) => (
                <VideoCard key={idx} {...video} />
              ))}
              <div className='pt-2 pb-4'>
                <button className='flex items-center text-purple-700 font-medium'>
                  <span>أظهر المزيد</span>
                  <ChevronDown className='mr-1 w-4 h-4' />
                </button>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <Newsletter />

          {/* Follow Us */}
          <FollowUs />
        </aside>
      </main>
    </div>
  )
}
