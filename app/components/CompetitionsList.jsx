// components/CompetitionsList.jsx
'use client'

import CompetitionCard from '@/components/CompetitionCard'
import { api } from '@/lib/clientApi'
import { useState, useEffect } from 'react'

export default function CompetitionsList() {
  const [competitions, setCompetitions] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [types, setTypes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch competition types
  useEffect(() => {
    let mounted = true
    const fetchTypes = async () => {
      try {
        // Adjust endpoint if your API exposes types at a different route
        const res = await api.get('/competitions/types')
        if (!mounted) return
        setTypes(res.data || [])
      } catch (err) {
        console.error('Error fetching types:', err)
      }
    }

    fetchTypes()
    return () => {
      mounted = false
    }
  }, [])

  // Fetch competitions
  useEffect(() => {
    let mounted = true
    const fetchCompetitions = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = {
          page: currentPage,
          page_size: 12,
        }

        if (search) params.search = search
        if (selectedType) params.type = selectedType

        // If your api instance already sets baseURL to /api, use the path accordingly
        const res = await api.get('/competitions', { params })

        // adapt to your API shape
        const data = res.data

         setCompetitions(data || data)
         setPagination(data.pagination || null)

        if (!mounted) return


      } catch (err) {
        console.error('Error fetching competitions:', err)
        setError('فشل في تحميل البطولات')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchCompetitions()

    return () => {
      mounted = false
    }
  }, [currentPage, search, selectedType])

  const getTypeLabel = (type) => {
    const labels = {
      League: 'دوري',
      Cup: 'كأس',
      SuperCup: 'كأس السوبر',
      International: 'دولي',
      Qualifier: 'تصفيات',
      Tournament: 'بطولة',
      Continental: 'قاري',
      Playoff: 'ملحق',
      Friendly: 'ودية',
      Regional: 'إقليمي',
    }
    return labels[type] || type
  }

  return (
    <div className='space-y-4'>
      {/* Header */}
      <div className='bg-white rounded-lg shadow-sm p-4'>
        <h2 className='text-md md:text-lg font-bold text-gray-900 mb-4'>
          {' '}
          أهم بطولات كرة القدم
        </h2>

        {/* Filters */}
        <div className='flex flex-col sm:flex-row gap-3'>
          {/* Search */}
          <div className='flex-1'>
            <input
              type='text'
              placeholder='ابحث عن بطولة...'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value)
              setCurrentPage(1)
            }}
            className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value=''>جميع الأنواع</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {getTypeLabel(type)}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        {pagination && (
          <p className='text-sm text-gray-500 mt-3'>
            عرض {competitions.length} من {pagination.total_items} بطولة
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className='text-center py-12'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          <p className='mt-4 text-gray-600'>جاري التحميل...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-center'>
          <p className='text-red-800'>{error}</p>
        </div>
      )}

      {/* Competitions Grid */}
      {!loading && !error && (
        <>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {competitions.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} />
            ))}
          </div>

          {/* Empty State */}
          {competitions.length === 0 && (
            <div className='text-center py-12 bg-white rounded-lg'>
              <svg
                className='mx-auto h-12 w-12 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <h3 className='mt-2 text-lg font-medium text-gray-900'>
                لا توجد بطولات
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                جرب البحث بكلمات أخرى
              </p>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <div className='flex justify-center items-center gap-2 mt-6'>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={!pagination.has_previous}
                className='px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                السابق
              </button>

              <span className='text-sm text-gray-600'>
                صفحة {pagination.current_page} من {pagination.total_pages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={!pagination.has_next}
                className='px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                التالي
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
