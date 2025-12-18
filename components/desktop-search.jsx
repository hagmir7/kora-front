'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { api } from '@/lib/clientApi'
import { useRouter } from 'next/navigation'

export default function DesktopSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const ref = useRef(null)
  const debounceRef = useRef(null)
  const router = useRouter()

  // Close search input when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // clear results when query empty
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([])
      setError(null)
      setLoading(false)
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
    }
  }, [query])

  const fetchResults = useCallback(async (q) => {
    setLoading(true)
    setError(null)
    try {
      const qenc = encodeURIComponent(q)
      let res = await api.get(`/competitions?search=${qenc}`)
      let data = res?.data || []

      if ((!data || data.length === 0) && q.trim().length > 0) {
        const res2 = await api.get(`/competitions?query=${qenc}`)
        data = res2?.data || []
      }

      setResults(Array.isArray(data) ? data : data.results ?? [])
    } catch (err) {
      console.error('Search error', err)
      setError('حدث خطأ أثناء البحث')
      setResults([])
    } finally {
      setLoading(false)
      setActiveIndex(-1)
    }
  }, [])

  // Debounced search API call
  useEffect(() => {
    if (query.trim().length === 0) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchResults(query.trim())
    }, 350)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, fetchResults])

  // keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (!open) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && results[activeIndex]) {
          const item = results[activeIndex]
          setOpen(false)
          setQuery('')
          router.push(`/competitions/${item.slug || item.id}`)
        }
      } else if (e.key === 'Escape') {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, activeIndex, router])

  const onSelect = (item) => {
    setOpen(false)
    setQuery('')
    setResults([])
    setActiveIndex(-1)
    router.push(`/competitions/${item.slug || item.id}`)
  }

  return (
    <div className='relative' ref={ref} dir='rtl'>
      {/* Search Icon */}
      <button
        onClick={() => {
          setOpen((prev) => !prev)
          if (!open) {
            setActiveIndex(-1)
          }
        }}
        className='text-[#5C2D91] hidden md:block w-6 h-6'
        aria-expanded={open}
        aria-label='فتح البحث'
      >
        <Search className='w-6 h-6' />
      </button>

      {/* Search Input */}
      {open && (
        <div className='absolute left-0 top-8 bg-white shadow-xl p-3 rounded-xl w-80 z-50 border border-gray-200'>
          {/* Input field */}
          <div className='flex flex-row-reverse items-center gap-2 border border-gray-300 rounded-lg px-2'>
            <Search className='text-[#5C2D91] w-5 h-5' />
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='ابحث عن فريق، بطولة، لاعب...'
              className='w-full py-2 outline-none text-sm text-right'
              autoFocus
              aria-label='ابحث'
            />
            <button
              onClick={() => {
                setQuery('')
                setResults([])
                setError(null)
                setActiveIndex(-1)
              }}
              aria-label='مسح البحث'
            >
              <X className='text-gray-400 w-4 h-4' />
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className='mt-2 text-sm text-right text-gray-500'>
              جاري البحث...
            </div>
          )}

          {/* Error */}
          {error && (
            <div className='mt-2 text-sm text-right text-red-500'>{error}</div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <ul className='mt-2 bg-white border border-gray-200 rounded-lg max-h-64 overflow-y-auto text-right'>
              {results.map((item, idx) => {
                const title =
                  item.title || item.name || item.slug || `#${item.id}`
                const isActive = idx === activeIndex
                return (
                  <li
                    key={item.id ?? item.slug ?? idx}
                    className={`p-2 text-sm cursor-pointer flex items-center justify-between ${
                      isActive ? 'bg-gray-100' : ''
                    }`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => onSelect(item)}
                  >
                    <div className='truncate text-right'>{title}</div>
                    {/* optional small meta on left */}
                    {item.country?.name && (
                      <div className='text-xs text-gray-400 ml-3 whitespace-nowrap'>
                        {item.country.name}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}

          {/* No results */}
          {!loading && query.length > 0 && results.length === 0 && !error && (
            <div className='text-gray-500 text-sm mt-2 text-right'>
              لا توجد نتائج
            </div>
          )}
        </div>
      )}
    </div>
  )
}
