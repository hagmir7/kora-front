import React from 'react'

const GoalList = ({ goals, ownGoals = [], teamType = 'home' }) => {
  // Different colors based on team type
  const teamColors = {
    home: {
      bg: 'bg-white/10',
      border: 'border-white/20',
      iconFill: '#fff',
    },
    away: {
      bg: 'bg-purple-900/30',
      border: 'border-purple-500/30',
      iconFill: '#fff',
    },
  }

  const colors = teamColors[teamType]

  return (
    <div className='space-y-2'>
      {/* Regular Goals */}
      {goals.map((goal, idx) => (
        <div
          key={`${teamType}-${idx}`}
          className={`flex items-center gap-3 ${colors.bg} backdrop-blur-sm rounded-lg px-4 py-3 border ${colors.border}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            width='20'
            height='20'
            className='shrink-0'
          >
            <path
              d='M7,0a7,7,0,1,0,7,7A7,7,0,0,0,7,0Zm5.269,10.1-2.176.438-.846-1,1.031-2.889,1.345-.669,1.473,1.6a6.081,6.081,0,0,1-.827,2.513ZM3.9,10.561l-1.944-.108A6.077,6.077,0,0,1,.906,7.583l1.482-1.6,1.35.661L4.759,9.529Zm7.875-7.4-.427,1.979-1.372.672L7.445,3.977V2.268l1.8-.968a6.159,6.159,0,0,1,2.527,1.865Zm-7-1.87,1.8.971V3.975L4.045,5.816l-1.38-.674L2.237,3.15A6.163,6.163,0,0,1,4.77,1.295Zm.359,11.53-.551-1.714.875-1.054H8.544l.862,1.021-.847,1.833a6.017,6.017,0,0,1-3.43-.086Z'
              transform='translate(3 3)'
              fill={colors.iconFill}
            />
          </svg>
          <div className='flex-1'>
            <span className='text-white text-xs md:text-sm font-medium'>
              {goal.scorer}
            </span>
            {goal.assist && (
              <span className='text-white/70 text-[10px] md:text-xs mr-2'>
                ({goal.assist})
              </span>
            )}
          </div>
          <span
            className='text-yellow-400 text-xs md:text-sm font-bold'
            dir='rtl'
          >
            {goal.time}
          </span>
        </div>
      ))}

      {/* Own Goals */}
      {ownGoals.map((goal, idx) => (
        <div
          key={`own-${teamType}-${idx}`}
          className='flex items-center gap-3 bg-red-900/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-red-500/30'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            width='20'
            height='20'
            className='shrink-0'
          >
            <path
              d='M7,0a7,7,0,1,0,7,7A7,7,0,0,0,7,0Zm5.269,10.1-2.176.438-.846-1,1.031-2.889,1.345-.669,1.473,1.6a6.081,6.081,0,0,1-.827,2.513ZM3.9,10.561l-1.944-.108A6.077,6.077,0,0,1,.906,7.583l1.482-1.6,1.35.661L4.759,9.529Zm7.875-7.4-.427,1.979-1.372.672L7.445,3.977V2.268l1.8-.968a6.159,6.159,0,0,1,2.527,1.865Zm-7-1.87,1.8.971V3.975L4.045,5.816l-1.38-.674L2.237,3.15A6.163,6.163,0,0,1,4.77,1.295Zm.359,11.53-.551-1.714.875-1.054H8.544l.862,1.021-.847,1.833a6.017,6.017,0,0,1-3.43-.086Z'
              transform='translate(3 3)'
              fill='#ef4444'
            />
          </svg>
          <div className='flex-1'>
            <span className='text-white text-xs md:text-sm font-medium'>
              {goal.scorer}
            </span>
            <span className='text-red-400 text-[10px] md:text-xs mr-2'>
              (هدف بالخطأ)
            </span>
          </div>
          <span
            className='text-yellow-400 text-xs md:text-sm font-bold'
            dir='rtl'
          >
            {goal.time}
          </span>
        </div>
      ))}
    </div>
  )
}

export default GoalList
