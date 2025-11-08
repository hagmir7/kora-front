import Image from 'next/image'
import React from 'react'

const MatchCardBen = ({ match, gradient }) => (
  <div
    className='mt-1.5 p-[1px] rounded-2xl'
    style={{ backgroundImage: gradient }}
  >
    <div className='cursor-pointer relative bg-white rounded-2xl h-[88px] p-2'>
      <div className='h-full flex flex-row justify-between items-center'>
        {/* Home Team */}
        <div className='flex w-2/5 flex-row justify-end items-center'>
          <div className='flex flex-col items-center w-20'>
            <div className='w-10 h-10 relative bg-gray-100 rounded-full flex items-center justify-center overflow-hidden'>
              <Image
                src={`https://prod-media.beinsports.com/image/${match.home_team_id}.png`}
                width={40}
                height={40}
                alt='Home team logo'
                className='object-contain'
              />
            </div>
            <div className='mt-1.5 text-xs text-center line-clamp-1'>
              {match.home_team_name}
            </div>
          </div>
          <div className='score flex w-9 justify-center text-2xl font-bold'>
            {match.home_team_goals}
          </div>
        </div>

        {/* Status/Time */}
        <div className='flex flex-col justify-center items-center w-1/3 text-xs'>
          {match.event_status === 'Playing' ? (
            <div className='flex flex-col items-center'>
              <span className='w-8 h-0.5 bg-green-500 rounded mb-1'></span>
              <span className='text-green-600 text-sm font-bold'>
                {match.match_info?.live_time || 'LIVE'}
              </span>
            </div>
          ) : match.match_info?.match_status === 'FT' ? (
            <div className='flex flex-col items-center'>
              <div className='text-gray-400 text-sm font-bold'>FT</div>
              {match.competition_name && (
                <div className='text-center text-xs text-gray-600 mt-1'>
                  {match.competition_name}
                </div>
              )}
            </div>
          ) : (
            <div className='text-gray-400 text-lg font-bold'>
              {new Date(
                `${match.match_info.match_date.replace('Z', '')}T${
                  match.match_info.match_time
                }`
              )
                .toISOString()
                .substring(11, 16) || '--:--'}
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className='flex w-2/5 flex-row-reverse justify-end items-center'>
          <div className='flex flex-col items-center w-20'>
            <div className='w-10 h-10 relative bg-gray-100 rounded-full flex items-center justify-center overflow-hidden'>
              <Image
                src={`https://prod-media.beinsports.com/image/${match.away_team_id}.png`}
                width={40}
                height={40}
                alt='Away team logo'
                className='object-contain'
              />
            </div>
            <div className='mt-1.5 text-xs text-center line-clamp-1'>
              {match.away_team_name}
            </div>
          </div>
          <div className='score flex w-9 justify-center text-2xl font-bold'>
            {match.away_team_goals}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const MatchesDisplay = async () => {
  const response = await fetch(
    'https://prod-cmseventmanagement.beinsports.com/score/getScorePageList?desiredLanguage=ar-mena&eventDate=2025-11-05&eventTime=23%3A00%3A00&timezone=Africa%2FCasablanca&teamIds=&section=calendar&favouriteTeamIds=&competitionIds=&isLive=0'
  )

  const matchesData = await response.json()

  console.log('API Response:', matchesData)

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  ]

  // Group matches by competition
  const competitionGroups = {}
  let gradientIndex = 0

  // Parse the API response structure
  Object.keys(matchesData).forEach((competitionKey) => {
    const competitionData = matchesData[competitionKey]

    Object.keys(competitionData).forEach((matchKey) => {
      const match = competitionData[matchKey]
      const compName = match.competition_name

      if (!competitionGroups[compName]) {
        competitionGroups[compName] = []
      }

      competitionGroups[compName].push({
        ...match,
        gradient: gradients[gradientIndex % gradients.length],
      })

      gradientIndex++
    })
  })

  return (
    <div className='pb-8'>
      {Object.keys(competitionGroups).map((competitionName) => (
        <div key={competitionName} className='rounded-md mt-4 px-4'>
          <div className='font-medium text-gray-500 uppercase mb-2 text-sm'>
            {competitionName}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            {competitionGroups[competitionName].map((match, idx) => (
              <MatchCardBen
                key={`${match.event_id || idx}`}
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
