import { Link, NavLink, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-lg px-1 py-0.5 text-sm font-medium text-zinc-900 transition-colors',
    'hover:bg-black/[0.04] hover:text-tow-primary',
    isActive ? 'font-semibold text-tow-primary' : '',
  ].join(' ')

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation()
  const isHomepage = pathname === '/'

  const [headerVisible, setHeaderVisible] = useState(!isHomepage)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const updateHeaderFromScroll = useCallback(() => {
    if (!isHomepage) {
      setHeaderVisible(true)
      return
    }
    const hero = document.getElementById('homepage-hero')
    if (!hero) {
      setHeaderVisible(false)
      return
    }
    // True once the hero section has fully scrolled above the viewport top; false again when scrolling back into the hero.
    const heroBottom = hero.getBoundingClientRect().bottom
    const pastHero = heroBottom <= 1
    setHeaderVisible(pastHero)
  }, [isHomepage])

  useLayoutEffect(() => {
    if (!isHomepage) {
      setHeaderVisible(true)
      return
    }
    setHeaderVisible(false)
    updateHeaderFromScroll()
  }, [isHomepage, pathname, updateHeaderFromScroll])

  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isHomepage) return
    const run = () => {
      requestAnimationFrame(updateHeaderFromScroll)
    }
    window.addEventListener('scroll', run, { passive: true })
    window.addEventListener('resize', run)
    return () => {
      window.removeEventListener('scroll', run)
      window.removeEventListener('resize', run)
    }
  }, [isHomepage, updateHeaderFromScroll])

  useEffect(() => {
    if (!mobileNavOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileNavOpen])

  useEffect(() => {
    if (!mobileNavOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileNavOpen])

  return (
    <div className="min-h-screen text-tow-ink">
      <div className="relative z-10 bg-tow-bg transition-colors duration-700 min-h-screen">
        <header
          className={`fixed inset-x-0 top-0 z-50 border-b border-tow-border/50 bg-tow-surface/70 backdrop-blur-lg shadow-sm transition-[transform,opacity] duration-300 ease-out ${
            isHomepage && !headerVisible
              ? '-translate-y-full opacity-0 pointer-events-none'
              : 'translate-y-0 opacity-100'
          }`}
          aria-hidden={isHomepage && !headerVisible ? true : undefined}
        >
          <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-14 lg:py-4">
            <Link to="/" className="text-lg font-extrabold tracking-tight text-tow-ink sm:text-xl">
              TowNow
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-900 shadow-sm md:hidden"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-site-nav"
              onClick={() => setMobileNavOpen((o) => !o)}
            >
              <span className="sr-only">{mobileNavOpen ? 'Close menu' : 'Open menu'}</span>
              {mobileNavOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
            <nav
              className="hidden flex-wrap items-center justify-end gap-2 text-sm font-medium sm:gap-3 md:flex lg:gap-5"
              aria-label="Main"
            >
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/driver" className={navLinkClass}>
                Driver
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </nav>
          </div>
          {mobileNavOpen ? (
            <>
              <button
                type="button"
                className="fixed inset-0 top-14 z-40 bg-zinc-950/40 backdrop-blur-[2px] md:hidden"
                aria-label="Close menu"
                onClick={() => setMobileNavOpen(false)}
              />
              <nav
                id="mobile-site-nav"
                className="absolute left-0 right-0 top-full z-50 flex flex-col gap-1 border-b border-zinc-200 bg-[#FAFAF9] px-4 py-3 shadow-lg sm:px-6 md:hidden"
                aria-label="Mobile"
              >
                <NavLink
                  to="/"
                  end
                  className={(p) => [navLinkClass(p), 'block rounded-lg px-3 py-2.5'].join(' ')}
                  onClick={() => setMobileNavOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className={(p) => [navLinkClass(p), 'block rounded-lg px-3 py-2.5'].join(' ')}
                  onClick={() => setMobileNavOpen(false)}
                >
                  About
                </NavLink>
                <NavLink
                  to="/driver"
                  className={(p) => [navLinkClass(p), 'block rounded-lg px-3 py-2.5'].join(' ')}
                  onClick={() => setMobileNavOpen(false)}
                >
                  Driver
                </NavLink>
                <NavLink
                  to="/contact"
                  className={(p) => [navLinkClass(p), 'block rounded-lg px-3 py-2.5'].join(' ')}
                  onClick={() => setMobileNavOpen(false)}
                >
                  Contact
                </NavLink>
              </nav>
            </>
          ) : null}
        </header>
        {/* On inner pages the bar is always shown—offset content. On homepage the hero is full-bleed; the bar overlays once you scroll past it. */}
        {!isHomepage ? <div className="h-14 shrink-0 sm:h-[72px] lg:h-[76px]" aria-hidden /> : null}
        <main>{children}</main>
      </div>

      {/* Fixed Footer: Revealed like a curtain when the z-10 main content scrolls up */}
      <footer className="sticky bottom-0 -z-10 bg-zinc-950 py-10 px-6 text-zinc-400 sm:px-12 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="lg:col-span-2">
              <Link to="/" className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
                TowNow
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
                On-demand roadside assistance. Flat fares. Fast response times. Making breakdowns slightly less of a nightmare.
              </p>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Company</h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li><Link to="/about" className="transition-colors hover:text-[#FF6B35]">About</Link></li>
                <li><Link to="/driver" className="transition-colors hover:text-[#FF6B35]">Drive with Us</Link></li>
                <li><Link to="/contact" className="transition-colors hover:text-[#FF6B35]">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Legal</h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li><Link to="/privacy" className="transition-colors hover:text-[#FF6B35]">Privacy Policy</Link></li>
                <li><a href="#" className="transition-colors hover:text-[#FF6B35]">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-zinc-800 pt-6 sm:flex-row">
            <p className="text-xs text-zinc-500">
              &copy; {new Date().getFullYear()} TowNow Technologies, Inc. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 transition-colors hover:text-[#FF6B35]" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 0.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-zinc-400 transition-colors hover:text-[#FF6B35]" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
