import { useState, type FormEvent } from 'react'
import Reveal from '../components/Reveal'
import { imageAssets } from '../data/siteContent'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-tow-bg pb-20">
      <section className="relative min-h-[38vh]">
        <img
          src={imageAssets.contactBanner}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tow-ink/90 to-tow-ink/40" />
        <div className="relative mx-auto flex min-h-[38vh] max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-14">
          <Reveal>
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">Contact TowNow</h1>
            <p className="mt-3 max-w-2xl text-base text-zinc-200 sm:mt-4 sm:text-lg">
              Questions about the service, press, or partnerships—we read every message. For urgent roadside help, use the
              TowNow app once it is live in your area.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          <Reveal className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl border border-tow-border/90 bg-tow-surface p-5 shadow-card sm:rounded-3xl sm:p-6">
              <h2 className="text-lg font-semibold">General</h2>
              <p className="mt-2 text-tow-muted">hello@townow.com</p>
              <p className="mt-1 text-sm text-tow-muted">Replace with your production inbox.</p>
            </div>
            <div className="rounded-2xl border border-tow-border/90 bg-tow-surface p-5 shadow-card sm:rounded-3xl sm:p-6">
              <h2 className="text-lg font-semibold">Driver support</h2>
              <p className="mt-2 text-tow-muted">drivers@townow.com</p>
            </div>
            <div className="rounded-2xl border border-tow-border/90 bg-tow-surface p-5 shadow-card sm:rounded-3xl sm:p-6">
              <h2 className="text-lg font-semibold">Office (placeholder)</h2>
              <p className="mt-2 text-tow-muted">100 Market Street, Suite 400</p>
              <p className="text-tow-muted">San Francisco, CA</p>
              <p className="mt-3 text-sm text-tow-muted">Mon–Fri, 9:00–17:00 local time</p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-tow-border/90 bg-tow-surface p-5 shadow-card sm:rounded-3xl sm:p-8 md:p-10"
            >
              <h2 className="text-xl font-semibold">Send a message</h2>
              <p className="mt-2 text-sm text-tow-muted">
                This form is a front-end placeholder—wire it to your API or form provider when ready.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <label className="block text-sm font-medium text-tow-ink">
                  Name
                  <input
                    required
                    name="name"
                    type="text"
                    className="mt-2 w-full rounded-xl border border-tow-border px-4 py-3 outline-none ring-tow-primary/30 focus:ring-2"
                    placeholder="Your name"
                  />
                </label>
                <label className="block text-sm font-medium text-tow-ink">
                  Email
                  <input
                    required
                    name="email"
                    type="email"
                    className="mt-2 w-full rounded-xl border border-tow-border px-4 py-3 outline-none ring-tow-primary/30 focus:ring-2"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="mt-6 block text-sm font-medium text-tow-ink">
                Topic
                <select
                  name="topic"
                  className="mt-2 w-full rounded-xl border border-tow-border px-4 py-3 outline-none ring-tow-primary/30 focus:ring-2"
                >
                  <option>General question</option>
                  <option>Press / media</option>
                  <option>Partnership</option>
                  <option>Driver inquiry</option>
                </select>
              </label>

              <label className="mt-6 block text-sm font-medium text-tow-ink">
                Message
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-2 w-full resize-y rounded-xl border border-tow-border px-4 py-3 outline-none ring-tow-primary/30 focus:ring-2"
                  placeholder="How can we help?"
                />
              </label>

              <button
                type="submit"
                className="mt-8 rounded-full bg-tow-primary px-8 py-3 font-semibold text-white transition hover:bg-tow-primaryDark"
              >
                Submit
              </button>

              {submitted ? (
                <p className="mt-4 text-sm font-medium text-emerald-600" role="status">
                  Thanks—this demo does not send email yet, but your fields validated successfully.
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
