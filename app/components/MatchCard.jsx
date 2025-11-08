'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Sketelon from './ui/Sketelon'
import MatchFilter from './MatchFilter'

const MatchCard = ({ match, gradient }) => (
  <div
    className={`mt-1.5 p-[1px] rounded-2xl ${
      match.is_live ? 'animate-pulse-slow' : ''
    }`}
    style={{
      backgroundImage: match.is_live
        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        : gradient,
    }}
  >
    <div className='cursor-pointer relative bg-white rounded-2xl h-[88px] p-2'>
      <div className='h-full flex flex-row justify-between items-center'>
        {/* Home Team */}
        <div className='flex w-2/5 flex-row justify-end items-center'>
          <div className='flex flex-col items-center w-20'>
            <div className='w-10 h-10 relative bg-gray-100 rounded-full flex items-center justify-center'>
              <Image
                src={match.home_team.logo}
                width={40}
                height={40}
                alt='Home team logo'
                className='object-contain'
              />
            </div>
            <div className='mt-1.5 text-xs text-center line-clamp-1'>
              {match.home_team.name}
            </div>
          </div>
          <div className='score flex w-9 justify-center text-2xl font-bold'>
            {match.home_team.score || '-'}
          </div>
        </div>

        {/* Status/Time */}
        <div className='flex flex-col justify-center items-center w-1/3 text-xs'>
          {match.is_live ? (
            <div className='flex flex-col items-center'>
              <span className='w-8 h-0.5 bg-green-500 rounded mb-1 animate-pulse'></span>
              <span className='text-green-600 text-sm font-bold animate-pulse'>
                {match.match_minute || 'LIVE'}
              </span>
            </div>
          ) : match.status === 'انتهت' ? (
            <div className='flex flex-col items-center'>
              <div className='text-gray-400 text-sm font-bold'>انتهت</div>
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <div className='text-gray-400 text-sm font-bold'>
                {(() => {
                  const saudiDateString = match.match_time
                  const matchDate = new Date(saudiDateString + ' GMT+0300') // Saudi Arabia is UTC+3
                  const localTime = matchDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })
                  return localTime
                })()}
              </div>
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className='flex w-2/5 flex-row-reverse justify-end items-center'>
          <div className='flex flex-col items-center w-20'>
            <div className='w-10 h-10 relative bg-gray-100 rounded-full flex items-center justify-center'>
              <Image
                src={match.away_team.logo}
                width={40}
                height={40}
                alt='Away team logo'
                className='object-contain'
              />
            </div>
            <div className='mt-1.5 text-xs text-center line-clamp-1'>
              {match.away_team.name}
            </div>
          </div>
          <div className='score flex w-9 justify-center text-2xl font-bold'>
            {match.away_team.score || '-'}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const MatchesDisplay = () => {
  const [competitionGroups, setCompetitionGroups] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [live, setLive] = useState(0)
  const baseMatchesRef = React.useRef([]) // Use ref to store base match data

  const todayValue = new Date().toISOString().split('T')[0]

  const [currentDate, setCurrentDate] = useState(todayValue)

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  ]

  // Add custom CSS for slow pulse animation
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @keyframes pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      .animate-pulse-slow {
        animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  // Function to process and group matches
  const processMatches = (matches) => {
    const groups = {}
    let gradientIndex = 0

    const liveCount = matches.filter((match) => match.is_live === true).length
    setLive(liveCount)

    matches.forEach((match) => {
      const compName = match.competition.name

      if (!groups[compName]) {
        groups[compName] = []
      }

      groups[compName].push({
        ...match,
        gradient: gradients[gradientIndex % gradients.length],
      })

      gradientIndex++
    })

    setCompetitionGroups(groups)
  }

  useEffect(() => {
    let interval = null

    async function fetchInitialMatches() {
      const apiUrl = `https://fifa.facepy.com/api/matches/?date=${currentDate}`

      try {
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.success && Array.isArray(data.data)) {
          baseMatchesRef.current = data.data // Store base matches in ref
          processMatches(data.data)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching initial matches:', error)

        setError(error.message)
        setLoading(false)
      }
    }

    async function fetchLiveUpdates() {
      const matches = baseMatchesRef.current

      if (matches.length === 0) {
        return
      }

      const liveApiUrl = `https://jdwel.com/wp-json/jmanager/web/v1/live/matches/?date=${currentDate}`

      try {
        const response = await fetch(liveApiUrl)

        if (!response.ok) {
          console.error('Live update failed:', response.status)
          return
        }

        const data = await response.json()


        // jdwel.com API returns data directly without a success wrapper
        if (data && data.data && Array.isArray(data.data)) {
          // Create a map of live match updates using match_id as key
          const liveUpdatesMap = new Map()
          data.data.forEach((liveMatch) => {
            liveUpdatesMap.set(String(liveMatch.match_id), {
              hometeam_score: liveMatch.hometeam_score,
              awayteam_score: liveMatch.awayteam_score,
              minute: liveMatch.minute,
              added_time: liveMatch.added_time,
              match_status: liveMatch.match_status,
              is_live: liveMatch.match_status === 'LIVE',
            })
          })

          // Update base matches with live data by matching match_id
          const updatedMatches = matches.map((match) => {
            const matchIdStr = String(match.match_id)
            const liveUpdate = liveUpdatesMap.get(matchIdStr)

            if (liveUpdate) {
            

              // Format minute display with added time
              let minuteDisplay = liveUpdate.minute
              if (liveUpdate.added_time) {
                minuteDisplay = `${liveUpdate.minute}+${liveUpdate.added_time}`
              }

              return {
                ...match,
                home_team: {
                  ...match.home_team,
                  score: liveUpdate.hometeam_score,
                },
                away_team: {
                  ...match.away_team,
                  score: liveUpdate.awayteam_score,
                },
                match_minute: minuteDisplay,
                is_live: liveUpdate.is_live,
                status: liveUpdate.match_status,
              }
            }

            return match
          })

          // Update the ref with new data
          baseMatchesRef.current = updatedMatches
          processMatches(updatedMatches)
        }
      } catch (error) {
        console.error('Error fetching live updates:', error)
        // Continue with existing data, don't show error to user
      }
    }

    // Initial fetch from fifa.facepy.com
    fetchInitialMatches()

    // Set up interval to fetch live updates from jdwel.com every 30 seconds
    interval = setInterval(() => {
      fetchLiveUpdates()
    }, 3000)

    // Cleanup interval on component unmount
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentDate])

  if (loading) {
    return <Sketelon />
  }

  if (error) {
    return (
      <div className='pb-8 px-4'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-6 mt-4'>
          <p className='font-semibold text-red-800 mb-2'>
            Failed to load matches
          </p>
          <p className='text-sm text-red-600 mb-3'>{error}</p>
          <div className='text-sm text-gray-700'>
            <p className='font-medium mb-1'>Troubleshooting:</p>
            <ul className='list-disc list-inside space-y-1 text-gray-600'>
              <li>Ensure your API server is running on port 8000</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  if (Object.keys(competitionGroups).length === 0) {
    return (
      <div className='pb-8 px-4'>
        <div className='text-center text-gray-500 py-8'>
          No matches available
        </div>
      </div>
    )
  }

  return (
    <div className='pb-8'>
      {/* Date Selector */}
      <MatchFilter ChangeDate={(data) => setCurrentDate(data)} live={live} />
      {Object.keys(competitionGroups).map((competitionName) => (
        <div key={competitionName} className='rounded-md mt-4 px-4'>
          <div className='font-medium text-gray-500 uppercase mb-2 text-sm'>
            {competitionName}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            {competitionGroups[competitionName].map((match, idx) => (
              <MatchCard
                key={match.match_id || idx}
                match={match}
                gradient={match.gradient}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MatchesDisplay
