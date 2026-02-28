import { Calendar, Globe, Moon, Smartphone, Store, Sparkles, Heart } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Cultural Names Daily",
    description:
      "Each day displays its traditional Ibibio, Annañ, Oro, Efik names, connecting you to your heritage with every glance at your calendar.",
  },
  {
    icon: Store,
    title: "Market Days",
    description:
      "Track traditional market days and cycles, ensuring you never miss important trading and community gathering days.",
  },
  {
    icon: Sparkles,
    title: "Names of Deities & Ritual Days",
    description:
      "Learn about sacred days, deity celebrations, and important ritual observances in the traditional calendar system.",
  },
  {
    icon: Heart,
    title: "Usoro - Life Events",
    description:
      "Commemorate and track important events in your life using the traditional calendar system, creating meaningful connections between your personal milestones and cultural heritage.",
  },
  {
    icon: Globe,
    title: "Multiple Language Support",
    description:
      "Seamlessly switch between Ibibio, Annañ, Oro, Efik, and Ubium, making cultural learning accessible to everyone.",
  },
  {
    icon: Moon,
    title: "Beautiful Dark Mode",
    description:
      "Enjoy a sleek, modern interface designed for comfortable viewing day or night with our elegant dark theme.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description:
      "Optimized for your smartphone with intuitive navigation and responsive design that works perfectly on any device.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">Everything You Need</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Usenudua combines the wisdom of traditional culture with modern calendar functionality
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/20 backdrop-blur-md p-6 transition-all hover:border-primary/50 hover:bg-black/30"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
