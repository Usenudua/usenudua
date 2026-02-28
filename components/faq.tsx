"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Usenudua?",
    answer:
      "Usenudua is a cultural calendar app that brings traditional Ibibio, Annañ, Oro, Efik, and other Cross River basin cultures to modern life. It displays traditional day names, market days, deity celebrations, and allows you to commemorate important life events using the traditional calendar system.",
  },
  {
    question: "Which languages does Usenudua support?",
    answer:
      "Usenudua supports Ibibio, Efik, Annañ, Oro, and Ubium languages. You can seamlessly switch between these languages to view traditional day names and cultural information in your preferred language.",
  },
  {
    question: "How does the traditional calendar work?",
    answer:
      "The traditional calendar uses an 8-day cycle instead of the 7-day Western week. Each day has a unique name in the traditional languages, and certain days are associated with market activities, deity celebrations, and ritual observances. Usenudua calculates these days based on the traditional system dating back to January 1, 1960.",
  },
  {
    question: "Is Usenudua available on iOS?",
    answer:
      "Currently, Usenudua is available only for Android devices. An iOS version is in development and will be released soon. Stay tuned for updates!",
  },
  {
    question: "Can I track multiple children's birthdays?",
    answer:
      "Yes! Usenudua allows you to commemorate and track multiple life events (Usoro), including births of multiple children, anniversaries, and other important milestones using the traditional calendar system.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Absolutely. Your personal data is encrypted and stored securely on cloud infrastructure. We do not sell your data to third parties. You have full control over your data and can request deletion at any time. See our Privacy Policy for more details.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "You can delete your account directly from the app by going to Settings > Delete Account. Alternatively, you can email us at boifiok@usenudua.com.ng with the subject 'Account/Data Deletion Request'. Visit our Data Deletion page for detailed instructions.",
  },
  {
    question: "Does Usenudua work offline?",
    answer:
      "Yes! Once you've downloaded the app and set up your account, the calendar and your commemorations are available offline. You'll need an internet connection for initial setup and to sync data across devices.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Everything you need to know about Usenudua
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Reach out via email at{" "}
            <a href="mailto:boifiok@usenudua.com.ng" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
