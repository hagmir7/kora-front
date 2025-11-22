'use client'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const MobileMenu = ({ navItems, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 bg-black z-10'
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            initial={{ x: '100%' }} // start off-screen right
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className='fixed top-0 right-0 w-64 h-screen bg-white shadow-lg z-20 p-4 flex flex-col gap-4'
            dir='rtl'
          >
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className='flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors'
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={onClose}
              >
                <span className='text-2xl'>{item.icon}</span>
                <span className='text-[#5C2D91] font-medium'>{item.label}</span>
              </Link>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
