'use client'

import Image from 'next/image'
import React, { useEffect, useState, useCallback } from 'react'

/* ----------------------------------
 Helpers
-----------------------------------*/
function formatDateTime(dtString) {
  if (!dtString) return '-'
  try {
    const d = new Date(dtString)
    return d.toLocaleString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return dtString
  }
}

function getEventIcon(type) {
  return (
    {
      goal: '⚽',
      yellowcard: '🟨',
      redcard: '🟥',
      substitution: '🔄',
      var: '📺',
      penalty: '🥅',
      pen_shootout_goal: '⚽',
      pen_shootout_miss: '❌',
    }[type] || '•'
  )
}

function getEventLabel(type) {
  return (
    {
      goal: 'هدف',
      yellowcard: 'بطاقة صفراء',
      redcard: 'بطاقة حمراء',
      substitution: 'تبديل',
      var: 'حكم الفيديو',
      penalty: 'ركلة جزاء',
      pen_shootout_goal: 'ركلة ترجيح - هدف',
      pen_shootout_miss: 'ركلة ترجيح - ضائعة',
    }[type] || type
  )
}

function getStatusStyle(status) {
  const s = status?.toLowerCase() || ''
  if (s === 'live' || s === 'et' || s === 'pen_live')
    return 'bg-red-500 text-white'
  if (s === 'ft' || s === 'finished' || s === 'ft_pen')
    return 'bg-slate-600 text-white'
  if (s === 'ht') return 'bg-orange-500 text-white'
  return 'bg-blue-500 text-white'
}

function getStatusLabel(status) {
  return (
    {
      live: 'مباشر',
      FT: 'انتهت',
      FT_PEN: 'انتهت (ركلات الترجيح)',
      ET: 'الوقت الإضافي',
      AET: 'انتهت بعد الوقت الإضافي',
      HT: 'الشوط الأول',
      PEN_LIVE: 'ركلات الترجيح',
      NS: 'لم تبدأ',
      ABAN: 'أُلغيت المباراة',
    }[status] || status
  )
}



function getTimeRemaining(startTime) {
  if (!startTime) return null

  const now = new Date()
  const start = new Date(startTime)
  const diff = start - now

  if (diff <= 0) return null

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, total: diff }
}

function getEventColor(type) {
  const colors = {
    goal: 'bg-green-50 border-green-200 hover:border-green-300',
    yellowcard: 'bg-yellow-50 border-yellow-200 hover:border-yellow-300',
    redcard: 'bg-red-50 border-red-200 hover:border-red-300',
    substitution: 'bg-blue-50 border-blue-200 hover:border-blue-300',
    var: 'bg-purple-50 border-purple-200 hover:border-purple-300',
    penalty: 'bg-orange-50 border-orange-200 hover:border-orange-300',
    pen_shootout_goal:
      'bg-emerald-50 border-emerald-200 hover:border-emerald-300',
    pen_shootout_miss: 'bg-rose-50 border-rose-200 hover:border-rose-300',
  }
  return colors[type] || 'bg-gray-50 border-gray-200 hover:border-gray-300'
}

/* ----------------------------------
 Mapper (Local API → View Model)
-----------------------------------*/
function mapLocalMatchToView(match) {
  if (!match) return null

  return {
    match_id: match.id,
    match_status: match.status,
    view_status: match.status,

    start_time: match.date_time,
    minute: null,

    hometeam_id: match.home_team?.id,
    hometeam_name: match.home_team?.name,
    hometeam_name_ar: match.home_team?.name,
    hometeam_score: match.home_score ?? 0,
    home_logo: match.home_team?.logo_url,

    awayteam_id: match.away_team?.id,
    awayteam_name: match.away_team?.name,
    awayteam_name_ar: match.away_team?.name,
    awayteam_score: match.away_score ?? 0,
    away_logo: match.away_team?.logo_url,

    venue_name: match.venue ?? '-',
    venue_name_ar: match.venue ?? '-',

    stagename: match.competition?.name,
    stagename_ar: match.competition?.title,

    competition: match.competition,

    events: [],
    tv_stations: [],
    has_pen: '0',
    home_pen: '0',
    away_pen: '0',
  }
}

/* ----------------------------------
 Component
-----------------------------------*/
export default function MatchContent({ slug }) {
  const [matchData, setMatchData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [countdown, setCountdown] = useState(null)

  const fetchMatch = useCallback(async () => {
    if (!slug) return

    setLoading(true)
    setError(null)

    try {
      // 1️⃣ Local API
      const localRes = await fetch(`http://localhost:8000/api/matches/${slug}`)

      if (!localRes.ok) {
        throw new Error('فشل في جلب بيانات المباراة')
      }

      const localData = await localRes.json()
      const baseMatch = mapLocalMatchToView(localData)

      // 2️⃣ Live Updates (jdwel)
      let updates = null
      try {
        const upRes = await fetch(
          `https://jdwel.com/wp-json/jmanager/web/v1/match/${slug}`
        )
        if (upRes.ok) {
          const upJson = await upRes.json()
          updates = upJson?.data
        }
      } catch {
        console.warn('Live updates unavailable')
      }

      // 3️⃣ Merge
      const merged = {
        ...baseMatch,
        ...(updates ?? {}),
        events: updates?.events ?? [],
        tv_stations: updates?.tv_stations ?? [],
      }

      setMatchData(merged)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    fetchMatch()
  }, [fetchMatch])

  // Auto refresh for live matches
  useEffect(() => {
    if (!matchData) return
    const s = matchData.match_status?.toLowerCase() || ''
    const isLive = s === 'live' || s === 'et' || s === 'pen_live'
    if (!isLive) return

    const i = setInterval(fetchMatch, 30000)
    return () => clearInterval(i)
  }, [matchData, fetchMatch])

  // Countdown timer for upcoming matches
  useEffect(() => {
    if (!matchData || matchData.match_status !== 'NS') return

    const updateCountdown = () => {
      const remaining = getTimeRemaining(matchData.start_time)
      setCountdown(remaining)
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [matchData])

  /* ----------------------------------
 UI States
-----------------------------------*/
  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='text-center'>
          <div className='w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3'></div>
          <p className='text-slate-600 text-sm'>جارٍ التحميل...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='bg-white border border-red-200 rounded-lg p-6 text-center max-w-md mx-auto shadow-sm'>
        <div className='text-5xl mb-3'>⚠️</div>
        <p className='text-red-600 mb-4'>{error}</p>
        <button
          onClick={fetchMatch}
          className='px-5 py-2 bg-red-500 text-white text-sm rounded-lg font-medium hover:bg-red-600 transition-colors'
        >
          إعادة المحاولة
        </button>
      </div>
    )
  }

  if (!matchData) {
    return (
      <div className='bg-white rounded-lg p-8 text-center shadow-sm border border-slate-200'>
        <div className='text-5xl mb-3'>📭</div>
        <p className='text-slate-500'>لا توجد بيانات</p>
      </div>
    )
  }

  // Separate penalty shootout events from regular events
  const regularEvents = (matchData.events ?? [])
    .filter(
      (e) => e.type !== 'pen_shootout_goal' && e.type !== 'pen_shootout_miss'
    )
    .sort(
      (a, b) =>
        (a.minute ?? 0) +
        (a.extra_minute ?? 0) -
        ((b.minute ?? 0) + (b.extra_minute ?? 0))
    )

  const penaltyEvents = (matchData.events ?? [])
    .filter(
      (e) => e.type === 'pen_shootout_goal' || e.type === 'pen_shootout_miss'
    )
    .sort((a, b) => (a.minute ?? 0) - (b.minute ?? 0))

  const homeEvents = regularEvents.filter(
    (e) => e.team_id === matchData.hometeam_id
  )
  const awayEvents = regularEvents.filter(
    (e) => e.team_id === matchData.awayteam_id
  )

  const s = matchData.match_status?.toLowerCase() || ''
  const isLive = s === 'live' || s === 'et' || s === 'pen_live'
  const hasPenalties = matchData.has_pen === '1'
  const isUpcoming = matchData.match_status === 'NS'

  /* ----------------------------------
 Render
-----------------------------------*/
  return (
    <div className='space-y-4'>
      {/* Competition Card */}
      <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <h2 className='text-sm font-semibold text-slate-900'>
              {matchData.stagename_ar}
            </h2>
            <div className='flex items-center gap-2 mt-1'>
              <p className='text-xs text-slate-500'>
                {formatDateTime(matchData.start_time)}
              </p>
              {isUpcoming && countdown && countdown.total > 0 && (
                <span className='text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded'>
                  {countdown.days > 0 && `${countdown.days}د `}
                  {countdown.hours.toString().padStart(2, '0')}:
                  {countdown.minutes.toString().padStart(2, '0')}:
                  {countdown.seconds.toString().padStart(2, '0')}
                </span>
              )}
            </div>
          </div>
          <div className='flex items-center gap-3'>
            {isLive && matchData.minute && (
              <div className='flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md'>
                <span className='text-xs font-bold text-slate-700'>
                  {matchData.minute}
                  {matchData.added_time ? `+${matchData.added_time}` : ''}'
                </span>
                <span className='w-2 h-2 bg-red-500 rounded-full animate-pulse'></span>
              </div>
            )}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${getStatusStyle(
                matchData.match_status
              )} ${isLive ? 'animate-pulse' : ''}`}
            >
              {isLive && (
                <span className='w-1.5 h-1.5 bg-white rounded-full'></span>
              )}
              {getStatusLabel(matchData.match_status)}
            </span>
          </div>
        </div>
      </div>

      {/* Countdown Card for Upcoming Matches */}
      {isUpcoming && countdown && countdown.total > 0 && (
        <div className='bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 shadow-sm text-white'>
          <div className='text-center'>
            <p className='text-sm opacity-90 mb-3'>تبدأ المباراة خلال</p>
            <div className='flex justify-center gap-3'>
              {countdown.days > 0 && (
                <div className='text-center'>
                  <div className='text-3xl font-bold bg-white/20 rounded-lg px-4 py-2 min-w-[60px]'>
                    {countdown.days}
                  </div>
                  <div className='text-xs mt-1 opacity-80'>يوم</div>
                </div>
              )}
              <div className='text-center'>
                <div className='text-3xl font-bold bg-white/20 rounded-lg px-4 py-2 min-w-[60px]'>
                  {countdown.hours.toString().padStart(2, '0')}
                </div>
                <div className='text-xs mt-1 opacity-80'>ساعة</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold bg-white/20 rounded-lg px-4 py-2 min-w-[60px]'>
                  {countdown.minutes.toString().padStart(2, '0')}
                </div>
                <div className='text-xs mt-1 opacity-80'>دقيقة</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold bg-white/20 rounded-lg px-4 py-2 min-w-[60px]'>
                  {countdown.seconds.toString().padStart(2, '0')}
                </div>
                <div className='text-xs mt-1 opacity-80'>ثانية</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Match Score Card */}
      <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200'>
        <div className='flex items-center justify-between gap-6'>
          {/* Home Team */}
          <div className='flex-1 text-center'>
            <div className='bg-slate-50 rounded-lg p-3 inline-block mb-2'>
              <Image
                src={matchData.home_logo || '/team.png'}
                width={48}
                height={48}
                alt={matchData.hometeam_name_ar}
                className='object-contain'
                unoptimized
              />
            </div>
            <h3 className='font-semibold text-slate-900 text-sm'>
              {matchData.hometeam_name_ar}
            </h3>
          </div>

          {/* Score */}
          <div className='text-center'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='text-4xl font-bold text-slate-900 bg-slate-50 px-5 py-3 rounded-lg min-w-[70px] text-center'>
                {matchData.hometeam_score}
              </div>
              <span className='text-2xl text-slate-300 font-light'>:</span>
              <div className='text-4xl font-bold text-slate-900 bg-slate-50 px-5 py-3 rounded-lg min-w-[70px] text-center'>
                {matchData.awayteam_score}
              </div>
            </div>
            {hasPenalties && (
              <div className='text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-md inline-block'>
                ركلات الترجيح: {matchData.home_pen} - {matchData.away_pen}
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className='flex-1 text-center'>
            <div className='bg-slate-50 rounded-lg p-3 inline-block mb-2'>
              <Image
                src={matchData.away_logo || '/team.png'}
                width={48}
                height={48}
                alt={matchData.awayteam_name_ar}
                className='object-contain'
                unoptimized
              />
            </div>
            <h3 className='font-semibold text-slate-900 text-sm'>
              {matchData.awayteam_name_ar}
            </h3>
          </div>
        </div>
      </div>

      {/* Events Card - Split View */}
      <div className='bg-white rounded-lg p-5 shadow-sm border border-slate-200'>
        <h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
          <span className='text-lg'>📋</span>
          أحداث المباراة
        </h3>

        <div className='grid grid-cols-2 gap-4'>
          {/* Home Team Events */}
          <div className='space-y-2'>
            <h4 className='text-xs font-semibold text-slate-600 mb-2'>
              {matchData.hometeam_name_ar}
            </h4>
            {homeEvents.length > 0 ? (
              homeEvents.map((e, i) => (
                <div
                  key={i}
                  className={`py-1.5 px-2 border rounded-lg transition-colors ${getEventColor(
                    e.type
                  )}`}
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <span className='text-xl'>{getEventIcon(e.type)}</span>
                      <div>
                        <p className='font-medium text-slate-900 text-xs'>
                          {e.name_ar || e.name}
                        </p>
                        <p className='text-[10px] text-slate-500 mt-0.5'>
                          {getEventLabel(e.type)}
                        </p>
                      </div>
                    </div>
                    <span className='font-bold text-sm text-slate-900'>
                      {e.minute}
                      {e.extra_minute ? `+${e.extra_minute}` : ''}'
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-4 bg-slate-50 rounded-lg border border-dashed border-slate-200'>
                <p className='text-slate-400 text-xs'>لا توجد أحداث</p>
              </div>
            )}
          </div>

          {/* Away Team Events */}
          <div className='space-y-2'>
            <h4 className='text-xs font-semibold text-slate-600 mb-2'>
              {matchData.awayteam_name_ar}
            </h4>
            {awayEvents.length > 0 ? (
              awayEvents.map((e, i) => (
                <div
                  key={i}
                  className={`py-1.5 px-2 border rounded-lg transition-colors ${getEventColor(
                    e.type
                  )}`}
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <span className='text-xl'>{getEventIcon(e.type)}</span>
                      <div>
                        <p className='font-medium text-slate-900 text-xs'>
                          {e.name_ar || e.name}
                        </p>
                        <p className='text-[10px] text-slate-500 mt-0.5'>
                          {getEventLabel(e.type)}
                        </p>
                      </div>
                    </div>
                    <span className='font-bold text-sm text-slate-900'>
                      {e.minute}
                      {e.extra_minute ? `+${e.extra_minute}` : ''}'
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-4 bg-slate-50 rounded-lg border border-dashed border-slate-200'>
                <p className='text-slate-400 text-xs'>لا توجد أحداث</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Penalty Shootout Card */}
      {penaltyEvents.length > 0 && (
        <div className='bg-white rounded-lg p-5 shadow-sm border border-slate-200'>
          <h3 className='text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2'>
            <span className='text-lg'>🥅</span>
            ركلات الترجيح
          </h3>
          <div className='grid grid-cols-2 gap-4'>
            {/* Home Team Penalties */}
            <div className='space-y-2'>
              <h4 className='text-xs font-semibold text-slate-600 mb-2'>
                {matchData.hometeam_name_ar}
              </h4>
              {penaltyEvents
                .filter((e) => e.team_id === matchData.hometeam_id)
                .map((e, i) => (
                  <div
                    key={i}
                    className={`p-3 border rounded-lg transition-colors ${getEventColor(
                      e.type
                    )}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <span className='text-xl'>{getEventIcon(e.type)}</span>
                        <div>
                          <p className='font-medium text-slate-900 text-xs'>
                            {e.name_ar || e.name}
                          </p>
                        </div>
                      </div>
                      <span className='font-bold text-sm text-slate-900'>
                        #{e.minute}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Away Team Penalties */}
            <div className='space-y-2'>
              <h4 className='text-xs font-semibold text-slate-600 mb-2'>
                {matchData.awayteam_name_ar}
              </h4>
              {penaltyEvents
                .filter((e) => e.team_id === matchData.awayteam_id)
                .map((e, i) => (
                  <div
                    key={i}
                    className={`p-3 border rounded-lg transition-colors ${getEventColor(
                      e.type
                    )}`}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <span className='text-xl'>{getEventIcon(e.type)}</span>
                        <div>
                          <p className='font-medium text-slate-900 text-xs'>
                            {e.name_ar || e.name}
                          </p>
                        </div>
                      </div>
                      <span className='font-bold text-sm text-slate-900'>
                        #{e.minute}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* TV Stations Card */}
      {matchData.tv_stations && matchData.tv_stations.length > 0 && (
        <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
          <h3 className='text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2'>
            <span className='text-lg'>📺</span>
            القنوات الناقلة
          </h3>
          <div className='flex flex-wrap gap-2'>
            {matchData.tv_stations.map((tv, i) => (
              <div
                key={i}
                className='px-3 py-2 rounded-lg text-xs font-medium border border-slate-200 bg-slate-50'
              >
                <span className='font-semibold'>{tv.name}</span>
                {tv.commentators && (
                  <span className='text-slate-500 mr-2'>
                    • {tv.commentators}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Venue Card */}
      {matchData.venue_name_ar && matchData.venue_name_ar !== '-' && (
        <div className='bg-white rounded-lg p-4 shadow-sm border border-slate-200'>
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-lg'>🏟️</span>
            <span className='text-slate-500'>الملعب:</span>
            <span className='font-medium text-slate-900'>
              {matchData.venue_name_ar}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
