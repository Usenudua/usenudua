import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"


const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://usenudua.com.ng'),
  title: {
    default: "Usendua - Cultural Calendar App | Ibibio, Annañ, Oro, Efik",
    template: "%s | Usendua"
  },
  description:
    "Experience time through the lens of Ibibio, Annañ, Oro, Efik, and other southern Nigeria cultures with Usendua, the calendar app that celebrates cultural heritage every day. Track traditional day names, market days, and commemorate life events.",
  keywords: [
    "Ibibio calendar",
    "Efik calendar",
    "Annañ calendar",
    "Oro calendar",
    "traditional calendar",
    "cultural calendar",
    "Nigerian culture",
    "Cross River",
    "traditional day names",
    "market days",
    "African calendar app"
  ],
  authors: [{ name: "Abasiama Eduok" }],
  creator: "Abasiama Eduok",
  publisher: "Usendua",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://usenudua.com.ng',
    title: 'Usendua - Cultural Calendar App',
    description: 'Experience time through traditional Ibibio, Annañ, Oro, Efik cultures. Discover day names, market days, and commemorate life events.',
    siteName: 'Usendua',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Usendua Cultural Calendar App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Usendua - Cultural Calendar App',
    description: 'Experience time through traditional Ibibio, Annañ, Oro, Efik cultures',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  generator: 'v0.app',
  applicationName: 'Usendua',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Usendua',
  },
  category: 'culture',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
