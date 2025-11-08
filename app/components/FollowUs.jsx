// FollowUs.jsx
import SocialMediaButton from './SocialMediaButton'
import { MessageCircle } from 'lucide-react'

// Brand icons
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaSnapchatGhost,
  FaYoutube,
} from 'react-icons/fa'
import { SiTiktok, SiThreads } from 'react-icons/si'

export default function FollowUs() {
  return (
    <div className='bg-white shadow-sm mb-4 rounded-[22px]'>
      <header className='bg-gradient-to-r from-purple-900 to-purple-700 text-white rounded-t-[22px] px-4 py-4'>
        <h1 className='text-lg font-semibold'>تابعونا</h1>
      </header>
      <div className='px-4 pb-5'>
        <div className='grid grid-cols-4 gap-4 pt-4'>
          <SocialMediaButton
            icon={<FaFacebookF className='w-5 h-5 text-blue-600' />}
            label='فيسبوك'
            href='https://www.facebook.com/beINSPORTS'
          />
          <SocialMediaButton
            icon={<FaTwitter className='w-5 h-5 text-black' />}
            label='X'
            href='https://twitter.com/beinsports'
          />
          <SocialMediaButton
            icon={<FaInstagram className='w-5 h-5 text-pink-500' />}
            label='إنستغرام'
            href='https://www.instagram.com/beinsports'
          />
          <SocialMediaButton
            icon={<SiTiktok className='w-5 h-5' />}
            label='تيك توك'
            href='https://www.tiktok.com/@beinsports'
          />
          <SocialMediaButton
            icon={<FaYoutube className='w-5 h-5 text-red-600' />}
            label='يوتيوب'
            href='https://www.youtube.com/user/beinsports'
          />
          <SocialMediaButton
            icon={<MessageCircle className='w-5 h-5 text-green-500' />}
            label='واتساب'
            href='https://whatsapp.com/channel/0029Va38OqH6rsQynsUKl90D'
          />
          <SocialMediaButton
            icon={<SiThreads className='w-5 h-5 text-gray-800' />}
            label='ثريدز'
            href='https://www.threads.net/@beinsports'
          />
          <SocialMediaButton
            icon={<FaSnapchatGhost className='w-5 h-5 text-yellow-400' />}
            label='سناب شات'
            href='https://www.snapchat.com/add/beinsports'
          />
        </div>
      </div>
    </div>
  )
}
