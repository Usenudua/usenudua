"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Download } from "lucide-react"
import { useState, useEffect } from "react"
import { BookPreview } from "@/components/book-preview"

export function Hero() {
  const [primaryUrl, setPrimaryUrl] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLatestUrl() {
      try {
        const response = await fetch("https://api.usenudua.com.ng/api/downloads/latest-apk", {
          cache: "no-store",
        })
        if (response.ok) {
          const data = await response.json()
          if (data.url) {
            setPrimaryUrl(data.url)
            return
          }
        }
      } catch (error) {
        console.warn("Failed to fetch latest APK URL (Hero):", error)
      }
      // Leave primaryUrl as null — UI shows an honest "unavailable" state
      // rather than falling back to a stale local APK.
    }

    fetchLatestUrl()
  }, [])


  return (
    <section
      id="download"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-32 text-center"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          Cultural Calendar for Modern Times
        </div>

        <h1 className="mb-6 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white">
          Experience Time Through
          <span className="block text-primary">Ibibio, Annañ, Oro, Efik & other Cultures</span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-pretty text-base leading-relaxed text-white sm:text-lg md:text-xl">
          Usenudua brings cultural heritage to your daily planning. Discover the rich tradition of Ibibio, Annañ, Oro,
          Efik names, market days, deities, and ritual observances while staying organized with a modern, beautiful
          calendar.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-white/20 hover:bg-white/10 disabled:opacity-50"
              asChild
              disabled={!primaryUrl}
            >
              {primaryUrl ? (
                <a href={primaryUrl} download>
                  <Download className="mr-2 h-5 w-5" />
                  Download for Android
                </a>
              ) : (
                <span aria-disabled="true" className="pointer-events-none">
                  <Download className="mr-2 h-5 w-5" />
                  Download Unavailable
                </span>
              )}
            </Button>
          </div>
          <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
            <BookPreview>
              <Button
                size="lg"
                variant="default"
                className="w-full sm:w-auto"
                asChild
              >
                <a href="https://selar.com/8z871v2e28" target="_blank" rel="noopener noreferrer">
                  Get the Calendar Corpus
                </a>
              </Button>
            </BookPreview>
            <span className="text-xs text-muted-foreground">
              The full record behind the calendar
            </span>
          </div>
        </div>
        <p className="mt-4 text-sm text-white">iOS coming soon</p>
      </div>

      <div className="absolute bottom-8 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
