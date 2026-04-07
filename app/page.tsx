import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Philosophy } from "@/components/philosophy"
import { Features } from "@/components/features"
import { InteractiveCalendar } from "@/components/interactive-calendar"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"


export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Philosophy />
      <InteractiveCalendar />
      <Features />
      <FAQ />
      <Footer />
    </main>
  )
}

