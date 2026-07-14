import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import Typewriter from 'typewriter-effect'
import {
  features,
  homeFeatureImages,
  imageAssets,
} from '../data/siteContent'

/* ────────────────────────────────────────────────── */
/*  Pain-point stats for "THE PROBLEM" section        */
/* ────────────────────────────────────────────────── */
const painPoints = [
  {
    stat: '45 min',
    label: 'AVERAGE WAIT',
    desc: 'No queue, no ETA — just standing on the shoulder hoping someone answers.',
  },
  {
    stat: 'GHS 500+',
    label: 'PER TOW',
    desc: 'Every breakdown starts with a negotiation you lose.',
  },
  {
    stat: '0 options',
    label: 'AT MIDNIGHT',
    desc: 'The moment you need a tow most, nobody picks up.',
  },
]

/* ────────────────────────────────────────────────── */
/*  Single word that fades in based on scroll         */
/* ────────────────────────────────────────────────── */
function ScrollWord({ progress, range, children }: { progress: import('framer-motion').MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.08, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  )
}

/* ────────────────────────────────────────────────── */
/*  Paragraph that reveals word-by-word on scroll     */
/* ────────────────────────────────────────────────── */
function ScrollRevealParagraph({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.95', 'start 0.25'],
  })

  const words = text.split(' ')

  return (
    <p ref={containerRef} className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <span key={`${word}-${i}`} className="mr-[0.3em] last:mr-0">
            <ScrollWord progress={scrollYProgress} range={[start, end]}>
              {word}
            </ScrollWord>
          </span>
        )
      })}
    </p>
  )
}

/* ────────────────────────────────────────────────── */
/*  Main HomePage component                           */
/* ────────────────────────────────────────────────── */
export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0)
  const reduceMotion = useReducedMotion()

  /* ── Global scroll progress for background transitions ── */
  const { scrollYProgress: pageScroll } = useScroll()

  const pageBackground = useTransform(
    pageScroll,
    [0, 0.12, 0.18, 0.70, 0.82, 1],
    ['#F5F2EB', '#F5F2EB', '#0A0A0A', '#0A0A0A', '#F5F2EB', '#F5F2EB']
  )

  const sectionTextColor = useTransform(
    pageScroll,
    [0, 0.12, 0.18, 0.70, 0.82, 1],
    ['#111111', '#111111', '#EAEAEA', '#EAEAEA', '#111111', '#111111']
  )

  const mutedColor = useTransform(
    pageScroll,
    [0, 0.12, 0.18, 0.70, 0.82, 1],
    ['#7A7A7A', '#7A7A7A', '#999999', '#999999', '#7A7A7A', '#7A7A7A']
  )

  const borderColor = useTransform(
    pageScroll,
    [0, 0.12, 0.18, 0.70, 0.82, 1],
    ['rgba(0,0,0,0.08)', 'rgba(0,0,0,0.08)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)', 'rgba(0,0,0,0.08)', 'rgba(0,0,0,0.08)']
  )

  const cardBg = useTransform(
    pageScroll,
    [0, 0.12, 0.18, 0.70, 0.82, 1],
    ['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.7)']
  )

  return (
    <>
      {/* Fixed background layer for the surreal static-color-shift effect */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{ backgroundColor: pageBackground }}
      />
      
      {/* Scrollable content layer */}
      <motion.div
        className="relative transition-opacity duration-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        style={{ color: sectionTextColor }}
      >
      {/* ═══════════════════════════════════════════════════ */}
      {/*  SECTION 1 — HERO: Minimal, centered, storytelling */}
      {/* ═══════════════════════════════════════════════════ */}
      <section
        id="homepage-hero"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        {/* Subtle gradient orb — orange */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-40 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.25) 0%, transparent 70%)' }}
          aria-hidden
        />

        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10"
        >
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-tow-muted sm:text-sm">
            TOWNOW / ROADSIDE ASSISTANCE
          </p>
          <h1 className="font-serif text-5xl font-bold leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
            Tow trucks.
            <br />
            <span className="text-[#FF6B35]">
              <Typewriter
                options={{
                  strings: ['On demand.', 'Right now.', 'Anywhere.'],
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  deleteSpeed: 40,
                }}
              />
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-md text-base text-tow-muted sm:text-lg md:text-xl">
            <span className="font-semibold" style={{ color: '#E85D31' }}>Flat pricing</span> — no haggling, no surprises.
            <br />
            Available 24/7 across Ghana.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#the-product"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#E85D31] hover:shadow-xl sm:text-base"
            >
              See how it works
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-tow-muted">Scroll</span>
          <motion.svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-tow-muted"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </motion.svg>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  SECTION 2 — THE PROBLEM: Word-by-word scroll reveal */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative px-6 py-28 sm:py-36 md:py-44">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            className="mb-8 text-xs font-medium uppercase tracking-[0.25em]"
            style={{ color: mutedColor }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            THE PROBLEM
          </motion.p>

          <ScrollRevealParagraph
            text="Your car breaks down on the Accra motorway. It's 11 PM. And that's when the real nightmare begins."
            className="font-serif text-4xl font-bold leading-[1.25] sm:text-5xl md:text-6xl"
          />
        </div>

        {/* Pain-point cards */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-3 sm:mt-20">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.stat}
              className="rounded-3xl p-7 sm:p-8 backdrop-blur-sm"
              style={{ backgroundColor: cardBg, borderColor, borderWidth: 1, borderStyle: 'solid' }}
              initial={reduceMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.15 * i, duration: 0.55, ease: 'easeOut' }}
            >
              <p className="font-serif text-4xl font-bold italic sm:text-5xl" style={{ color: '#FF6B35' }}>
                {point.stat}
              </p>
              <motion.p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: mutedColor }}>
                {point.label}
              </motion.p>
              <motion.p className="mt-4 text-sm leading-relaxed" style={{ color: mutedColor }}>
                {point.desc}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  SECTION 3 — THE ANSWER: Word-by-word scroll reveal */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative px-6 py-28 sm:py-36 md:py-44">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            className="mb-8 text-xs font-medium uppercase tracking-[0.25em]"
            style={{ color: mutedColor }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            THE ANSWER
          </motion.p>

          <ScrollRevealParagraph
            text="One tap. A tow truck is on its way. Flat fare. Always."
            className="font-serif text-4xl font-bold leading-[1.25] sm:text-5xl md:text-6xl"
          />

          <motion.p
            className="mx-auto mt-10 max-w-lg text-lg sm:text-xl"
            style={{ color: mutedColor }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            TowNow connects you to verified tow truck drivers instantly. No calls, no haggling, no uncertainty.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  SECTION 4 — THE PRODUCT: Sticky phone + features  */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="the-product" className="relative px-6 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center sm:mb-20">
            <motion.p
              className="mb-4 text-xs font-medium uppercase tracking-[0.25em]"
              style={{ color: mutedColor }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              THE PRODUCT
            </motion.p>
            <motion.h2
              className="font-serif text-4xl font-bold sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              See it in action.
            </motion.h2>
          </div>

          <div className="grid gap-16 md:grid-cols-2 lg:gap-24">
            {/* Sticky phone mockup */}
            <div className="top-28 h-fit md:sticky lg:top-32">
              <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#111] p-5 shadow-[0_0_80px_rgba(0,0,0,0.4)] sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#FF6B35]" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF9F73]">
                    {`0${activeFeature + 1}`} / RIDER APP
                  </p>
                </div>
                <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[2rem] bg-zinc-900 sm:max-w-none" style={{ maxHeight: 'min(650px, 70vh)' }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeFeature}
                      src={homeFeatureImages[activeFeature]}
                      alt={features[activeFeature]}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      loading="lazy"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-x-4 bottom-5 rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-center text-sm font-medium text-white shadow-lg backdrop-blur-xl">
                    {features[activeFeature]}
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable feature list */}
            <div className="space-y-8 pb-20 pt-10 md:pt-40">
              {features.map((feature, index) => (
                <motion.article
                  key={feature}
                  tabIndex={0}
                  initial={reduceMotion ? {} : { opacity: 0.2, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-10% 0px -40% 0px' }}
                  onViewportEnter={() => setActiveFeature(index)}
                  className={`cursor-pointer rounded-[2rem] p-8 sm:p-10 transition-all duration-500 outline-none border ${
                    activeFeature === index
                      ? 'border-[#FF6B35]/30 bg-white/10 shadow-2xl backdrop-blur-lg'
                      : 'border-transparent hover:border-white/10 hover:bg-white/5'
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                  onFocus={() => setActiveFeature(index)}
                  onClick={() => setActiveFeature(index)}
                >
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] mb-3 transition-colors duration-500 ${
                    activeFeature === index ? 'text-[#FF9F73]' : 'text-zinc-500'
                  }`}>
                    {`0${index + 1}`}
                  </p>
                  <h3 className={`font-serif text-3xl font-bold sm:text-4xl transition-colors duration-500 ${
                    activeFeature === index ? 'text-white' : 'text-zinc-500'
                  }`}>
                    {feature}
                  </h3>
                  <p className={`mt-4 text-base leading-relaxed sm:text-lg transition-colors duration-500 ${
                    activeFeature === index ? 'text-zinc-300' : 'text-zinc-600'
                  }`}>
                    {index === 0 && 'Watch your tow truck approach with live GPS. Know exactly when help arrives.'}
                    {index === 1 && 'See the price before you confirm. No surge, no surprises. Flat fares, always.'}
                    {index === 2 && 'Every driver is background-checked and rated. Your safety is non-negotiable.'}
                    {index === 3 && "Day or night, rain or shine. We're always one tap away."}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  SECTION 5 — VISUAL STORIES: Full-bleed immersive  */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="space-y-0">
        {[
          { text: 'Breakdowns happen. Anywhere. Anytime.', image: imageAssets.storyOne },
          { text: 'TowNow connects you instantly to nearby help.', image: imageAssets.storyTwo },
          { text: 'Track your tow truck in real-time.', image: imageAssets.storyThree },
        ].map((story) => (
          <div
            key={story.text}
            className="relative flex min-h-[55vh] items-center justify-center overflow-hidden sm:min-h-[65vh] md:min-h-[80vh]"
          >
            <motion.img
              src={story.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={reduceMotion ? {} : { scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/50 to-black/30" />
            <motion.h3
              className="relative max-w-4xl px-6 text-center font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl"
              initial={reduceMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {story.text}
            </motion.h3>
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  SECTION 6 — FOR DRIVERS: CTA banner               */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="driver" className="relative px-6 py-24 text-white sm:py-32 lg:py-40">
        <img
          src={imageAssets.driverFleet}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p
            className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[#FF9F73]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            FOR DRIVERS
          </motion.p>
          <motion.h2
            className="font-serif text-4xl font-bold sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Earn with TowNow
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg text-zinc-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Flexible work, consistent requests, and real-time earnings visibility. Join the network of verified tow truck drivers.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              to="/driver"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/40 sm:text-base"
            >
              Join as a Driver
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  SECTION 7 — DOWNLOAD CTA: Final section           */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="download" className="relative px-6 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            className="mb-6 text-xs font-medium uppercase tracking-[0.25em]"
            style={{ color: mutedColor }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            GET STARTED
          </motion.p>
          <motion.h2
            className="font-serif text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Download TowNow.
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-lg text-base sm:text-lg"
            style={{ color: mutedColor }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Get instant access to trusted tow support anywhere, any time.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <a
              href="#download"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#E85D31] hover:shadow-xl sm:text-base"
            >
              Download App
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-sm font-semibold transition-all hover:bg-white/5 sm:text-base"
              style={{ borderColor: 'currentColor', opacity: 0.7 }}
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
    </>
  )
}
