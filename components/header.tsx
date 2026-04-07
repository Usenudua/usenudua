"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getLatestRelease } from "@/app/actions/release"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [primaryUrl, setPrimaryUrl] = useState("https://mniixeqjrmiiwdjkwucd.supabase.co/storage/v1/object/public/downloads/usenudua-v2.0.2.apk")

  useEffect(() => {
    async function fetchLatestUrl() {
      try {
        // First try fetching latest.json from Supabase redirect layer
        const response = await fetch("https://mniixeqjrmiiwdjkwucd.supabase.co/storage/v1/object/public/downloads/latest.json", {
          cache: 'no-store'
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.url) {
            setPrimaryUrl(data.url)
            return
          }
        }
      } catch (error) {
        console.warn('Failed to fetch latest.json from Supabase (Header):', error)
      }

      // Fallback: fetch from database
      try {
        const release = await getLatestRelease()
        if (release) setPrimaryUrl(release.supabase_url)
      } catch (error) {
        console.error('Failed to fetch fallback release from database (Header):', error)
      }
    }

    fetchLatestUrl()
  }, [])

  const handleDownload = () => {
    setIsDownloading(true)
    window.open(primaryUrl, "_blank")
    setTimeout(() => setIsDownloading(false), 2000)
  }

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

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
            <button 
              onClick={handleDownload}
              className="text-sm text-white transition-colors hover:text-foreground cursor-pointer bg-transparent border-none p-0"
              disabled={isDownloading}
            >
              {isDownloading ? 'Opening Download...' : 'Download'}
            </button>
          </nav>

          <Button onClick={handleDownload} disabled={isDownloading}>
            {isDownloading ? 'Opening...' : 'Get Started'}
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
              <button
                onClick={() => {
                  handleDownload()
                  handleNavClick()
                }}
                className="text-sm text-white text-left transition-colors hover:text-foreground cursor-pointer bg-transparent border-none p-0"
                disabled={isDownloading}
              >
                {isDownloading ? 'Opening Download...' : 'Download'}
              </button>
              <Button onClick={handleDownload} className="w-full" disabled={isDownloading}>
                {isDownloading ? 'Opening...' : 'Get Started'}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
