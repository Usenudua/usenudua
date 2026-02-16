"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const labelSets = {
  ibibio: ["Obo", "Edemobo", "Fioñadan", "Aderetaha", "Etaha", "Edemetaha", "Fioñetok", "Adereobo"],
  efik: [
    "Ekpri Ibibio",
    "Akwa Ikwo",
    "Akwa Ofioñ",
    "Akwa Ederi",
    "Akwa Ibibio",
    "Ekpri Ikwo",
    "Ekpri Ofioñ",
    "Ekpri Ederi",
  ],
  annang: ["Obo", "Uruabom", "Offioñ", "Adet", "Aditaha", "Atim", "Akenyoñ", "Urua-Ette"],
  oro: ["Obriboñ", "Uwe", "Ududa", "Odiebo", "Nwikpi", "Ububo", "Uruesañ", "Odieto"],
  ubium: ["Obo", "Uduam", "Fioñadan", "Aderetaha", "Ataetaha", "Udua Ukat", "Fioñetok", "Adereobo"],
}

const startDate = new Date(1960, 0, 1)

export function InteractiveCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof labelSets>("ibibio")
  const [month, setMonth] = useState(currentDate.getMonth())
  const [year, setYear] = useState(currentDate.getFullYear())

  const labels = labelSets[selectedLanguage]

  function calculateDaysSinceStart(date: Date): number {
    const diffTime = date.getTime() - startDate.getTime()
    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
  }

  function getDayLabel(year: number, month: number, day: number): string {
    const date = new Date(year, month, day)
    const daysSinceStart = calculateDaysSinceStart(date)
    const cyclePosition = daysSinceStart % 8
    return labels[cyclePosition]
  }

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
    <section id="calendar" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-balance">Try the Calendar</h2>
            <p className="text-muted-foreground text-pretty">
              Explore the interactive calendar and see traditional day names
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background shadow-lg overflow-hidden">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-muted/20 p-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={prevMonth}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background transition-colors hover:bg-muted"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="min-w-[160px] sm:min-w-[200px] text-center">
                  <span className="text-base sm:text-lg font-semibold">
                    {monthNames[month]} {year}
                  </span>
                </div>
                <button
                  onClick={nextMonth}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background transition-colors hover:bg-muted"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as keyof typeof labelSets)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
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
                    className="flex items-center justify-center py-1 sm:py-2 text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-semibold text-muted-foreground"
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
                  const dayLabel = getDayLabel(year, month, day)
                  const isTodayDate = isToday(day)

                  return (
                    <div
                      key={day}
                      className={`
                        group relative aspect-square rounded border sm:rounded-lg border-border p-0.5 sm:p-2 transition-all hover:border-primary
                        ${isTodayDate ? "border-primary bg-primary text-primary-foreground" : "bg-card"}
                      `}
                    >
                      <div className="flex h-full flex-col items-center justify-center text-center gap-0 sm:gap-1">
                        <span
                          className={`text-[11px] xs:text-xs sm:text-base md:text-lg font-semibold leading-tight ${isTodayDate ? "" : "text-foreground"}`}
                        >
                          {day}
                        </span>
                        <span
                          className={`text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs leading-tight max-w-full truncate px-0.5 ${isTodayDate ? "opacity-90" : "text-muted-foreground"}`}
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
