import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import Typewriter from 'typewriter-effect'
import MagneticButton from '../components/MagneticButton'
import DeviceFrame from '../components/DeviceFrame'
import {
  features,
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
    stat: 'Zero options',
    label: 'AT MIDNIGHT',
    desc: 'The moment you need a tow most, nobody picks up.',
  },
]

/* ────────────────────────────────────────────────── */
/*  Single word that fades in based on scroll         */
/* ────────────────────────────────────────────────── */
function ScrollWord({ progress, range, children }: { progress: import('framer-motion').MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.25, 1])
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
    offset: ['start 0.8', 'start 0.4'],
  })
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const words = text.split(' ')

  return (
    <p ref={containerRef} className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <span key={`${word}-${i}`} className="mr-[0.3em] last:mr-0">
            <ScrollWord progress={smoothScroll} range={[start, end]}>
              {word}
            </ScrollWord>
          </span>
        )
      })}
    </p>
  )
}

/* ────────────────────────────────────────────────── */
/*  Number Counter Component                          */
/* ────────────────────────────────────────────────── */
function NumberCounter({ to }: { to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)

  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ['start 0.9', 'start 0.4'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const numberValue = useTransform(smoothProgress, [0, 1], [0, to])

  useEffect(() => {
    return numberValue.on('change', (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = Math.round(latest).toLocaleString() + '+'
      }
    })
  }, [numberValue])

  return <span ref={nodeRef}>0+</span>
}

/* ────────────────────────────────────────────────── */
/*  Horizontal Video Scroll Component                 */
/* ────────────────────────────────────────────────── */
function HorizontalScrollVideos() {
  const targetRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // 3 items -> to scroll to the last item, we shift left by 200vw or ~66.66% of the track.
  const x = useTransform(smoothScroll, [0, 1], ['0%', '-66.666%'])

  // Use smoothScroll to determine active video for opacity dimming
  const opacity1 = useTransform(smoothScroll, [0, 0.25], [1, 0.4])
  const opacity2 = useTransform(smoothScroll, [0.15, 0.5, 0.85], [0.4, 1, 0.4])
  const opacity3 = useTransform(smoothScroll, [0.75, 1], [0.4, 1])

  const videos = [
    { text: 'Breakdowns happen. Anywhere. Anytime.', opacity: opacity1 },
    { text: 'TowNow connects you instantly to nearby help.', opacity: opacity2 },
    { text: 'Track your tow truck in real-time.', opacity: opacity3 },
  ]

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x, willChange: 'transform', transform: 'translateZ(0)' }}
          className="flex w-[300vw] items-center px-[5vw] sm:px-[10vw]"
        >
          {videos.map((vid, idx) => (
            <motion.div
              key={idx}
              className="relative flex h-[60vh] w-[80vw] sm:w-[60vw] mx-auto shrink-0 flex-col justify-center rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl mr-[10vw]"
              style={{ opacity: vid.opacity, willChange: 'opacity' }}
            >
              {/* Placeholder for actual video */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-700">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 mt-auto p-8 sm:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF6B35] mb-3">0{idx + 1} / SEE IT WORK</p>
                <h3 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">{vid.text}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────── */
/*  Bento Box Integrations Component                  */
/* ────────────────────────────────────────────────── */
function BentoBoxIntegrations() {
  return (
    <section className="relative px-6 py-28 sm:py-36 bg-zinc-950 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.p
            className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-zinc-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            MOOLRE INTEGRATION
          </motion.p>
          <motion.h2
            className="font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Every leg of the ride...
          </motion.h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* SMS Card */}
          <motion.div
            className="group relative overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/5 p-8 sm:col-span-2 lg:col-span-1 h-[320px] transition-colors hover:bg-zinc-800/80 hover:border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-white mb-2">SMS Notifications</h3>
              <p className="text-sm text-zinc-400">Keep drivers and riders in the loop with instant updates.</p>

              <div className="mt-auto self-center bg-black border border-white/10 rounded-2xl py-4 px-8 shadow-inner">
                <span className="text-zinc-600 font-mono text-sm mr-3">OTP:</span>
                <span className="font-mono font-bold text-[#FF6B35] tracking-[0.25em] relative text-lg">
                  <span className="opacity-0 transition-opacity duration-700 group-hover:opacity-100">482914</span>
                  <span className="absolute inset-0 bg-[#FF6B35]/20 animate-pulse transition-opacity duration-300 group-hover:opacity-0 rounded" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* USSD Card */}
          <motion.div
            className="group relative overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/5 p-8 sm:col-span-1 lg:col-span-1 h-[320px] transition-colors hover:bg-zinc-800/80 hover:border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-white mb-2">USSD Access</h3>
              <p className="text-sm text-zinc-400">Request a tow without internet. Fast and reliable.</p>

              <div className="mt-auto self-center relative">
                <div className="bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF9F73] font-mono text-2xl font-bold rounded-2xl py-4 px-8 cursor-pointer transition-transform group-hover:scale-105">
                  *919*4007#
                </div>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold py-1.5 px-4 rounded-lg opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-xl">
                  Copy
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payments Card */}
          <motion.div
            className="group relative overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/5 p-8 sm:col-span-1 lg:col-span-1 h-[320px] transition-colors hover:bg-zinc-800/80 hover:border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-white mb-2">Automated Payouts</h3>
              <p className="text-sm text-zinc-400">Instant disbursements to drivers upon completion.</p>

              <div className="mt-auto relative h-20 flex items-center justify-center bg-black/40 rounded-2xl border border-white/5">
                <div className="flex items-center gap-6 text-[#FF6B35]">
                  {/* User Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>

                  {/* Flowing dots */}
                  <div className="relative w-20 h-[2px] bg-white/5 overflow-hidden rounded-full">
                    <motion.div
                      className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ x: ['-100%', '300%'] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    />
                  </div>

                  {/* Truck/Driver Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FF6B35]"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────── */
/*  Main HomePage component                           */
/* ────────────────────────────────────────────────── */
export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0)
  const reduceMotion = useReducedMotion()

  /* ── Global scroll progress for background transitions ── */
  const { scrollYProgress: rawPageScroll } = useScroll()
  const pageScroll = useSpring(rawPageScroll, { stiffness: 100, damping: 30, restDelta: 0.001 })

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

  const heroY = useTransform(pageScroll, [0, 0.15], [0, -150])
  const heroOpacity = useTransform(pageScroll, [0, 0.15], [1, 0])

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }

  const lineUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  }

  const pageScale = useTransform(pageScroll, [0, 0.15], [1, 0.96])
  const pageBorderRadius = useTransform(pageScroll, [0, 0.15], [0, 32])

  return (
    <>
      {/* Absolute background layer for the surreal static-color-shift effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: pageBackground }}
      />

      {/* Scrollable content layer (No transforms here to preserve sticky positioning below) */}
      <motion.div
        className="relative transition-opacity duration-700 text-tow-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        style={{ color: sectionTextColor }}
      >

        {/* We wrap the first sections in the scale effect so it zooms out, but leave the sticky sections outside! */}
        <motion.div
          className="bg-tow-bg origin-top shadow-2xl relative z-20"
          style={{ scale: pageScale, borderRadius: pageBorderRadius }}
        >
          {/* ═══════════════════════════════════════════════════ */}
          {/*  SECTION 1 — HERO: Minimal, centered, storytelling */}
          {/* ═══════════════════════════════════════════════════ */}
          <section
            id="homepage-hero"
            className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
          >
            {/* Subtle gradient orb — optimized to remove blur filter */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full opacity-40"
              style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, rgba(255,107,53,0.05) 40%, transparent 70%)' }}
              aria-hidden
            />

            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="relative z-10"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <div className="overflow-hidden mb-6">
                  <motion.p variants={lineUp} className="text-xs font-medium uppercase tracking-[0.25em] text-tow-muted sm:text-sm">
                    TOWNOW
                  </motion.p>
                </div>

                <div className="overflow-hidden">
                  <motion.h1 variants={lineUp} className="font-serif text-5xl font-bold leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
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
                  </motion.h1>
                </div>

                <div className="overflow-hidden mt-8">
                  <motion.p variants={lineUp} className="mx-auto max-w-md text-base text-tow-muted sm:text-lg md:text-xl">
                    <span className="font-semibold" style={{ color: '#E85D31' }}>Flat pricing</span> — no haggling, no surprises.
                    <br />
                    Available 24/7 across Ghana.
                  </motion.p>
                </div>

                <motion.div variants={lineUp} className="mt-10 flex flex-wrap justify-center gap-4">
                  <MagneticButton
                    to="/book"
                    className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#E85D31] sm:text-base cursor-none"
                  >
                    Book a Tow
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </MagneticButton>
                </motion.div>
              </motion.div>
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
                className="font-serif text-4xl font-bold leading-[1.25] sm:text-5xl md:text-6xl text-black"
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
                  whileHover={{
                    y: -6,
                    borderColor: 'rgba(255, 107, 53, 0.5)',
                    boxShadow: '0 20px 40px -10px rgba(255, 107, 53, 0.15)'
                  }}
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
                className="font-serif text-4xl font-bold leading-[1.25] sm:text-5xl md:text-6xl text-black"
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
        </motion.div>

        {/* The rest of the page remains unscaled to prevent sticky positioning glitches */}

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
              {/* Sticky phone mockup using DeviceFrame */}
              <div className="top-28 h-fit md:sticky lg:top-32">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#FF6B35]" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF9F73]">
                    {activeFeature <= 1 ? 'RIDER APP DEMO' : 'DRIVER APP DEMO'}
                  </p>
                </div>

                <DeviceFrame>
                  <div className="relative w-full h-full bg-zinc-900">
                    {/* Rider App Video (Placeholder) */}
                    <video
                      src="https://www.w3schools.com/html/mov_bbb.mp4"
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${activeFeature <= 1 ? 'opacity-100' : 'opacity-0'}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    {/* Driver App Video (Placeholder) */}
                    <video
                      src="https://www.w3schools.com/html/mov_bbb.mp4"
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${activeFeature > 1 ? 'opacity-100' : 'opacity-0'}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ filter: 'hue-rotate(90deg)' }} /* Just to differentiate placeholder visually */
                    />

                    {/* Overlay feature text */}
                    <div className="absolute inset-x-4 bottom-5 rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-center text-sm font-medium text-white shadow-lg backdrop-blur-xl transition-all duration-300">
                      {features[activeFeature]}
                    </div>
                  </div>
                </DeviceFrame>
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
                    className={`cursor-pointer rounded-[2rem] p-8 sm:p-10 transition-all duration-500 outline-none border ${activeFeature === index
                      ? 'border-[#FF6B35]/30 bg-white/10 shadow-2xl backdrop-blur-lg'
                      : 'border-transparent hover:border-white/10 hover:bg-white/5'
                      }`}
                    onMouseEnter={() => setActiveFeature(index)}
                    onFocus={() => setActiveFeature(index)}
                    onClick={() => setActiveFeature(index)}
                  >
                    <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] mb-3 transition-colors duration-500 ${activeFeature === index ? 'text-[#FF9F73]' : 'text-zinc-500'
                      }`}>
                      {`0${index + 1}`}
                    </p>
                    <h3 className={`font-serif text-3xl font-bold sm:text-4xl transition-colors duration-500 ${activeFeature === index ? 'text-white' : 'text-zinc-500'
                      }`}>
                      {feature}
                    </h3>
                    <p className={`mt-4 text-base leading-relaxed sm:text-lg transition-colors duration-500 ${activeFeature === index ? 'text-zinc-300' : 'text-zinc-600'
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
        {/*  SECTION 4.5 — STATS: Number counter             */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative px-6 py-28 sm:py-36 md:py-44 overflow-hidden">
          {/* Subtle glowing radial background - optimized */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-[800px] w-[800px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, rgba(255,107,53,0.05) 40%, transparent 70%)' }} />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.p
              className="mb-12 text-xs font-medium uppercase tracking-[0.25em]"
              style={{ color: mutedColor }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              REAL DEMAND, DAY ONE
            </motion.p>

            <div className="grid gap-12 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="font-serif text-6xl font-bold sm:text-7xl md:text-8xl text-white">
                  <NumberCounter to={5000} />
                </h3>
                <p className="mt-4 text-sm font-medium uppercase tracking-widest text-tow-muted">Active Users</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h3 className="font-serif text-6xl font-bold sm:text-7xl md:text-8xl text-[#FF6B35]">
                  <NumberCounter to={12000} />
                </h3>
                <p className="mt-4 text-sm font-medium uppercase tracking-widest text-tow-muted">Successful Tows</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/*  SECTION 5 — VISUAL STORIES: Horizontal Video Scroll */}
        {/* ═══════════════════════════════════════════════════ */}
        <HorizontalScrollVideos />

        {/* ═══════════════════════════════════════════════════ */}
        {/*  SECTION 5.5 — BENTO BOX: Moolre Integrations      */}
        {/* ═══════════════════════════════════════════════════ */}
        <BentoBoxIntegrations />

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
              <MagneticButton
                to="/driver"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/40 sm:text-base cursor-none"
              >
                Join as a Driver
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </MagneticButton>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
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
