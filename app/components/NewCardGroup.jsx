'use client'
import React, { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

const NewsCard = ({ title, category, image, link }) => (
  <a
    href={link}
    className='w-[250px] h-[230px] border border-gray-200 shrink-0 bg-gray-200 flex flex-col rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow'
  >
    <div className='relative w-[250px] h-[140px] flex-none group'>
      <img
        src={image}
        alt={title}
        className='absolute inset-0 w-full h-full object-cover'
        width={'250px'}
        height={'140px'}
      />
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='w-8 h-8 rounded-full bg-black/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-black/50 transition-colors'>
          <Play className='w-4 h-4 text-white fill-white' />
        </div>
      </div>
    </div>
    <div className='p-2.5 flex flex-col bg-white flex-1 gap-1.5'>
      <span className='text-xs font-semibold text-purple-800 line-clamp-2 break-words'>
        {category}
      </span>
      <span className='text-sm font-semibold line-clamp-2 break-words'>
        {title}
      </span>
    </div>
  </a>
)

export default function NewsCardGroup() {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const newsItems = [
    {
      title: 'التعادل يخيّم على مواجهة قطر وجنوب إفريقيا',
      category: 'كأس العالم تحت 17 سنة FIFA قطر 2025™',
      image:
        'https://prod-media.beinsports.com/image/%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D8%AF%D9%84%20%D9%8A%D8%AE%D9%8A%D9%91%D9%85%20%D8%B9%D9%84%D9%89%20%D9%85%D9%88%D8%A7%D8%AC%D9%87%D8%A9%20%D9%82%D8%B7%D8%B1%20%D9%88%D8%AC%D9%86%D9%88%D8%A8%20%D8%A5%D9%81%D8%B1%D9%8A%D9%82%D9%8A%D8%A7.640.jpg',
      link: '#',
    },
    {
      title: 'المنتخب الكرواتي يتخطّى نظيره الإماراتي بثلاثية',
      category: 'كأس العالم تحت 17 سنة FIFA قطر 2025™',
      image:
        'https://prod-media.beinsports.com/image/%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AE%D8%A8%20%D8%A7%D9%84%D9%83%D8%B1%D9%88%D8%A7%D8%AA%D9%8A%20%D9%8A%D8%AA%D8%AE%D8%B7%D9%91%D9%89%20%D9%86%D8%B8%D9%8A%D8%B1%D9%87%20%D8%A7%D9%84%D8%A5%D9%85%D8%A7%D8%B1%D8%A7%D8%AA%D9%8A%20%D8%A8%D8%AB%D9%84%D8%A7%D8%AB%D9%8A%D8%A9.640.jpg',
      link: '#',
    },
    {
      title: 'المنتخب الأرجنتيني يتغلب بصعوبة على نظيره التونسي',
      category: 'كأس العالم تحت 17 سنة FIFA قطر 2025™',
      image:
        'https://prod-media.beinsports.com/image/%D8%AA%D9%88%D9%86%D8%B3%20%D9%88%D8%A7%D9%84%D8%A3%D8%B1%D8%AC%D9%86%D8%AA%D9%8A%D9%86.640.jpg',
      link: '#',
    },
    {
      title: 'المنتخب البرتغالي يفوز على نظيره المنتخب المغربي',
      category: 'كأس العالم تحت 17 سنة FIFA قطر 2025™',
      image:
        'https://prod-media.beinsports.com/image/1762439996358_655b0c0f-69cd-41ea-bf63-6b676a7e1496.640.png',
      link: '#',
    },
    {
      title: 'ريال مدريد يتعرّض لضربة موجعة',
      category: 'دوري أبطال أوروبا',
      image:
        'https://prod-media.beinsports.com/image/Aur%C3%A9lien%20Tchouameni.640.png',
      link: '#',
    },
    {
      title: 'شاهد ما حدث بين النيجيري لوكمان ومدرب أتالانتا؟',
      category: 'دوري أبطال أوروبا',
      image:
        'https://prod-media.beinsports.com/image/%D9%84%D9%88%D9%83%D9%85%D8%A7%D9%86.640.png',
      link: '#',
    },
  ]

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll)
      return () => scrollElement.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 270
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className='bg-white shadow-sm mb-4 lg:rounded-[22px] font-sans'>
      {/* Header */}
      <header
        className='h-10 lg:h-14 px-4 lg:px-4 lg:py-4 flex items-center relative bg-cover bg-center bg-no-repeat gap-1.5 lg:rounded-t-[22px] text-white'
        style={{
          backgroundImage:
            'url("https://prod-media.beinsports.com/image/hero_editorial_background.webp")',
          transform: 'scaleX(-1)',
        }}
      >
        <div
          className='flex gap-1.5 lg:gap-2.5 items-center truncate w-full'
          style={{ transform: 'scaleX(-1)' }}
        >
          <h1 className='text-sm lg:text-2xl font-semibold whitespace-nowrap truncate'>
            كرة القدم
          </h1>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className='flex items-center justify-start relative w-full py-1 px-2'>
        <div className='flex items-center bg-inherit overflow-hidden relative w-full'>
          {/* Left Arrow */}
          {canScrollLeft && (
            <div
              className='absolute z-30 left-0 items-center h-full pb-2 hidden lg:flex bg-white pr-2'
              style={{ boxShadow: 'rgba(255, 255, 255, 0.99) 4px 3px 5px 4px' }}
            >
              <button
                onClick={() => scroll('left')}
                className='rounded-full focus:outline-none hover:opacity-70 transition-opacity'
                aria-label='Scroll Left'
              >
                <ChevronLeft
                  className='w-5 h-5 text-purple-800'
                  strokeWidth={2}
                />
              </button>
            </div>
          )}

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className='flex overflow-x-scroll scrollbar-hide scroll-smooth p-2'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className='flex pb-0 gap-2 lg:gap-6 ml-8'>
              {newsItems.map((item, idx) => (
                <NewsCard key={idx} {...item} />
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <div
              className='absolute z-30 left-0 items-center h-full pb-2 hidden lg:flex bg-white px-2'
              style={{
                boxShadow: 'rgba(255, 255, 255, 0.99) -4px 3px 5px 4px',
              }}
            >
              <button
                onClick={() => scroll('left')}
                className='rounded-full focus:outline-none hover:opacity-70 transition-opacity cursor-pointer'
                aria-label='Scroll Right'
              >
                <ChevronLeft
                  className='w-6 h-6 text-purple-800 z-30'
                  strokeWidth={3}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
