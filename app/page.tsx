import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { InteractiveCalendar } from "@/components/interactive-calendar"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"


export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <InteractiveCalendar />
      <Features />
      <FAQ />
      <Footer />
    </main>
  )
}
