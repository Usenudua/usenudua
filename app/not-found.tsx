"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <CalendarDays className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={() => router.push("/")} size="lg">
              Go Home
            </Button>
            <Button onClick={() => router.back()} variant="outline" size="lg">
              Go Back
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
