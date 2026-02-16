import { CalendarDays } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <CalendarDays className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">Usendua</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="/privacy-policy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="transition-colors hover:text-foreground">
              Terms of Service
            </a>
            <a href="/data-deletion" className="transition-colors hover:text-foreground">
              Data Deletion
            </a>
            <a href="mailto:boifiok@usenudua.com.ng" className="text-muted-foreground hover:text-primary transition-colors">
              boifiok@usenudua.com.ng
            </a>
          </div>
        </div>

        <div id="about" className="mt-12 text-center">
          <h3 className="mb-3 text-xl font-semibold">About</h3>
          <p className="mx-auto max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Usendua is a brainchild of Abas Eduok, birthed in 2024 after years of gestation. It represents a bridge
            between traditional cultural wisdom and modern technology, preserving and promoting the rich heritage of
            Ibibio, Annañ, Oro, Efik, and other peoples of the Cross River basin.
          </p>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">©2024-present. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
