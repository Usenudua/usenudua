import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, XCircle, Smartphone } from "lucide-react"

export const dynamic = "force-dynamic" // never cache -- tokens are single-use

export const metadata: Metadata = {
  title: "Verify Sign-In",
  description: "Magic-link verification for Usenudua.",
  robots: { index: false, follow: false },
}

// --- API helpers ---

async function getLatestApkUrl() {
  try {
    const res = await fetch("https://api.usenudua.com.ng/api/downloads/latest-apk", { cache: "no-store" })
    if (res.ok) {
      const data = await res.json()
      return data.url as string | undefined
    }
  } catch {
    // fall through to undefined
  }
  return undefined
}

async function verifyToken(token: string) {
  try {
    const res = await fetch(
      `https://api.usenudua.com.ng/api/auth/magic-link/verify?token=${encodeURIComponent(token)}`,
      { cache: "no-store" }
    )

    if (res.ok) {
      return { success: true as const }
    }

    let reason: string | undefined
    try {
      const body = await res.json() as { error?: string; message?: string }
      reason = body.error ?? body.message
    } catch {
      // non-JSON body -- leave reason undefined
    }

    return { success: false as const, reason }
  } catch {
    return { success: false as const }
  }
}

// --- Page ---

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  const { token } = searchParams
  const apkUrl = await getLatestApkUrl()

  if (!token) {
    return (
      <StatusScreen
        icon={<XCircle className="h-12 w-12 text-destructive" />}
        title="Invalid Link"
        message="This verification link is missing a token. Please request a new magic link from the app."
        apkUrl={apkUrl}
      />
    )
  }

  const result = await verifyToken(token)

  if (result.success) {
    return (
      <StatusScreen
        icon={<CheckCircle2 className="h-12 w-12 text-primary" />}
        title="You're Verified!"
        message="Your sign-in has been confirmed. Return to the Usenudua app to continue."
        token={token}
        showAppCta
        apkUrl={apkUrl}
      />
    )
  }

  return (
    <StatusScreen
      icon={<XCircle className="h-12 w-12 text-destructive" />}
      title="Verification Failed"
      message={
        result.reason
          ?? "This link may have expired or already been used. Please request a new magic link from the app."
      }
      token={token}
      showAppCta
      apkUrl={apkUrl}
    />
  )
}

// --- UI component ---

function StatusScreen({
  icon,
  title,
  message,
  token,
  showAppCta,
  apkUrl,
}: {
  icon: React.ReactNode
  title: string
  message: string
  token?: string
  showAppCta?: boolean
  apkUrl?: string
}) {
  const appDeepLink = token
    ? `usenudua://auth/magic-link?token=${encodeURIComponent(token)}`
    : `usenudua://auth/magic-link`

  return (
    <main className="flex-1 flex items-center justify-center px-4 min-h-screen">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            {icon}
          </div>
        </div>

        <h1 className="text-3xl font-semibold mb-4">{title}</h1>
        <p className="text-muted-foreground text-lg mb-8">{message}</p>

        {showAppCta && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4 justify-center flex-wrap">
              
                <a
                href={appDeepLink}
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 shadow-sm"
              >
                <Smartphone className="h-4 w-4" />
                Open Usenudua App
              </a>

              <Link
                href="/"
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border bg-background shadow-xs hover:bg-accent h-10 px-6"
              >
                Back to Home
              </Link>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              Don't have the app installed yet?{" "}
              {apkUrl ? (
                
                  <a
                  href={apkUrl}
                  download
                  className="underline hover:text-foreground font-medium transition-colors"
                >
                  Download APK
                </a>
              ) : (
                <span className="text-muted-foreground/60">
                  Download temporarily unavailable
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
