import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, XCircle, Smartphone } from "lucide-react"

export const dynamic = "force-dynamic" // never cache — tokens are single-use

export const metadata: Metadata = {
  title: "Verify Sign-In",
  description: "Magic-link verification for Usenudua.",
  robots: { index: false, follow: false },
}

// ─── API helper ──────────────────────────────────────────────────────────────

async function verifyToken(token: string) {
  try {
    const res = await fetch(
      `https://api.usenudua.com.ng/api/auth/magic-link/verify?token=${encodeURIComponent(token)}`,
      { cache: "no-store" }
    )

    if (res.ok) {
      return { success: true as const }
    }

    // Treat "already used" as a soft-success case, since a race between
    // Android App Link interception and the browser can cause the token
    // to be consumed twice for a single legitimate sign-in attempt.
    if (res.status === 409 || res.status === 410) {
      return { success: true as const, alreadyUsed: true }
    }

    return { success: false as const }
  } catch {
    return { success: false as const }
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  const { token } = searchParams

  if (!token) {
    return (
      <StatusScreen
        icon={<XCircle className="h-12 w-12 text-destructive" />}
        title="Invalid Link"
        message="This verification link is missing a token. Please request a new magic link from the app."
      />
    )
  }

  const result = await verifyToken(token)

  if (result.success) {
    return (
      <StatusScreen
        icon={<CheckCircle2 className="h-12 w-12 text-primary" />}
        title="You're Verified!"
        message={
          result.alreadyUsed
            ? "This link was already used to sign in — you should already be logged in on your device."
            : "Your sign-in has been confirmed. Return to the Usenudua app to continue."
        }
        token={token}
        showAppCta
      />
    )
  }

  return (
    <StatusScreen
      icon={<XCircle className="h-12 w-12 text-destructive" />}
      title="Verification Failed"
      message="This link may have expired or already been used. Please request a new magic link from the app."
      token={token}
      showAppCta
    />
  )
}

// ─── UI component ────────────────────────────────────────────────────────────

function StatusScreen({
  icon,
  title,
  message,
  token,
  showAppCta,
}: {
  icon: React.ReactNode
  title: string
  message: string
  token?: string
  showAppCta?: boolean
}) {
  const appDeepLink = token
    ? `usenudua://auth/magic-link?token=${encodeURIComponent(token)}`
    : `usenudua://auth/magic-link`

  return (
    <main className="flex-1 flex items-center justify-center px-4 min-h-screen">
      <div className="text-center max-w-md">
        {/* Icon badge */}
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
              {/* Open the installed app via deep link */}
              <a
                href={appDeepLink}
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 shadow-sm"
              >
                <Smartphone className="h-4 w-4" />
                Open Usenudua App
              </a>

              {/* Back to marketing site */}
              <Link
                href="/"
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border bg-background shadow-xs hover:bg-accent h-10 px-6"
              >
                Back to Home
              </Link>
            </div>

            {/* APK download fallback for users without app installed */}
            <p className="text-xs text-muted-foreground mt-2">
              Don't have the app installed yet?{" "}
              <a
                href="https://mniixeqjrmiiwdjkwucd.supabase.co/storage/v1/object/public/downloads/usenudua-v2.0.3.apk"
                download
                className="underline hover:text-foreground font-medium transition-colors"
              >
                Download APK
              </a>
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
