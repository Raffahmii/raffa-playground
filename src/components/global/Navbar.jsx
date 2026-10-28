import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { motion, AnimatePresence } from 'framer-motion'
import { site, isFilled } from '../../config/site'
import Magnetic from '../ui/Magnetic'
import { useSound } from '../../hooks/useSound'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [clock, setClock] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const root = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const playSound = useSound()

  useEffect(() => {
    const f = () => setClock(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: site.timezone }))
    f()
    const i = setInterval(f, 30000)
    const k = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => {
      clearInterval(i)
      window.removeEventListener('keydown', k)
    }
  }, [])

  // Animasi Masuk/Keluar Terpisah
  useGSAP(() => {
    const tl = gsap.timeline()
    
    if (open) {
      window.__lenis?.stop()
      tl.set('.menu-wrapper', { visibility: 'visible' })
      
      // Desktop Animation (Split Screen)
      tl.to('.menu-l', { yPercent: 0, duration: 1.2, ease: 'power4.inOut' })
        .to('.menu-r', { yPercent: 0, duration: 1.2, ease: 'power4.inOut' }, '<0.15')
        .to('.menu-item-text', { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.08, duration: 1, ease: 'power3.out' }, '-=0.8')
        .to('.menu-number', { opacity: 1, x: 0, stagger: 0.08, duration: 1, ease: 'power3.out' }, '<')

      // Mobile Animation (Full Screen Slide)
      tl.to('.menu-mobile', { yPercent: 0, duration: 0.8, ease: 'power4.inOut' }, 0)
        .to('.menu-mobile-content', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.4)
    } else {
      window.__lenis?.start()
      
      // Desktop Close
      tl.to('.menu-item-text', { yPercent: -100, rotate: -5, opacity: 0, duration: 0.4, ease: 'power2.in' })
        .to('.menu-number', { opacity: 0, x: -20, duration: 0.4, ease: 'power2.in' }, '<')
        .to(['.menu-l', '.menu-r'], { yPercent: -100, duration: 1.2, ease: 'power4.inOut' }, '+=0.1')
      
      // Mobile Close
      tl.to('.menu-mobile-content', { opacity: 0, y: 20, duration: 0.3 }, 0)
        .to('.menu-mobile', { yPercent: -100, duration: 0.6, ease: 'power4.inOut' }, 0.1)
        
      tl.set('.menu-wrapper', { visibility: 'hidden' })
    }
  }, { dependencies: [open], scope: root })

  // Set state awal pas pertama load
  useGSAP(() => {
    gsap.set(['.menu-l', '.menu-r'], { yPercent: -100 })
    gsap.set('.menu-mobile', { yPercent: -100 })
    gsap.set('.menu-mobile-content', { opacity: 0, y: 20 })
    gsap.set(['.menu-item-text', '.menu-number'], { yPercent: 100, opacity: 0 })
  }, { scope: root })

  const go = (hash) => {
    playSound()
    setOpen(false)
    setIsTransitioning(true)
    setTimeout(() => {
      if (pathname !== '/') {
        navigate('/')
        setTimeout(() => window.__lenis?.scrollTo(hash), 800)
      } else {
        window.__lenis?.scrollTo(hash)
      }
      setIsTransitioning(false)
    }, 1200) 
  }

  const handleMenuToggle = () => {
    playSound()
    setOpen((o) => !o)
  }

  return (
    <div ref={root}>
      {/* ANIMASI LINGKARAN EXIT */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none">
            <motion.div 
              initial={{ height: 0 }} animate={{ height: '100vh' }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute w-1.5 bg-rose z-10" 
            />
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 3 }} exit={{ opacity: 0, scale: 4 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="absolute h-[100vw] w-[100vw] rounded-full bg-burgundy z-20 shadow-2xl" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-6 py-5 md:px-16">
        <Link to="/" onClick={(e) => { e.preventDefault(); go(0); }} aria-label="Home" data-cursor="Home" className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink shadow-lg transition-transform hover:scale-105">
          <img src="/brand/monogram-r.svg" alt="" className="h-6 w-6" />
        </Link>
        
        <span className="label hidden text-cream/90 drop-shadow-md md:block">{site.location} · {clock}</span>
        
        <Magnetic strength={0.2}>
          <button 
            onClick={handleMenuToggle} 
            aria-expanded={open} 
            className={`group flex h-11 items-center gap-2 rounded-full border-2 px-6 text-[15px] font-bold shadow-lg transition-all duration-300 ${
              open ? 'border-claret bg-claret text-cream' : 'border-cream/50 bg-ink/20 backdrop-blur-sm text-cream hover:border-rose hover:text-rose'
            }`}
          >
            {open ? 'Close' : 'Menu'}
            <span className="flex h-4 w-4 flex-col justify-between overflow-hidden">
              <span className={`block h-0.5 w-full bg-current transition-transform duration-300 ${open ? 'translate-y-[7px] rotate-45' : 'group-hover:-translate-y-1'}`} />
              <span className={`block h-0.5 w-full bg-current transition-opacity duration-300 ${open ? 'opacity-0' : 'group-hover:opacity-100'}`} />
              <span className={`block h-0.5 w-full bg-current transition-transform duration-300 ${open ? '-translate-y-[7px] -rotate-45' : 'group-hover:translate-y-1'}`} />
            </span>
          </button>
        </Magnetic>
      </header>

      {/* MENU WRAPPER (Biar gampang di-toggle visibility-nya) */}
      <div className="menu-wrapper invisible fixed inset-0 z-50">
        
        {/* ======================================================== */}
        {/* MENU DESKTOP (Split Screen 60/40) - Sembunyi di Mobile */}
        {/* ======================================================== */}
        <div className="hidden h-full w-full md:flex" role="dialog" aria-label="Desktop Menu">
          <div className="menu-l relative flex h-full w-[60%] flex-col justify-center bg-[#3A0E19] px-16">
            <ul className="flex flex-col gap-4">
              {site.nav.map(([n, t, h]) => (
                <li key={t} className="overflow-hidden group">
                  <motion.button 
                    whileHover="hover" onClick={() => go(h)} data-cursor="Go" 
                    className="flex w-full items-baseline gap-6 text-left"
                  >
                    <span className="menu-number label text-sm font-bold text-rose/60 transition-colors group-hover:text-blush">
                      {n}
                    </span>
                    <motion.span 
                      variants={{ hover: { x: 20, color: '#E4607A', transition: { type: 'spring', stiffness: 300, damping: 15 } } }}
                      className="menu-item-text block font-display text-[8vw] font-extrabold leading-[1.1] text-cream"
                    >
                      {t}
                    </motion.span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          <div className="menu-r relative flex h-full w-[40%] flex-col justify-center bg-[#F5EBDD] px-16 text-[#140A0C]" style={{ backgroundImage: 'url(/textures/contour.svg)', backgroundSize: 'cover' }}>
            <div className="space-y-12">
              <div>
                <p className="label text-claret mb-2">EMAIL</p>
                <button onClick={() => { playSound(); navigator.clipboard?.writeText(site.contact.email) }} className="text-left font-display text-4xl font-extrabold hover:text-claret transition-colors">
                  {site.contact.email}
                </button>
              </div>
              <div>
                <p className="label text-claret mb-4">SOCIAL</p>
                <ul className="flex flex-col gap-3 font-display text-3xl font-extrabold">
                  {[['LinkedIn', site.contact.linkedin], ['GitHub', site.contact.github], ['WhatsApp', `https://wa.me/${site.contact.whatsapp}`], ['Download CV', site.contact.cv]].map(([label, url]) => (
                    <li key={label}>
                      <a href={isFilled(url) ? url : '#'} target="_blank" rel="noreferrer" onClick={playSound} className="inline-flex items-center gap-2 hover:text-claret transition-transform hover:translate-x-2">
                        {label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8 border-t border-[#140A0C]/10">
                {site.availability.show && (
                  <p className="flex w-fit items-center gap-2 rounded-full border border-[#140A0C]/20 px-4 py-2 text-sm font-medium mb-4">
                    <i className="h-2 w-2 rounded-full bg-[#4CAF7A]" />{site.availability.text}
                  </p>
                )}
                <p className="label opacity-50">[{site.location}] · {clock}</p>
              </div>
              <div className="pt-4">
                <img src="/brand/woodmark-raffa.svg" alt="Raffa" className="h-16 w-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MENU MOBILE (Full Screen) - Sembunyi di Desktop */}
        {/* ======================================================== */}
        <div className="menu-mobile flex h-full w-full flex-col justify-between overflow-y-auto bg-[#3A0E19] px-8 py-24 md:hidden" role="dialog" aria-label="Mobile Menu">
          <div className="menu-mobile-content flex-1">
            <p className="label mb-8 text-rose/60">Navigation</p>
            <ul className="flex flex-col gap-2">
              {site.nav.map(([n, t, h]) => (
                <li key={t} className="border-b border-cream/10 pb-3 pt-3">
                  <button onClick={() => go(h)} className="flex w-full items-baseline gap-4 text-left">
                    <span className="label text-sm font-bold text-rose">{n}</span>
                    <span className="font-display text-4xl font-extrabold text-cream">{t}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="menu-mobile-content mt-12 space-y-8">
            <div>
              <p className="label text-rose mb-1">EMAIL</p>
              <button onClick={() => { playSound(); navigator.clipboard?.writeText(site.contact.email) }} className="text-left font-display text-xl font-bold text-cream">
                {site.contact.email}
              </button>
            </div>
            
            <div>
              <p className="label text-rose mb-3">SOCIAL</p>
              <div className="flex flex-wrap gap-3">
                {[['LinkedIn', site.contact.linkedin], ['GitHub', site.contact.github], ['WA', `https://wa.me/${site.contact.whatsapp}`], ['CV', site.contact.cv]].map(([label, url]) => (
                  <a 
                    key={label}
                    href={isFilled(url) ? url : '#'} 
                    target="_blank" 
                    rel="noreferrer" 
                    onClick={playSound}
                    className="flex h-12 items-center rounded-full border border-cream/30 bg-cream/5 px-5 text-sm font-semibold text-cream backdrop-blur-sm active:scale-95 transition-transform"
                  >
                    {label} ↗
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-cream/10">
              {site.availability.show && (
                <p className="flex w-fit items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-xs font-medium mb-4 text-cream">
                  <i className="h-2 w-2 rounded-full bg-[#4CAF7A]" />{site.availability.text}
                </p>
              )}
              <p className="label opacity-50">[{site.location}] · {clock}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}