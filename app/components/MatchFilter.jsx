'use client'
import {
  Calendar,
  Filter,
  Volume2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import React, { useState } from 'react'

const MatchFilter = ({ ChangeDate, live=0 }) => {
  const todayValue = new Date().toISOString().split('T')[0]
  const [currentDate, setCurrentDate] = useState(todayValue)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())

  // Array of weekdays in Arabic
  const weekdaysArabic = [
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ]

  const weekdaysShortArabic = [
    'أحد',
    'إثنين',
    'ثلاثاء',
    'أربعاء',
    'خميس',
    'جمعة',
    'سبت',
  ]

  // Array of months in Arabic
  const monthsArabic = [
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

  // Function to generate dates: yesterday, today, tomorrow, day after tomorrow
  function generateDates() {
    const today = new Date()
    const datesArray = []

    // Yesterday, Today, Tomorrow
    for (let i = -1; i <= 1; i++) {
      const current = new Date(today)
      current.setDate(today.getDate() + i)

      let label
      if (i === -1) {
        label = 'أمس'
      } else if (i === 0) {
        label = 'اليوم'
      } else if (i === 1) {
        label = 'غداً'
      }

      const date = `${String(current.getDate()).padStart(2, '0')} ${
        monthsArabic[current.getMonth()]
      }`
      const value = current.toISOString().split('T')[0]
      datesArray.push({ label, date, value })
    }

    // Day after tomorrow
    const dayAfterTomorrow = new Date(today)
    dayAfterTomorrow.setDate(today.getDate() + 2)
    const dayAfterLabel = weekdaysArabic[dayAfterTomorrow.getDay()]
    const dayAfterDate = `${String(dayAfterTomorrow.getDate()).padStart(
      2,
      '0'
    )} ${monthsArabic[dayAfterTomorrow.getMonth()]}`
    const dayAfterValue = dayAfterTomorrow.toISOString().split('T')[0]
    datesArray.push({
      label: dayAfterLabel,
      date: dayAfterDate,
      value: dayAfterValue,
    })

    return datesArray
  }

  const dates = generateDates()

  const handleDateChange = (value) => {
    setCurrentDate(value)
    if (ChangeDate) {
      ChangeDate(value)
    }
  }

  const handleCustomDateSelect = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const value = `${year}-${month}-${day}`
    setCurrentDate(value)
    setShowDatePicker(false)
    if (ChangeDate) {
      ChangeDate(value)
    }
  }

  // Get formatted date for custom selected date
  const getFormattedCustomDate = () => {
    const [year, month, day] = currentDate.split('-')
    const monthIndex = parseInt(month) - 1
    return `${day} ${monthsArabic[monthIndex]}`
  }

  // Check if current date is one of the preset dates
  const isPresetDate = dates.some((d) => d.value === currentDate)

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek }
  }

  const goToPreviousMonth = () => {
    setCalendarDate(
      new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1)
    )
  }

  const goToNextMonth = () => {
    setCalendarDate(
      new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1)
    )
  }

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(calendarDate)
    const days = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [selectedYear, selectedMonth, selectedDay] = currentDate.split('-')
    const selectedDate = new Date(
      parseInt(selectedYear),
      parseInt(selectedMonth) - 1,
      parseInt(selectedDay)
    )

    // Empty cells before the first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className='w-10 h-10' />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth(),
        day
      )
      date.setHours(0, 0, 0, 0)
      const isToday = date.getTime() === today.getTime()
      const isSelected = date.getTime() === selectedDate.getTime()

      days.push(
        <button
          key={day}
          onClick={() => handleCustomDateSelect(date)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
            ${isSelected ? 'bg-purple-600 text-white' : ''}
            ${isToday && !isSelected ? 'bg-purple-100 text-purple-900' : ''}
            ${!isSelected && !isToday ? 'hover:bg-gray-100' : ''}
          `}
        >
          {day}
        </button>
      )
    }

    return days
  }

  return (
    <div className='flex flex-row justify-between items-center px-4 py-4'>
      <div className='flex flex-row items-center gap-2'>
        {dates.map((day) => (
          <button
            key={day.value}
            onClick={() => handleDateChange(day.value)}
            className={`w-[70px] flex flex-col items-center px-1.5 py-2 rounded-t cursor-pointer transition-colors ${
              day.value === currentDate
                ? 'bg-purple-100 text-purple-900 border-b-4 border-purple-700'
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
            }`}
          >
            <span className='text-sm font-medium uppercase'>{day.label}</span>
            <span className='text-xs'>{day.date}</span>
          </button>
        ))}

        {/* Custom date display button */}
        {!isPresetDate && (
          <button
            onClick={() => setShowDatePicker(true)}
            className='w-[70px] flex flex-col items-center px-1.5 py-2 rounded-t bg-purple-100 text-purple-900 border-b-4 border-purple-700'
          >
            <span className='text-sm font-medium'>مخصص</span>
            <span className='text-xs'>{getFormattedCustomDate()}</span>
          </button>
        )}

        {/* Calendar button with date picker */}
        <div className='relative'>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className='w-14 h-10 bg-white border cursor-pointer border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors'
          >
            <Calendar className='w-5 h-5' />
          </button>

          {/* Beautiful Custom Date Picker */}
          {showDatePicker && (
            <>
              <div
                className='fixed inset-0 z-10'
                onClick={() => setShowDatePicker(false)}
              />
              <div className='absolute top-12 left-0 z-20 bg-white rounded-xl shadow-2xl p-4 border border-gray-200 w-80'>
                {/* Header */}
                <div className='flex items-center justify-between mb-4'>
                  <button
                    onClick={goToNextMonth}
                    className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                  >
                    <ChevronRight className='w-5 h-5' />
                  </button>
                  <div className='text-center'>
                    <div className='font-bold text-lg'>
                      {monthsArabic[calendarDate.getMonth()]}{' '}
                      {calendarDate.getFullYear()}
                    </div>
                  </div>
                  <button
                    onClick={goToPreviousMonth}
                    className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                  >
                    <ChevronLeft className='w-5 h-5' />
                  </button>
                </div>

                {/* Weekday headers */}
                <div className='grid grid-cols-7 gap-1 mb-2'>
                  {weekdaysShortArabic.map((day) => (
                    <div
                      key={day}
                      className='w-10 h-8 flex items-center justify-center text-xs font-semibold text-gray-600'
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className='grid grid-cols-7 gap-1'>{renderCalendar()}</div>

                {/* Quick actions */}
                <div className='flex gap-2 mt-4 pt-4 border-t'>
                  <button
                    onClick={() => handleCustomDateSelect(new Date())}
                    className='flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors'
                  >
                    اليوم
                  </button>
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className='flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors'
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className=' gap-2 hidden md:flex'>
        <button className='w-10 h-10 border cursor-pointer border-gray-300 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors'>
          <Filter className='w-5 h-5' />
        </button>
        <button className='flex border cursor-pointer border-gray-300 items-center gap-2 px-5 py-2 bg-white rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors'>
          <Volume2 className='w-5 h-5' />
          <span>مباشر ({live})</span>
        </button>
      </div>
    </div>
  )
}

export default MatchFilter
