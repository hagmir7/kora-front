'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'
import { X, Search } from 'lucide-react'
import { api } from '@/lib/clientApi' // make sure this exists
import { useRouter } from 'next/navigation'

const MobileSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)
  const debounceRef = useRef(null)
  const router = useRouter()

  // focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 80)
    } else {
      // reset when closed
      setQuery('')
      setResults([])
      setLoading(false)
      setError(null)
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
    }
  }, [isOpen])

  const fetchResults = useCallback(async (q) => {
    setLoading(true)
    setError(null)
    try {
      const qenc = encodeURIComponent(q)
      let res = await api.get(`/competitions?search=${qenc}`)
      let data = res?.data || []

      // fallback to `query` param if no items (some backends expect different param)
      if ((!data || data.length === 0) && q.trim().length > 0) {
        const res2 = await api.get(`/competitions?query=${qenc}`)
        data = res2?.data || []
      }

      // support paginated responses (DRF) and plain arrays
      if (data && Array.isArray(data)) {
        setResults(data)
      } else if (data && data.results && Array.isArray(data.results)) {
        setResults(data.results)
      } else {
        setResults([])
      }
    } catch (err) {
      console.error('Mobile search error', err)
      setError('حدث خطأ أثناء البحث')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  // debounce query changes
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([])
      setLoading(false)
      setError(null)
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchResults(query.trim())
    }, 350)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, fetchResults])

  const onSelect = (item) => {
    onClose()
    setQuery('')
    setResults([])
    const slug = item.slug || item.id
    router.push(`/competitions/${slug}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className='fixed inset-0 bg-black z-30'
            onClick={onClose}
            aria-hidden='true'
          />

          {/* Search panel */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            className='fixed top-0 left-0 w-full bg-white z-40 p-4'
            dir='rtl'
            role='dialog'
            aria-modal='true'
            aria-label='بحث'
          >
            <div className='flex items-center gap-3'>
              <div className='flex-1'>
                <div className='flex items-center gap-2 border border-gray-300 rounded-lg px-3'>
                  <Search className='text-[#5C2D91] w-5 h-5' />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type='text'
                    placeholder='ابحث هنا عن فريق، بطولة، لاعب...'
                    className='w-full py-2 text-right outline-none text-base'
                    aria-label='ابحث'
                    onKeyDown={(e) => {
                      // allow Enter to select first result quickly
                      if (e.key === 'Enter' && results.length > 0) {
                        e.preventDefault()
                        onSelect(results[0])
                      } else if (e.key === 'Escape') {
                        onClose()
                      }
                    }}
                  />
                  {query.length > 0 && (
                    <button
                      onClick={() => {
                        setQuery('')
                        setResults([])
                        setError(null)
                        inputRef.current?.focus()
                      }}
                      aria-label='مسح'
                      className='p-1'
                    >
                      <X className='w-4 h-4 text-gray-400' />
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={onClose}
                className='text-[#5C2D91] font-medium'
                aria-label='إغلاق البحث'
              >
                إغلاق
              </button>
            </div>

            {/* Results container */}
            <div className='mt-3'>
              {loading && (
                <div className='text-sm text-right text-gray-500'>
                  جاري البحث...
                </div>
              )}

              {error && (
                <div className='text-sm text-right text-red-500 mt-2'>
                  {error}
                </div>
              )}

              {!loading && !error && results.length > 0 && (
                <ul className='divide-y divide-gray-100 rounded-md overflow-hidden max-h-[60vh] overflow-y-auto'>
                  {results.map((item) => {
                    const title =
                      item.title || item.name || item.slug || `#${item.id}`
                    return (
                      <li
                        key={item.id ?? item.slug ?? title}
                        onClick={() => onSelect(item)}
                        className='p-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-50'
                      >
                        <div className='flex flex-col items-end text-right'>
                          <span className='truncate font-medium'>{title}</span>
                          {item.country?.name && (
                            <span className='text-xs text-gray-400 mt-1'>
                              {item.country.name}
                            </span>
                          )}
                        </div>

                        {/* optional small meta on left */}
                        {item.season && (
                          <div className='text-xs text-gray-400 whitespace-nowrap'>
                            {item.season}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}

              {!loading &&
                query.length > 0 &&
                results.length === 0 &&
                !error && (
                  <div className='text-sm text-right text-gray-500 mt-2'>
                    لا توجد نتائج
                  </div>
                )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileSearch
