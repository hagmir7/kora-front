'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const MobileSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const searchInput = useRef(null)

  useEffect(() => {
    if (isOpen && searchInput.current) {
      searchInput.current.focus() // call focus as a function
    }
  }, [isOpen]) // focus when panel opens

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

          {/* Search panel */}
          <motion.div
            initial={{ y: '-100%' }} // slide down from top
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className='fixed top-0 left-0 w-full bg-white z-20 p-4 flex items-center gap-3'
            dir='rtl'
          >
            <input
              type='text'
              value={query}
              ref={searchInput}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='ابحث هنا...'
              className='flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#5C2D91]'
            />
            <button className='text-[#5C2D91] font-bold' onClick={onClose}>
              إغلاق
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileSearch
