// FollowUs.jsx
import SocialMediaButton from './SocialMediaButton'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa'
import { SiTiktok } from 'react-icons/si'

export default function FollowUs() {
  return (
    <div className='bg-white shadow-sm mb-4 rounded-[22px]'>
      <header className='bg-gradient-to-r from-purple-900 to-purple-700 text-white rounded-t-[22px] px-4 py-4'>
        <h2 className='text-lg font-semibold'>تـــابعونا  عـــلـــى</h2>
      </header>

      <div className='px-4 pb-5'>
        <div className='grid grid-cols-4 gap-4 pt-4'>
          {/* FACEBOOK */}
          <SocialMediaButton
            icon={<FaFacebookF className='icon-base text-blue-600' />}
            label='فيسبوك'
            href='https://www.facebook.com/koratab'
          />

          {/* TWITTER / X */}
          <SocialMediaButton
            icon={<FaTwitter className='icon-base text-black' />}
            label='إكس'
            href='https://twitter.com/koratab'
          />

          {/* INSTAGRAM */}
          <SocialMediaButton
            icon={<FaInstagram className='icon-base text-pink-500' />}
            label='إنستغرام'
            href='https://www.instagram.com/koratab'
          />

          {/* TIKTOK */}
          <SocialMediaButton
            icon={<SiTiktok className='icon-base text-black' />}
            label='تيك توك'
            href='https://www.tiktok.com/@koratab'
          />

        
        </div>
      </div>
    </div>
  )
}
