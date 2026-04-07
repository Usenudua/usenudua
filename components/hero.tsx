"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Download } from "lucide-react"
import { useState, useEffect } from "react"
import { getLatestRelease } from "@/app/actions/release"

export function Hero() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadUrls, setDownloadUrls] = useState<{ primary: string; mirror?: string | null }>({
    primary: "https://mniixeqjrmiiwdjkwucd.supabase.co/storage/v1/object/public/downloads/usenudua-v2.0.3.apk"
  })


  useEffect(() => {
    async function fetchLatestUrl() {
      try {
        // First try fetching latest.json from Supabase redirect layer
        const response = await fetch("https://mniixeqjrmiiwdjkwucd.supabase.co/storage/v1/object/public/downloads/latest.json", {
          cache: 'no-store' // Ensure we get the latest version
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.url) {
            setDownloadUrls({
              primary: data.url
            })
            return // Successfully updated from JSON
          }
        }
      } catch (error) {
        console.warn('Failed to fetch latest.json from Supabase:', error)
      }

      // Fallback: fetch from database if JSON fetch fails or returns no URL
      try {
        const release = await getLatestRelease()
        if (release) {
          setDownloadUrls({
            primary: release.supabase_url,
            mirror: release.neon_mirror_url
          })
        }
      } catch (error) {
        console.error('Failed to fetch fallback release from database:', error)
      }
    }

    fetchLatestUrl()
  }, [])

  const handleDownload = () => {
    setIsDownloading(true)
    const link = document.createElement("a")
    // Use primary (Supabase), fallback to mirror if needed, or vice-versa
    link.href = downloadUrls.primary
    link.download = `usenudua-${downloadUrls.primary.split('/').pop()}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    // Reset after a short delay
    setTimeout(() => setIsDownloading(false), 2000)
  }

  return (
    <section
      id="download"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          Cultural Calendar for Modern Times
        </div>

        <h1 className="mb-6 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white">
          Experience Time Through
          <span className="block text-primary">Ibibio, Annañ, Oro, Efik & other Cultures</span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
          Usenudua brings cultural heritage to your daily planning. Discover the rich tradition of Ibibio, Annañ, Oro,
          Efik names, market days, deities, and ritual observances while staying organized with a modern, beautiful
          calendar.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-transparent"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <Download className={`mr-2 h-5 w-5 ${isDownloading ? 'animate-bounce' : ''}`} />
            {isDownloading ? 'Opening Download...' : 'Download for Android'}
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Available for Android • iOS coming soon</p>
      </div>

      <div className="absolute bottom-8 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
