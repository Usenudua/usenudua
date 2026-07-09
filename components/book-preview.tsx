'use client'

import * as React from 'react'
import Image from 'next/image'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'

interface BookPreviewProps {
  children: React.ReactNode
}

export function BookPreview({ children }: BookPreviewProps) {
  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-80 bg-zinc-950/95 border-white/10 text-white backdrop-blur-md p-0 overflow-hidden rounded-xl shadow-2xl z-[100]"
        align="center"
        side="top"
        sideOffset={8}
      >
        <div className="flex gap-4 p-4">
          <div className="relative w-24 h-36 flex-shrink-0 shadow-lg border border-white/10 rounded overflow-hidden bg-zinc-900">
            <Image
              src="/images/book-cover.jpg"
              alt="The Last Fallback Cover"
              fill
              className="object-cover"
              sizes="96px"
              priority
            />
          </div>
          <div className="flex flex-col justify-between py-1 flex-1">
            <div>
              <h4 className="font-bold text-base leading-snug text-white">The Last Fallback</h4>
              <p className="text-xs text-primary font-semibold mt-0.5">by Abasiama Eduok</p>
              <p className="text-[11px] text-zinc-400 mt-2.5 leading-relaxed line-clamp-3">
                A 214-page return to the cosmological, spiritual, and intellectual traditions of indigenous African knowledge, with particular depth on the Akwa Ibom peoples.
              </p>
            </div>
            <div className="text-[11px] text-primary flex items-center font-bold mt-2">
              Click to view on Selar →
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
