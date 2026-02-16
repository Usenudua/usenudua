import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Terms of Service - Usendua",
  description: "Terms of Service for Usendua cultural calendar app",
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">
          <strong>Last Updated:</strong> January 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-6">
          <p>
            By using Usendua, you agree to these Terms of Service ("Terms"). If you do not agree, please discontinue
            the use of the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of the Service</h2>
          <p>
            You may use the platform to experience traditional cultural calendars, create, store, and manage
            commemorations such as birth records and personal milestones. You must be at least 18 years old to create
            an account.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must provide accurate information when creating an account.</li>
            <li>You may only upload content you have legal rights to.</li>
            <li>You accept responsibility for data you upload about children or family members.</li>
            <li>You must respect the cultural significance of the calendar system and use it appropriately.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Children's Data</h2>
          <p>
            Parents and legal guardians may upload information about children for commemorative purposes. The Service
            does not create accounts for children, and children cannot use the platform directly.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Content Ownership</h2>
          <p>
            You retain full ownership of all content you upload. By uploading content, you grant us a license to store
            and display it for the sole purpose of operating the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
          <p>
            The cultural calendar system, traditional day names, and associated cultural information are based on
            traditional knowledge systems of Ibibio, Annañ, Oro, Efik, and related cultures. The app design, code, and
            implementation are owned by Usendua.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Prohibited Activities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Misuse of another person's data</li>
            <li>Uploading harmful or illegal content</li>
            <li>Attempting to disrupt or hack the platform</li>
            <li>Using the service for commercial purposes without permission</li>
            <li>Misrepresenting cultural information or traditions</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Service Availability</h2>
          <p>
            We strive to keep the service available at all times but do not guarantee uninterrupted access. We may
            suspend the service for maintenance or updates.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Termination</h2>
          <p>We may suspend accounts that violate our Terms. You may delete your account at any time.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Limitation of Liability</h2>
          <p>
            We are not liable for any indirect, incidental, or consequential damages arising from your use of the
            Service. The Service is provided "as is" without warranties of any kind.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Service after changes constitutes
            acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Privacy Policy</h2>
          <p>
            Your use of the Service is also governed by our{" "}
            <a href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved in
            Nigerian courts.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact</h2>
          <p>
            Email us at{" "}
            <a href="mailto:boifiok@usenudua.com.ng" className="text-primary hover:underline">
              boifiok@usenudua.com.ng
            </a>{" "}
            for support or inquiries.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
