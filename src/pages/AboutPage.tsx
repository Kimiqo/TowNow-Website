import Reveal from '../components/Reveal'
import { imageAssets } from '../data/siteContent'

const pillars = [
  {
    title: 'Speed when it counts',
    body: 'We prioritize nearby, available drivers so you spend less time waiting on the shoulder.',
  },
  {
    title: 'Clarity under stress',
    body: 'Upfront pricing cues and live ETA reduce guesswork during an already difficult moment.',
  },
  {
    title: 'Trust by design',
    body: 'Verified partners, secure in-app payments, and support channels built for real emergencies.',
  },
]

const stats = [
  { value: '24/7', label: 'Dispatch coverage' },
  { value: 'Live', label: 'Map tracking' },
  { value: 'Verified', label: 'Driver network' },
]

export default function AboutPage() {
  return (
    <div className="bg-tow-bg pb-20">
      <section className="relative min-h-[42vh]">
        <img
          src={imageAssets.aboutBanner}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tow-bg via-tow-ink/50 to-tow-ink/30" />
        <div className="relative mx-auto flex min-h-[42vh] max-w-6xl flex-col justify-end px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tow-accent">About TowNow</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">Roadside support, reimagined.</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:px-14">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tow-primary">Our mission</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">Calm help when the road gets rough</h2>
          <p className="mt-4 text-base text-tow-muted sm:mt-5 sm:text-lg">
            TowNow connects stranded drivers with professional tow operators the same way modern apps connect you with a
            ride: fast matching, transparent status, and a clear path from request to drop-off.
          </p>
          <p className="mt-3 text-base text-tow-muted sm:mt-4 sm:text-lg">
            We started from a simple belief: breakdowns are stressful enough without opaque pricing, long hold times, or
            wondering whether help is actually on the way.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <img
            src={imageAssets.about}
            alt="Tow truck on the road"
            className="h-[260px] w-full rounded-2xl object-cover shadow-soft sm:h-[320px] sm:rounded-[2rem] md:h-[380px] lg:h-[440px]"
            loading="lazy"
          />
        </Reveal>
      </section>

      <section className="bg-tow-bgMuted py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-14">
        <Reveal className="mb-8 text-center sm:mb-10">
          <h2 className="text-2xl font-bold text-tow-ink sm:text-3xl md:text-4xl">What we stand for</h2>
          <p className="mx-auto mt-3 max-w-2xl text-tow-muted">
            Product principles that shape every screen in the rider and driver apps.
          </p>
        </Reveal>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={0.06 * i} className="rounded-2xl border border-tow-border/90 bg-tow-surface p-6 shadow-card sm:rounded-3xl sm:p-8">
              <h3 className="text-xl font-semibold">{pillar.title}</h3>
              <p className="mt-3 text-tow-muted">{pillar.body}</p>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      <section className="mt-12 bg-tow-bgCool py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-14">
        <div className="overflow-hidden rounded-[2rem] border border-tow-border/80 shadow-card">
          <img src={imageAssets.aboutSecondary} alt="" className="h-56 w-full object-cover md:h-72" loading="lazy" />
        </div>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl items-stretch gap-8 px-4 sm:mt-16 sm:gap-10 sm:px-6 md:grid-cols-2 lg:px-14">
        <Reveal className="flex flex-col justify-center rounded-2xl border border-tow-border/90 bg-tow-surface p-6 shadow-card sm:rounded-[2rem] sm:p-8 md:p-10">
          <h2 className="text-2xl font-bold md:text-3xl">Built for real roads</h2>
          <p className="mt-4 text-tow-muted">
            From urban arterials to late-night highways, TowNow is designed around unpredictable conditions: low
            visibility, urgent timelines, and a single source of truth for everyone involved.
          </p>
          <ul className="mt-6 space-y-3 text-tow-muted">
            <li className="flex gap-2">
              <span className="font-semibold text-tow-primary">•</span>
              Rider and driver experiences tuned for one-handed use and glanceable updates.
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-tow-primary">•</span>
              Operations-minded flows so partners can focus on the job, not paperwork.
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-tow-primary">•</span>
              Room to grow: coverage, fleet types, and enterprise programs as you scale.
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="rounded-2xl border border-tow-border bg-zinc-900 p-6 text-white shadow-soft sm:rounded-[2rem] sm:p-8 md:p-10">
          <h2 className="text-2xl font-bold md:text-3xl">At a glance</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/10 p-5">
                <p className="text-2xl font-bold text-tow-primary">{s.value}</p>
                <p className="mt-2 text-sm text-zinc-300">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-zinc-400">
            Numbers are illustrative for the marketing site; replace with verified metrics when you publish.
          </p>
        </Reveal>
      </section>
    </div>
  )
}
