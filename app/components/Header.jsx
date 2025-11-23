'use client'
import { useState } from 'react'
import { Menu, X, Search, Home, Newspaper, Crown } from 'lucide-react'
import { FaFootballBall } from 'react-icons/fa'
import Link from 'next/link'
import MobileMenu from './MobileMenu'
import MobileSearch from './MobileSearch'


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navItems = [
    {
      id: 'home',
      label: 'الرئيسية',
      href: '/',
      icon: <Home size={20} className='text-[#5C2D91]' />,
    },
    {
      id: 'todya',
      label: 'مباريات اليوم',
      icon: <FaFootballBall size={20} className='text-[#5C2D91]' />,
      href: '/today-matchs',
    },
    {
      id: 'news',
      label: 'أخبار الرياضة',
      href: '/news',
      icon: <Newspaper size={20} className='text-[#5C2D91]' />,
    },

    {
      id: 'news',
      label: 'بطولات',
      href: '/news',
      icon: <Crown size={20} className='text-[#5C2D91]' />,
    },
  ]

  return (
    <header className='sticky top-0 shadow-sm z-[100]'>
      <nav className='bg-white relative z-10'>
        <div className='flex safe-pt-2 items-center justify-between md:py-2.5 md:safe-pt-2.5 px-3 md:safe-h-[46px] lg:px-[3rem] xl:px-[8.75rem]'>
          <div className='flex w-full h-[50px] justify-between items-center'>
            {/* Mobile Back Button */}
            <div className='content-center flex lg:hidden gap-x-3 md:gap-x-0'>
              <button
                type='button'
                aria-label='icon back'
                className='w-6 h-6 items-center justify-center flex'
              >
                <div className='transition-all ease-in-out delay-400 rtl:-scale-x-100'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='9.608'
                    height='17.5'
                    viewBox='0 0 9.608 17.5'
                    className='fill-[#5C2D91]'
                  >
                    <path
                      d='M23.928,12.424l7.28-7.281a.858.858,0,1,0-1.214-1.214l-7.884,7.883,0,0a.86.86,0,0,0,0,1.214l0,0,7.884,7.883A.858.858,0,1,0,31.208,19.7Z'
                      transform='translate(-21.856 -3.674)'
                      fillRule='evenodd'
                    />
                  </svg>
                </div>
              </button>
              <div className='md:hidden relative w-6 h-6'></div>
            </div>

            {/* Logo and Navigation */}
            <div className='flex justify-start items-center'>
              <Link
                className='flex relative h-8 w-32 ltr:md:mr-8 rtl:md:ml-8 gap-x-8 lg:w-36 ltr:xl:mr-[34px] rtl:xl:ml-[34px]'
                href='/'
              >
                <div className='relative w-full h-full'>
                  <div className='absolute inset-0 flex items-center justify-start'>
                    <span className='text-[#5C2D91] font-bold text-2xl'>
                      كــــــوراتـاب
                    </span>
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className='hidden sm:h-fit sm:max-h-fit h-[86px] gap-x-8 max-h-[86px] bg-white justify-between p-0 z-0 lg:flex lg:p-0 lg:z-0'>
                {navItems.map((item) => (
                  <div
                    key={item.id}
                    className='relative flex lg:flex min-h-8 p-1.5 ltr:last:mr-0 rtl:last:ml-0'
                  >
                    <Link
                      className='flex'
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      <div className='flex flex-col items-center justify-center gap-y-1 lg:flex-row'>
                        <div className='flex items-center justify-center w-[33px] h-[33px] lg:w-5 lg:h-5 lg:mb-0 ltr:lg:mr-3 rtl:lg:ml-3'>
                          <span className='text-xl'>{item.icon}</span>
                        </div>
                        <span className='w-12 truncate font-medium text-[10px] text-center whitespace-nowrap lg:text-[14px] rtl:lg:text-[16px] lg:leading-4 lg:w-auto lg:font-medium lg:uppercase text-gray-500 lg:text-[#5C2D91]'>
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className='flex justify-end items-center md:flex-1 gap-x-3 lg:gap-x-[30px]'>
              {/* Desktop Search */}
              <button className='text-[#5C2D91] hidden md:block w-6 h-6'>
                <Search className='w-6 h-6' />
              </button>

              {/* Language Switcher */}
              <div className='relative hidden w-6 h-6 md:block text-[#A0A0A0] font-bold hover:text-[#5C2D91]'>
                <button className='w-6 h-6'>
                  <span className='w-6 h-6'>EN</span>
                </button>
              </div>

              {/* Mobile Search */}
              {/* Mobile Search */}
              <button
                className='md:hidden focus:outline-none'
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className='w-6 h-6 text-[#5C2D91]' />
              </button>

              <MobileSearch
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
              />

              {/* Mobile Menu Toggle */}
              <div className='flex content-center'>
                <button
                  type='button'
                  className='w-6 h-6 items-center justify-center flex'
                  aria-label='Open Menu Icon'
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className='w-6 h-6 text-[#5C2D91]' />
                  ) : (
                    <Menu className='w-6 h-6 text-[#5C2D91]' />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className='lg:bg-black/[.7] transition ease-in-out delay-150 w-screen h-screen fixed inset-0 z-10'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <MobileMenu
        navItems={navItems}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  )
}

export default Header
