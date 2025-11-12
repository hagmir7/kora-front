'use client'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { X } from 'lucide-react'
import MatchScoreboard from './MatchScoreboard'

export default function MatchModalView({ open, setOpen, teams }) {
  const [matchData, setMatchData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!teams?.match_id) return

    setLoading(true)
    setError(null)

    async function fetchMatch() {
      try {
        const response = await fetch(
          `https://jdwel.com/wp-json/jmanager/web/v1/match/${teams.match_id}`
        )
        if (!response.ok) throw new Error('Failed to fetch match data')

        const data = await response.json()
        console.log(data)

        setMatchData(data?.data || null)
      } catch (err) {
        console.error('Error fetching match details:', err)
        setError('حدث خطأ أثناء تحميل تفاصيل المباراة')
      } finally {
        setLoading(false)
      }
    }

    fetchMatch()
  }, [teams?.match_id])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-3xl w-full rounded-3xl p-0 bg-gradient-to-br from-gray-50 to-white gap-0 shadow-xl border border-gray-200 overflow-hidden [&>button]:hidden'>
        {/* Custom Close Button */}
        <div
          onClick={() => setOpen(false)}
          className='absolute right-4 cursor-pointer top-4 z-50 rounded-full p-2 bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 group'
          aria-label='إغلاق'
        >
          <X className='h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors' />
        </div>

        {/* Accessible title (visually hidden) */}
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>تفاصيل المباراة</DialogTitle>
            <DialogDescription>
              تفاصيل الوقت والنتيجة وإحصاءات المباراة.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        {loading ? (
          <div className='flex items-center justify-center h-64 text-gray-400 text-sm animate-pulse'>
            جاري تحميل تفاصيل المباراة...
          </div>
        ) : error ? (
          <div className='flex items-center justify-center h-64 text-red-500 font-medium'>
            {error}
          </div>
        ) : matchData ? (
          <MatchScoreboard matchData={matchData} teams={teams} />
        ) : (
          <div className='flex items-center justify-center h-64 text-gray-500'>
            لا توجد بيانات متاحة حاليًا
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
