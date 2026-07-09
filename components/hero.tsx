"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Download } from "lucide-react"
import { useState, useEffect } from "react"
import { getLatestRelease } from "@/app/actions/release"
import { BookPreview } from "@/components/book-preview"

export function Hero() {
  const [downloadUrls, setDownloadUrls] = useState<{ primary: string }>({
    primary: "https://mniixeqjrmiiwdjkwucd.supabase.co/storage/v1/object/public/downloads/usenudua-v2.0.3.apk"
  })


  useEffect(() => {
    async function fetchLatestUrl() {
      // 1. Try Supabase redirect layer latest.json
      try {
        const response = await fetch("https://mniixeqjrmiiwdjkwucd.supabase.co/storage/v1/object/public/downloads/latest.json", {
          cache: 'no-store' // Ensure we get the latest version
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.url) {
            setDownloadUrls({
              primary: data.url,
            })
            return // Successfully updated from JSON
          }
        }
      } catch (error) {
        console.warn('Failed to fetch latest.json from Supabase:', error)
      }

      // 2. Try fetching local latest.json (same origin fallback)
      try {
        const response = await fetch("/latest.json", {
          cache: 'no-store'
        })
        if (response.ok) {
          const data = await response.json()
          if (data.url) {
            setDownloadUrls({
              primary: data.url,
            })
            return
          }
        }
      } catch (error) {
        console.warn('Failed to fetch local latest.json:', error)
      }

      // 3. Fallback: fetch from database if JSON fetch fails or returns no URL
      try {
        const release = await getLatestRelease()
        if (release) {
          setDownloadUrls({
            primary: release.supabase_url,
          })
          return
        }
      } catch (error) {
        console.error('Failed to fetch fallback release from database:', error)
      }

      // 4. Ultimate fallback: local APK file served from the same domain
      setDownloadUrls({
        primary: "/usenudua.apk",
      })
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
              className="w-full sm:w-auto bg-transparent border-white/20 hover:bg-white/10"
              asChild
            >
              <a href={downloadUrls.primary} download>
                <Download className="mr-2 h-5 w-5" />
                Download for Android
              </a>
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
