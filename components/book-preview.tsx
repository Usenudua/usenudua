'use client'

import * as React from 'react'

interface BookPreviewProps {
  children: React.ReactNode
}

export function BookPreview({ children }: BookPreviewProps) {
  return (
    <span className="book-preview-wrapper">
      {children}
      <span className="book-preview-card" aria-hidden="true">
        <span className="book-preview-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/book-cover.jpg"
            alt="The Last Fallback Cover"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </span>
        <span className="book-preview-info">
          <span className="book-preview-title">The Last Fallback</span>
          <span className="book-preview-author">by Abasiama Eduok</span>
          <span className="book-preview-desc">
            A 214-page return to the cosmological, spiritual, and intellectual traditions of indigenous African knowledge, with particular depth on the Akwa Ibom peoples.
          </span>
          <span className="book-preview-cta">Click to view on Selar →</span>
        </span>
      </span>
    </span>
  )
}
