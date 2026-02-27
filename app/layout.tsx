import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://usenudua.com.ng'),
  title: {
    default: "Usenudua - Cultural Calendar App | Ibibio, Annañ, Oro, Efik",
    template: "%s | Usenudua"
  },
  description:
    "Experience time through the lens of Ibibio, Annañ, Oro, Efik, and other southern Nigeria cultures with Usenudua, the calendar app that celebrates cultural heritage every day. Track traditional day names, market days, and commemorate life events.",
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
  publisher: "Usenudua",
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
        alt: 'Usenudua Cultural Calendar App',
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
        url: "/icon.png",
      },
    ],
    apple: "/apple-icon.png",
  },
  generator: 'v0.app',
  applicationName: 'Usenudua',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Usenudua',
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
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
