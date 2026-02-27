import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Data Deletion Instructions - Usenudua",
  description: "How to delete your Usenudua account and data",
}

export default function DataDeletion() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Data Deletion Instructions</h1>
        <p className="text-muted-foreground mb-8">
          <strong>Last Updated:</strong> January 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-6">
          <h2 className="text-2xl font-semibold mt-8 mb-4">How to Delete Your Usenudua Account & Data</h2>

          <p>
            You may request deletion of your account and all associated data at any time. You have two options:
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Option 1: Delete From Inside the App</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Open the Usenudua app</li>
            <li>
              Go to <strong>Settings</strong>
            </li>
            <li>
              Select <strong>Delete Account</strong>
            </li>
            <li>Confirm your deletion request</li>
          </ol>

          <p className="mt-4">This permanently removes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your account</li>
            <li>All commemoration entries</li>
            <li>All uploaded images</li>
            <li>All cultural calendar preferences</li>
            <li>All personal data associated with your account</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Option 2: Request Email-Based Deletion</h3>
          <p>If you are unable to access the app, email:</p>

          <p className="my-4">
            <a href="mailto:boifiok@usenudua.com.ng" className="text-primary hover:underline text-lg font-semibold">
              boifiok@usenudua.com.ng
            </a>
          </p>

          <p>
            Use the subject line: <strong>Account/Data Deletion Request</strong>
          </p>

          <p>We will verify your identity and delete your account within 7 business days.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Login Users</h2>
          <p>
            If you logged in via Facebook or Google, deleting your Usenudua account only impacts our platform — not your
            social accounts.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">What Happens After Deletion</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your account will be permanently deleted and cannot be recovered</li>
            <li>All personal data will be removed from our servers within 30 days</li>
            <li>Some anonymized data may be retained for analytics purposes</li>
            <li>Backup copies will be deleted within 90 days</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
          <p>
            For any concerns, reach us at{" "}
            <a href="mailto:boifiok@usenudua.com.ng" className="text-primary hover:underline">
              boifiok@usenudua.com.ng
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
