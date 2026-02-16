import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Privacy Policy - Usendua",
  description: "Privacy Policy for Usendua cultural calendar app",
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          <strong>Last Updated:</strong> January 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-6">
          <p>
            Usendua ("we", "our", "the Service") is a cultural calendar and commemoration platform that allows users
            to experience time through traditional Ibibio, Annañ, Oro, Efik cultures and mark significant life moments.
            This Privacy Policy explains how we collect, use, store, and protect your information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">A. Information You Provide</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name, email, phone number (optional) and login credentials.</li>
            <li>
              Commemoration data such as:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Child's first name (optional)</li>
                <li>Date of birth</li>
                <li>Time of birth</li>
                <li>Weight, height, or notes (optional)</li>
                <li>Uploaded images (optional)</li>
              </ul>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">B. Children's Privacy</h3>
          <p>
            Usendua does <strong>not provide accounts to children</strong>. All data about children (e.g., birth
            information) is provided by the parent or legal guardian. We do not knowingly collect or process personal
            data directly from children under 13. All entries involving minors must be created and managed only by a
            responsible adult user.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">C. Automatically Collected Data</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Device information</li>
            <li>App usage statistics</li>
            <li>Crash logs and performance analytics</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To enable account creation and user login</li>
            <li>To store and display your commemoration entries</li>
            <li>To provide cultural calendar features and day names</li>
            <li>To improve app performance and reliability</li>
            <li>To secure the platform and prevent fraud</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Store Your Data</h2>
          <p>
            Your data is stored using secured cloud infrastructure. All data transfers are protected by
            industry-standard encryption.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Sharing of Data</h2>
          <p>
            We do <strong>not sell</strong> your personal data. We may share your information only with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Service providers such as hosting, analytics, and storage platforms</li>
            <li>Law enforcement if required by applicable law</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Retention</h2>
          <p>Your data remains stored as long as your account is active. You may request deletion at any time.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Account & Data Deletion</h2>
          <p>
            You can delete your account or request deletion instructions at:{" "}
            <a href="/data-deletion" className="text-primary hover:underline">
              Data Deletion Page
            </a>
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for data processing</li>
            <li>Export your data in a portable format</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact</h2>
          <p>
            For questions, reach us at:{" "}
            <a href="mailto:boifiok@usenudua.com.ng" className="text-primary hover:underline">
              boifiok@usenudua.com.ng
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
