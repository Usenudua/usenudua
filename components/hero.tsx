"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Download } from "lucide-react"
import { useState } from "react"

export function Hero() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
    window.open("https://usenudua.com.ng/usenudua.apk", "_blank")
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

        <h1 className="mb-6 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          Experience Time Through
          <span className="block text-primary">Ibibio, Annañ, Oro, Efik & other Cultures</span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
          Usendua brings cultural heritage to your daily planning. Discover the rich tradition of Ibibio, Annañ, Oro,
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
