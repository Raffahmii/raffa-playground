import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import timeline from '../../data/timeline.json'
import certs from '../../data/certificates.json'

export default function Story() {
  const root = useRef(null)
  const wrap = useRef(null)
  const pv = useRef(null)
  const [hov, setHov] = useState(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const n = timeline.length
      gsap.set('.yr', { yPercent: 100, opacity: 0 })
      gsap.set('.sc', { y: 60, opacity: 0 })
      gsap.set('.yr-0', { yPercent: 0, opacity: 1 })
      gsap.set('.sc-0', { y: 0, opacity: 1 })
      gsap.set('.line-fill', { scaleY: 0 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.st-pin', pin: true, scrub: 0.6, start: 'top top', end: '+=' + n * 700 } })
      tl.to('.line-fill', { scaleY: 1, ease: 'none', duration: n - 1 }, 0)
      for (let i = 1; i < n; i++) {
        tl.to(`.yr-${i - 1}`, { yPercent: -100, opacity: 0, duration: 0.4 }, i - 0.5)
          .to(`.sc-${i - 1}`, { y: -60, opacity: 0, duration: 0.4 }, i - 0.5)
          .to(`.yr-${i}`, { yPercent: 0, opacity: 1, duration: 0.4 }, i - 0.3)
          .to(`.sc-${i}`, { y: 0, opacity: 1, duration: 0.4 }, i - 0.3)
      }
    })
  }, { scope: root })

  const move = (e) => {
    const r = wrap.current.getBoundingClientRect()
    gsap.to(pv.current, { x: e.clientX - r.left + 40, y: e.clientY - r.top - 80, duration: 0.4, ease: 'power3.out' })
  }

  return (
    <section id="story" ref={root} className="relative bg-burgundy" style={{ backgroundImage: 'radial-gradient(800px 500px at 80% 80%, rgba(228,96,122,.18), transparent 60%)' }}>
      <div className="st-pin relative px-6 py-24 lg:h-screen lg:px-16 lg:py-0">
        <h2 className="font-display text-[9vw] font-extrabold leading-[1.05] lg:absolute lg:left-16 lg:top-28 lg:max-w-[40vw] lg:text-[2.6vw]">
          I started with curiosity. I stayed for the <span className="font-serif font-normal italic text-blush">process</span>.
        </h2>
        <div className="relative hidden lg:absolute lg:left-16 lg:top-[32vh] lg:block lg:h-[40vh] lg:w-[40vw] lg:overflow-hidden">
          {timeline.map((t, i) => (
            <p key={t.year} className={`yr yr-${i} stroke-text absolute left-0 top-0 font-display text-[17vw] font-extrabold leading-none [--stroke:rgba(245,235,221,.65)]`}>{t.year}</p>
          ))}
        </div>
        <div className="absolute bottom-24 left-[47vw] top-28 hidden w-[2px] bg-cream/20 lg:block">
          <div className="line-fill h-full origin-top bg-rose" />
        </div>
        <div className="mt-10 flex flex-col gap-6 lg:absolute lg:left-[52vw] lg:right-16 lg:top-[26vh] lg:mt-0 lg:block lg:h-[44vh]">
          {timeline.map((t, i) => (
            <article key={t.year} className={`sc sc-${i} rounded-[28px] bg-cream p-8 text-ink lg:absolute lg:inset-x-0 lg:top-0`}>
              <p className="label text-claret">{t.year}</p>
              <h3 className="mt-3 font-display text-4xl font-extrabold leading-none">{t.title}</h3>
              <p className="mt-4 max-w-md text-[17px] text-[#5A4A4E]">{t.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div ref={wrap} onMouseMove={move} onMouseLeave={() => setHov(null)} className="relative px-6 pb-28 pt-12 lg:px-16">
        <p className="label text-blush">Achievements</p>
        <h3 className="mb-6 font-serif text-5xl italic md:text-6xl">Receipts. <span className="font-display text-3xl font-extrabold not-italic md:text-4xl">(Yes, I kept them.)</span></h3>
        <ul>
          {certs.map((c, i) => {
            const inner = (
              <div className={`flex items-center gap-4 border-t border-cream/20 py-5 transition-opacity duration-300 ${hov !== null && hov !== i ? 'opacity-40' : ''}`} onMouseEnter={() => setHov(i)}>
                <span className="label w-8 text-rose">{String(i + 1).padStart(2, '0')}</span>
                <span className={`flex-1 font-display text-2xl font-extrabold transition-transform duration-300 md:text-4xl ${hov === i ? 'translate-x-4' : ''}`}>{c.name}</span>
                <span className="label hidden sm:block">{c.year}</span>
                <span className={`flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 ${hov === i ? '!border-rose bg-rose text-ink' : ''}`}>↗</span>
              </div>
            )
            return <li key={c.id}>{c.image ? <a href={c.image} target="_blank" rel="noreferrer" data-cursor="View">{inner}</a> : inner}</li>
          })}
        </ul>
        <div ref={pv} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-10 hidden h-44 w-64 rotate-6 overflow-hidden rounded-lg border-4 border-cream bg-wine shadow-2xl transition-opacity duration-300 lg:block" style={{ opacity: hov === null ? 0 : 1 }}>
          {hov !== null && (certs[hov].image ? <img src={certs[hov].image} alt="" className="h-full w-full object-cover" /> : <span className="label flex h-full items-center justify-center p-4 text-center text-blush">{certs[hov].name}</span>)}
        </div>
      </div>
    </section>
  )
}
