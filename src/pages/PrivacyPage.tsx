const sections = [
  {
    title: 'Overview',
    paragraphs: [
      "TowNow (“we”, “us”) provides a platform that connects people who need roadside assistance with independent service providers. This policy explains what information we collect, how we use it, and the choices you have.",
      'This page is starter copy for your marketing site. Have legal counsel review and replace with jurisdiction-specific language before launch.',
    ],
  },
  {
    title: 'Information we collect',
    paragraphs: [
      'Account details such as name, phone number, and email address.',
      'Location data needed to dispatch a tow, show ETAs, and improve safety during active trips.',
      "Payment-related information processed by our payment partners (we do not store full card numbers on TowNow servers in typical integrations).",
      'Support communications and optional feedback you send us.',
    ],
  },
  {
    title: 'How we use information',
    paragraphs: [
      "To provide, personalize, and improve the TowNow service—including matching, routing, receipts, and fraud prevention.",
      'To communicate with you about your trip, account, or policy updates.',
      'To comply with law and respond to lawful requests.',
    ],
  },
  {
    title: 'Sharing',
    paragraphs: [
      'We share limited data with drivers to complete a job (for example, pickup location and vehicle notes you provide).',
      'We use subprocessors for hosting, analytics, maps, notifications, and payments—under contracts that require appropriate safeguards.',
      'We do not sell your personal information as a product category; disclose any “sale” or targeted advertising practices here if applicable in your region.',
    ],
  },
  {
    title: 'Retention & security',
    paragraphs: [
      'We retain information as long as needed to operate the service, meet legal obligations, and resolve disputes.',
      'We use administrative, technical, and organizational measures designed to protect personal data.',
    ],
  },
  {
    title: 'Your choices & rights',
    paragraphs: [
      'Depending on where you live, you may have rights to access, correct, delete, or export certain data, or to object to some processing.',
      'Contact us at privacy@townow.com (placeholder) to exercise rights or ask questions.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="bg-tow-bg pb-24">
      <section className="border-b border-tow-border/90 bg-tow-surfaceBright">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tow-primary">Legal</p>
          <h1 className="mt-3 text-3xl font-bold text-tow-ink sm:text-4xl md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-tow-muted">Last updated: April 21, 2026 (placeholder)</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-14">
        {sections.map((block) => (
          <section key={block.title} className="mb-10 sm:mb-12">
            <h2 className="text-xl font-semibold text-tow-ink sm:text-2xl">{block.title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-tow-muted sm:mt-4 sm:space-y-4 sm:text-base">
              {block.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-xl border border-tow-border/90 bg-tow-surface p-5 shadow-card sm:rounded-2xl sm:p-6">
          <h2 className="text-lg font-semibold text-tow-ink">Contact</h2>
          <p className="mt-2 text-tow-muted">
            Privacy questions: <span className="font-medium text-tow-ink">privacy@townow.com</span> (placeholder)
          </p>
        </section>
      </article>
    </div>
  )
}
