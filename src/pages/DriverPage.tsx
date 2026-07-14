import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { driverBenefitImages, imageAssets } from '../data/siteContent'

const benefits = [
  {
    title: 'Flexible shifts',
    body: "Go online when it works for you. TowNow is built around real-world schedules and peak demand windows.",
  },
  {
    title: 'Steady request flow',
    body: 'Smart dispatch surfaces nearby jobs so you spend less time empty-running between calls.',
  },
  {
    title: 'Earnings you can see',
    body: 'In-app summaries help you understand trip value, distance, and payout timing at a glance.',
  },
]

const steps = [
  'Create your driver profile and upload credentials.',
  'Complete verification (license, insurance, vehicle details).',
  'Go online and accept jobs that fit your route and capacity.',
  'Get paid on a predictable cadence with in-app history.',
]

export default function DriverPage() {
  return (
    <div className="bg-tow-bg pb-20">
      <section className="relative min-h-[70vh]">
        <img
          src={imageAssets.driverFleet}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tow-ink/95 via-tow-ink/85 to-tow-ink/55" />
        <div className="relative mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-4 py-16 sm:gap-12 sm:px-6 sm:py-20 md:grid-cols-2 lg:px-14">
          <div className="text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tow-accent">For Drivers</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">Earn with TowNow</h1>
            <p className="mt-4 max-w-xl text-base text-zinc-200 sm:mt-5 sm:text-lg">
              Join a network built for professional operators: clear job details, respectful riders, and tools that keep
              dispatch and paperwork out of your way.
            </p>
            <ul className="mt-6 space-y-2 text-zinc-300">
              <li>Flexible schedules that match your availability.</li>
              <li>Consistent trip demand with transparent dispatch.</li>
              <li>Real-time earnings and payout visibility.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
              <button type="button" className="rounded-full bg-tow-primary px-5 py-2.5 text-sm font-semibold text-white sm:px-7 sm:py-3 sm:text-base">
                Join as a Driver
              </button>
              <Link
                to="/contact"
                className="rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/20 sm:px-7 sm:py-3 sm:text-base"
              >
                Talk to partnerships
              </Link>
            </div>
          </div>
          <Reveal delay={0.08} className="md:hidden">
            <img
              src={imageAssets.driver}
              alt="Tow truck"
              className="mx-auto max-h-[260px] w-full max-w-lg rounded-2xl object-cover shadow-2xl ring-2 ring-white/20 sm:max-h-[300px] sm:rounded-[2rem]"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={0.08} className="hidden md:block">
            <img
              src={imageAssets.driver}
              alt="Tow truck"
              className="ml-auto max-h-[420px] w-full max-w-md rounded-[2rem] object-cover shadow-2xl ring-2 ring-white/20"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-tow-bgMuted py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-14">
        <Reveal className="mb-8 text-center sm:mb-10">
          <h2 className="text-2xl font-bold text-tow-ink sm:text-3xl md:text-4xl">Why drivers choose TowNow</h2>
        </Reveal>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={0.06 * i} className="overflow-hidden rounded-2xl border border-tow-border/90 bg-tow-surface shadow-card sm:rounded-3xl">
              <div className="relative h-36 w-full sm:h-40">
                <img src={driverBenefitImages[i]} alt="" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold">{b.title}</h3>
                <p className="mt-3 text-tow-muted">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      <section className="mt-16 bg-tow-bgCool py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-14">
        <div className="grid gap-0 overflow-hidden rounded-[2rem] border border-tow-border/90 bg-tow-surface shadow-card md:grid-cols-2">
          <div className="relative min-h-[280px]">
            <img src={imageAssets.driver} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-tow-ink/25" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
            <Reveal>
              <h2 className="text-2xl font-bold md:text-3xl">How onboarding works</h2>
              <p className="mt-3 text-tow-muted">
                We verify every partner so riders trust the truck that shows up. Expect a straightforward checklist and
                responsive support if anything is unclear.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <ol className="mt-6 list-decimal space-y-3 pl-5 text-tow-muted">
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4 pb-8 text-center sm:mt-16 sm:px-6 lg:px-14">
        <Reveal className="relative overflow-hidden rounded-2xl px-5 py-10 text-white sm:rounded-[2rem] sm:px-8 sm:py-14">
          <img src={imageAssets.hero} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-tow-ink/80" />
          <div className="relative">
            <h2 className="text-2xl font-bold md:text-3xl">Ready to roll?</h2>
            <p className="mx-auto mt-3 max-w-xl text-zinc-300">
              Swap this block for your real driver signup URL or embedded form when you go live.
            </p>
            <button type="button" className="mt-8 rounded-full bg-tow-primary px-8 py-3 font-semibold text-white">
              Start driver application
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
