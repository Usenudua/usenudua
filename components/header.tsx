"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { BookPreview } from "@/components/book-preview"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
        console.warn("Failed to fetch latest APK URL (Header):", error)
      }
      // Leave primaryUrl as null — UI shows an honest "unavailable" state
      // rather than falling back to a stale local APK.
    }

    fetchLatestUrl()
  }, [])


  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  const downloadProps = primaryUrl
    ? { href: primaryUrl, download: true }
    : { href: "#", "aria-disabled": true, className: "pointer-events-none opacity-50" }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top row: Logo and Title */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Usenudua Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <span className="text-xl font-semibold">Usenudua</span>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Bottom row: Navigation centered - Desktop only */}
        <div className="hidden md:flex items-center justify-center gap-6 pb-3">
          <nav className="flex items-center gap-6">
            <a href="#features" className="text-sm text-white transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#about" className="text-sm text-white transition-colors hover:text-foreground">
              About
            </a>
            <BookPreview>
              
                <a
                href="https://selar.com/8z871v2e28"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white transition-colors hover:text-foreground"
              >
                Calendar Corpus
              </a>
            </BookPreview>
            
                <a
              {...downloadProps}
              className={`text-sm text-white transition-colors hover:text-foreground ${downloadProps.className ?? ""}`}
            >
              {primaryUrl ? "Download" : "Unavailable"}
            </a>
          </nav>

          <Button asChild>
            <a {...downloadProps}>{primaryUrl ? "Get Started" : "Unavailable"}</a>
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 py-4">
            <nav className="flex flex-col gap-4">
              
                  <a
                href="#features"
                className="text-sm text-white transition-colors hover:text-foreground"
                onClick={handleNavClick}
              >
                Features
              </a>
              
                  <a
                href="#about"
                className="text-sm text-white transition-colors hover:text-foreground"
                onClick={handleNavClick}
              >
                About
              </a>
              <BookPreview>
                
                    <a
                  href="https://selar.com/8z871v2e28"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white transition-colors hover:text-foreground"
                  onClick={handleNavClick}
                >
                  Calendar Corpus
                </a>
              </BookPreview>
              
                  <a
                {...downloadProps}
                className={`text-sm text-white text-left transition-colors hover:text-foreground ${downloadProps.className ?? ""}`}
                onClick={handleNavClick}
              >
                {primaryUrl ? "Download" : "Unavailable"}
              </a>
              <Button className="w-full" asChild>
                <a {...downloadProps} onClick={handleNavClick}>{primaryUrl ? "Get Started" : "Unavailable"}</a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
