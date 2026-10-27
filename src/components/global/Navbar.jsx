import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { site, isFilled } from '../../config/site'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [clock, setClock] = useState('')
  const root = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

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

  useGSAP(() => { gsap.set(['.menu-l', '.menu-r'], { yPercent: -100 }) }, { scope: root })

  useGSAP(() => {
    const tl = gsap.timeline()
    if (open) {
      window.__lenis?.stop()
      tl.set('.menu', { visibility: 'visible' })
        .to('.menu-l', { yPercent: 0, duration: 0.7, ease: 'power4.inOut' })
        .to('.menu-r', { yPercent: 0, duration: 0.7, ease: 'power4.inOut' }, '<0.08')
        .from('.menu-item', { yPercent: 100, stagger: 0.07, duration: 0.7, ease: 'power4.out' }, '-=0.3')
    } else {
      window.__lenis?.start()
      tl.to(['.menu-l', '.menu-r'], { yPercent: -100, duration: 0.55, ease: 'power4.inOut' }).set('.menu', { visibility: 'hidden' })
    }
  }, { dependencies: [open], scope: root })

  const go = (hash) => {
    setOpen(false)
    if (pathname !== '/') {
      navigate('/')
      setTimeout(() => window.__lenis?.scrollTo(hash), 400)
    } else setTimeout(() => window.__lenis?.scrollTo(hash), 50)
  }
  const copyEmail = () => navigator.clipboard?.writeText(site.contact.email).catch(() => {})

  return (
    <div ref={root}>
      <header className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-6 py-5 md:px-16">
        <Link to="/" aria-label="Home" data-cursor="Home" className="flex h-11 w-11 items-center justify-center rounded-full bg-cream font-display text-[22px] font-extrabold text-ink">R</Link>
        <span className="label hidden text-cream/70 mix-blend-difference md:block">{site.location} · {clock}</span>
        <div className="flex items-center gap-3">
          <button onClick={() => go('#contact')} className="hidden h-11 rounded-full bg-rose px-7 text-[15px] font-semibold text-ink sm:block">Contact</button>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="h-11 rounded-full border border-white/50 px-6 text-[15px] font-semibold text-white mix-blend-difference">{open ? 'Close' : 'Menu'}</button>
        </div>
      </header>

      <div className="menu invisible fixed inset-0 z-50" role="dialog" aria-label="Menu">
        <div className="menu-l absolute left-0 top-0 h-full w-full bg-wine md:w-[60%]">
          <ul className="menu-list flex h-full flex-col justify-center gap-2 px-6 pt-20 md:px-16">
            {site.nav.map(([n, t, h]) => (
              <li key={t} className="overflow-hidden">
                <button onClick={() => go(h)} data-cursor="Go" className="menu-item menu-btn flex items-baseline gap-6 text-left">
                  <span className="label text-rose">{n}</span>
                  <span className="font-display text-[16vw] font-extrabold leading-[1.05] md:text-[9vw]">{t}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="menu-r absolute right-0 top-0 hidden h-full w-[40%] flex-col justify-center gap-8 bg-cream px-12 text-ink md:flex">
          <div>
            <p className="label text-claret">Email</p>
            <button onClick={copyEmail} className="mt-2 text-left font-display text-3xl font-extrabold">{site.contact.email}</button>
          </div>
          <div>
            <p className="label text-claret">Social</p>
            <ul className="mt-2 font-display text-2xl font-extrabold leading-snug">
              {[['LinkedIn', site.contact.linkedin], ['GitHub', site.contact.github]].map(([t, u]) => (
                <li key={t}><a href={isFilled(u) ? u : '#'} target="_blank" rel="noreferrer">{t} ↗</a></li>
              ))}
              <li><a href={site.contact.cv} download>Download CV ↗</a></li>
            </ul>
          </div>
          {site.availability.show && (
            <p className="flex w-fit items-center gap-2 rounded-full border border-ink/30 px-4 py-2 text-sm"><i className="h-2 w-2 rounded-full bg-[#4CAF7A]" />{site.availability.text}</p>
          )}
          <p className="font-serif text-8xl italic text-claret">Raffa</p>
        </div>
      </div>
    </div>
  )
}
