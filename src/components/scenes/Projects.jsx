import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { site, isFilled } from '../../config/site'
import projects from '../../data/projects.json'

const featured = projects.filter((p) => p.featured)
const pad = (n) => String(n + 1).padStart(2, '0')

function Panel({ p, i }) {
  return (
    <article className="flex shrink-0 flex-col gap-6 overflow-hidden rounded-[28px] border border-cream/15 bg-wine p-6 lg:h-[68vh] lg:w-[78vw] lg:flex-row lg:p-10">
      <div className="flex flex-1 flex-col justify-between gap-6">
        <div>
          <p className="stroke-text font-display text-[22vw] font-extrabold leading-none [--stroke:rgba(232,160,168,.6)] lg:text-[10vw]">{pad(i)}</p>
          <h3 className="mt-2 font-display text-[10vw] font-extrabold uppercase leading-[.92] tracking-tight lg:text-[4.6vw]">{p.title}</h3>
          <p className="label mt-4 text-rose">{p.type} · {p.stack.join(' · ')} · {p.year}</p>
          <p className="mt-4 max-w-md text-[17px] text-cream/80">{p.summary}</p>
        </div>
        <div>
          <Link to={`/work/${p.slug}`} data-cursor="View" className="inline-flex h-12 items-center rounded-full bg-rose px-7 font-semibold text-ink">View case study ↗</Link>
        </div>
      </div>
      <div className="relative min-h-[240px] flex-1 lg:flex-[1.3]">
        <div className="absolute inset-0 overflow-hidden rounded-xl border-2 border-cream/40 bg-ink">
          <img src={p.desktop} alt={`${p.title} screenshot`} loading="lazy" className="p-img h-full w-[116%] max-w-none object-cover object-top" />
        </div>
        {p.mobile && (
          <div className="absolute -bottom-3 right-4 aspect-[9/16] h-[62%] overflow-hidden rounded-3xl border-2 border-cream/40 bg-ink">
            <img src={p.mobile} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
          </div>
        )}
      </div>
    </article>
  )
}

function Index() {
  const wrap = useRef(null)
  const pv = useRef(null)
  const [hov, setHov] = useState(null)
  const move = (e) => {
    const r = wrap.current.getBoundingClientRect()
    gsap.to(pv.current, { x: e.clientX - r.left + 40, y: e.clientY - r.top - 90, duration: 0.4, ease: 'power3.out' })
  }
  return (
    <div ref={wrap} onMouseMove={move} onMouseLeave={() => setHov(null)} className="relative shrink-0 py-6 lg:w-[70vw]">
      <h2 className="font-display text-[12vw] font-extrabold leading-none lg:text-[4.4vw]">ALL <span className="font-serif font-normal italic text-blush">projects</span></h2>
      <ul className="mt-8">
        {projects.map((p, i) => (
          <li key={p.slug} onMouseEnter={() => setHov(i)} className={`border-t border-cream/20 transition-opacity duration-300 ${hov !== null && hov !== i ? 'opacity-40' : ''}`}>
            <Link to={`/work/${p.slug}`} data-cursor="View" className="flex items-center justify-between gap-4 py-4 lg:py-5">
              <span className="label w-8 text-rose">{pad(i)}</span>
              <span className={`flex-1 font-display text-[8vw] font-extrabold uppercase leading-tight transition-transform duration-300 lg:text-[3.2vw] ${hov === i ? 'translate-x-4' : ''}`}>{p.title}</span>
              <span className="label hidden w-40 sm:block">{p.type}</span>
              <span className="label hidden w-16 sm:block">{p.year}</span>
              <span className={`flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 ${hov === i ? '!border-rose bg-rose text-ink' : ''}`}>↗</span>
            </Link>
          </li>
        ))}
      </ul>
      <a href={isFilled(site.contact.github) ? site.contact.github : '#'} target="_blank" rel="noreferrer" className="mt-8 inline-flex h-12 items-center rounded-full border border-cream px-7 font-semibold">More on GitHub ↗</a>
      <div ref={pv} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-10 hidden h-40 w-60 -rotate-6 overflow-hidden rounded-lg border-2 border-cream bg-burgundy shadow-2xl transition-opacity duration-300 lg:block" style={{ opacity: hov === null ? 0 : 1 }}>
        {hov !== null && <img src={projects[hov].preview} alt="" className="h-full w-full object-cover" />}
      </div>
    </div>
  )
}

export default function Projects() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const dist = () => track.current.scrollWidth - window.innerWidth
      const tween = gsap.to(track.current, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: { trigger: root.current, pin: true, scrub: 1, start: 'top top', end: () => '+=' + dist(), invalidateOnRefresh: true },
      })
      gsap.utils.toArray('.p-img', root.current).forEach((img) => {
        gsap.fromTo(img, { xPercent: -6 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: img, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
      })
    })
  }, { scope: root })

  return (
    <section id="work" ref={root} className="relative overflow-hidden lg:h-screen" style={{ backgroundImage: 'linear-gradient(180deg,#140A0C,#3A0E19)' }}>
      <div ref={track} className="flex flex-col gap-8 px-6 py-24 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-10 lg:px-16 lg:py-0">
        <div className="shrink-0 lg:w-[26vw]">
          <h2 className="font-display text-[14vw] font-extrabold leading-[.95] lg:text-[5vw]">SELECTED <span className="font-serif font-normal italic text-blush">work</span></h2>
          <p className="label mt-4 hidden text-blush lg:block">scroll →</p>
        </div>
        {featured.map((p, i) => <Panel key={p.slug} p={p} i={i} />)}
        <Index />
      </div>
    </section>
  )
}
