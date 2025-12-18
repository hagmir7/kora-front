'use client'
import React from 'react'
import Image from 'next/image'
import GoalList from './GoalList';
import Link from 'next/link';

const MatchScoreboard = ({ matchData, teams }) => {
    console.log(teams);
    
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)


    const months = [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ]

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  // Get goals for each team
  const homeGoals = matchData.events
    .filter(
      (event) =>
        event.type === 'goal' && event.team_id === matchData.hometeam_id
    )
    .map((goal) => ({
      scorer: goal.name_ar,
      assist: goal.related_name_ar,
      time: goal.extra_minute
        ? `${goal.minute}+${goal.extra_minute}'`
        : `${goal.minute}'`,
    }))

  const awayGoals = matchData.events
    .filter(
      (event) =>
        event.type === 'goal' && event.team_id === matchData.awayteam_id
    )
    .map((goal) => ({
      scorer: goal.name_ar,
      assist: goal.related_name_ar,
      time: goal.extra_minute
        ? `${goal.minute}+${goal.extra_minute}'`
        : `${goal.minute}'`,
    }))

  // Get own goals
  const ownGoals = matchData.events
    .filter((event) => event.type === 'own-goal')
    .map((goal) => ({
      scorer: goal.name_ar,
      time: goal.extra_minute
        ? `${goal.minute}+${goal.extra_minute}'`
        : `${goal.minute}'`,
      team_id: goal.team_id,
    }))

  return (
    <div className='w-full rounded-3xl overflow-hidden shadow-2xl' dir='rtl'>
      <div className='relative'>
        {/* Background Layer 1 - Stadium Image */}
        <div className='absolute inset-0'>
          <Image
            src={
              matchData.competition_image ||
              matchData.background_image ||
              '/imgs/match-bg.png'
            }
            alt='stadium background'
            className='w-full h-full object-cover grayscale opacity-20'
            width={1920}
            height={1080}
          />
        </div>

        {/* Background Layer 2 - Animated Flag */}
        <div className='absolute inset-0'>
          <Image
            src='/imgs/bg-animation.gif'
            alt='flag animation'
            className='w-full h-full object-cover opacity-20'
            width={100}
            height={100}
          />
        </div>

        {/* Gradient Overlay */}
        <div className='absolute inset-0 ' style={{ opacity: 0.95 }}></div>

        {/* Content */}
        <div className='relative z-10 px-2 md:px-4 lg:px-6 py-3 md:py-3'>
          {/* Date and Venue */}
          <div className='text-center mb-3'>
            <p className='text-white/80 text-xs md:text-sm'>
              {formatDate(matchData.start_time)}
            </p>
            {matchData.venue_name_ar && (
              <p className='text-white/60 text-[10px] md:text-xs'>
                {matchData.venue_name_ar}
              </p>
            )}
          </div>

          {/* Teams and Score */}
          <div className='flex items-center justify-between gap-4 md:gap-8 mb-4'>
            {/* Home Team */}
            <div className='flex flex-col items-center flex-1 max-w-[140px] md:max-w-[180px]'>
              <div className='w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 mb-3 bg-white/10 rounded-full p-3 md:p-4 backdrop-blur-sm'>
                {teams.home_team_logo && (
                  <Image
                    src={teams.home_team_logo}
                    alt={teams.home_team}
                    className='w-full h-full object-contain'
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <h3 className='text-white text-xs md:text-sm lg:text-base font-semibold text-center mb-2'>
                {teams.home_team || 'الفريق المضيف'}
              </h3>
              {matchData.hometeam_position && (
                <span className='inline-flex items-center justify-center w-6 h-6 rounded-md bg-yellow-400 text-black text-[10px] font-bold'>
                  {matchData.hometeam_position}
                </span>
              )}
            </div>

            {/* Score */}
            <div className='flex flex-col items-center px-2 md:px-4'>
              <div className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight'>
                {matchData.awayteam_score || 0}
                <span className='mx-2 md:mx-4 text-white/60'>-</span>
                {matchData.hometeam_score || 0}
              </div>
              {matchData.stagename_ar && (
                <div className='text-white/90 text-[10px] md:text-xs lg:text-sm mb-2 text-center'>
                  {matchData.stagename_ar}
                </div>
              )}
              <div className='bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full'>
                <span className='text-white font-semibold text-[10px] md:text-xs uppercase tracking-wider'>
                  {matchData.match_status || 'FT'}
                </span>
              </div>
            </div>

            {/* Away Team */}
            <div className='flex flex-col items-center flex-1 max-w-[140px] md:max-w-[180px]'>
              <div className='w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 mb-3 bg-white/10 rounded-full p-3 md:p-4 backdrop-blur-sm'>
                {teams.away_team_logo && (
                  <Image
                    src={teams.away_team_logo}
                    alt={teams.away_team}
                    className='w-full h-full object-contain'
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <h3 className='text-white text-xs md:text-sm lg:text-base font-semibold text-center mb-2'>
                {teams.away_team || 'الفريق الضيف'}
              </h3>
              {matchData.awayteam_position && (
                <span className='inline-flex items-center justify-center w-6 h-6 rounded-md bg-yellow-400 text-black text-[10px] font-bold'>
                  {matchData.awayteam_position}
                </span>
              )}
            </div>
          </div>

          {/* Goals Section */}
          {(homeGoals.length > 0 ||
            awayGoals.length > 0 ||
            ownGoals.length > 0) && (
            <div className='border-t border-white/20 pt-4 mb-2'>
              <div className='max-w-2xl mx-auto space-y-2'>
                <GoalList goals={homeGoals} ownGoals={[]} teamType='home' />
                <GoalList
                  goals={awayGoals}
                  ownGoals={ownGoals}
                  teamType='away'
                />
              </div>
            </div>
          )}
          <Link href={`/matches/${teams?.match_id}`}>صفحة المبراة</Link>
        </div>
      </div>
    </div>
  )
}

export default MatchScoreboard
