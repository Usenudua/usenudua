import Image from "next/image"

export function AppPreview() {
  return (
    <section id="preview" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="relative mx-auto aspect-[9/19] max-w-xs overflow-hidden rounded-[2.5rem] border-8 border-muted bg-card shadow-2xl md:max-w-sm">
            <Image
              src="/images/screenshot-202025-12-20-20070130.png"
              alt="Usenudua app showing December 2025 calendar with Ibibio names"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
