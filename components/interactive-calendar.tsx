"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { getDayLabel, SupportLang } from "@/lib/calendar-core"

export function InteractiveCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedLanguage, setSelectedLanguage] = useState<SupportLang>("ibibio")
  const [month, setMonth] = useState(currentDate.getMonth())
  const [year, setYear] = useState(currentDate.getFullYear())


  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const today = new Date()
  const isToday = (day: number) => {
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <section id="calendar" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold text-balance">Try the Calendar</h2>
            <p className="text-white/70 text-pretty">
              Explore the interactive calendar and see traditional day names
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-b border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-center gap-4 w-full sm:w-auto">
                <button
                  onClick={prevMonth}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all hover:bg-white/10 hover:scale-110 active:scale-95 text-white"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="min-w-[180px] sm:min-w-[220px] text-center">
                  <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {monthNames[month]} {year}
                  </span>
                </div>
                <button
                  onClick={nextMonth}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all hover:bg-white/10 hover:scale-110 active:scale-95 text-white"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as SupportLang)}
                className="rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-sm font-medium transition-all hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-primary text-white cursor-pointer"
              >
                <option value="ibibio">Ibibio</option>
                <option value="efik">Efik</option>
                <option value="annang">Annang</option>
                <option value="oro">Oro</option>
                <option value="ubium">Ubium</option>
              </select>
            </div>

            {/* Calendar Grid */}
            <div className="p-1 sm:p-4 md:p-6">
              <div className="grid grid-cols-7 gap-0.5 sm:gap-2 md:gap-3">
                {/* Day Headers */}
                {dayHeaders.map((header) => (
                  <div
                    key={header}
                    className="flex items-center justify-center py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm font-bold text-white uppercase tracking-wider opacity-80"
                  >
                    {header}
                  </div>
                ))}

                {/* Empty cells before first day */}
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1
                  const dayLabel = getDayLabel(new Date(year, month, day), selectedLanguage)
                  const isTodayDate = isToday(day)


                  return (
                    <div
                      key={day}
                      className={`
                        group relative aspect-square rounded border sm:rounded-lg border-white/10 p-0.5 sm:p-2 transition-all hover:border-primary/50
                        ${isTodayDate ? "border-primary bg-primary text-primary-foreground" : "bg-white/5 hover:bg-white/10"}
                      `}
                    >
                      <div className="flex h-full flex-col items-center justify-center text-center gap-0 sm:gap-1">
                        <span
                          className={`text-[12px] xs:text-sm sm:text-lg md:text-xl font-bold leading-tight ${isTodayDate ? "" : "text-white"}`}
                        >
                          {day}
                        </span>
                        <span
                          className={`text-[8px] xs:text-[10px] sm:text-[11px] md:text-sm font-medium leading-tight max-w-full truncate px-1 ${isTodayDate ? "text-white/90" : "text-white/80 group-hover:text-white"}`}
                          title={dayLabel}
                        >
                          {dayLabel}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
