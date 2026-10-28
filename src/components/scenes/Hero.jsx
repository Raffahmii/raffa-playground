import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { site } from '../../config/site'
import projects from '../../data/projects.json'
import Chars from '../ui/Chars'
import Magnetic from '../ui/Magnetic'
import Marquee from '../ui/Marquee'

const stickers = [
  // ['/stickers/spark.svg', 'left-[8%] top-[34%] w-10 md:w-14'],
  ['/stickers/coffe.svg', 'right-[8%] top-[46%] w-16 md:w-24'],
  ['/stickers/code.svg', 'left-[32%] bottom-[32%] w-14 md:w-20'],
]

export default function Hero() {
  const root = useRef(null)
  const p = projects[0]

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.2, paused: true })
        .from('.h-bg', { opacity: 0, duration: 1.2 }, 0)
        .from('.h-blob', { scale: 0.6, opacity: 0, duration: 1.1 }, 0.1)
        .from('.h-photo', { yPercent: 10, opacity: 0, duration: 1.1 }, 0.25)
        .from('.char', { yPercent: 110, stagger: 0.05, duration: 0.9 }, 0.5)
        .from('.h-fade', { y: 24, opacity: 0, stagger: 0.08, duration: 0.8 }, 0.7)
        .from('.h-card', { y: 40, opacity: 0, stagger: 0.12, duration: 0.9 }, 0.9)
      const go = () => tl.play()
      if (window.__loaderDone) go()
      else window.addEventListener('loader:done', go, { once: true })
      gsap.to('.h-bg', { xPercent: -8, ease: 'none', scrollTrigger: st })
      gsap.to('.h-photo-wrap', { yPercent: -8, ease: 'none', scrollTrigger: st })
      gsap.to('.h-blob-wrap', { yPercent: 12, ease: 'none', scrollTrigger: st })
      gsap.to('.h-stk', { y: -14, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: 0.4 })
    })
  }, { scope: root })

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-burgundy"
      style={{ backgroundImage: 'radial-gradient(900px 620px at 68% 58%, rgba(228,96,122,.30), transparent 62%)' }}
    >
      <div aria-hidden="true" className="h-bg pointer-events-none absolute left-[-1vw] top-[16vh] select-none whitespace-nowrap font-display text-[34vw] font-extrabold leading-[.8] tracking-[-.04em] text-cream/10 md:text-[30vw]">RAFFA</div>

      {site.availability.show && (
        <p className="h-fade absolute left-6 top-[84px] z-20 flex items-center gap-2.5 rounded-full border border-cream/30 px-4 py-2 text-xs md:left-16 md:top-[92px] md:text-sm">
          <i className="h-2 w-2 rounded-full bg-[#4CAF7A]" />
          {site.availability.text}
        </p>
      )}

      <div className="h-photo-wrap relative mt-24 h-[46svh] md:absolute md:inset-x-0 md:bottom-[60px] md:top-24 md:mt-0 md:h-auto">
        <div className="h-blob-wrap absolute inset-0">
          <div className="h-blob absolute inset-x-0 bottom-[4%] mx-auto aspect-square w-[min(78vw,560px)] rounded-full bg-blush/90" />
          <div className="h-blob absolute inset-x-0 bottom-[0%] mx-auto aspect-square w-[min(90vw,640px)] rounded-full border border-cream/50" />
        </div>
        <div className="absolute inset-0 flex items-end justify-center">
          <img src="/img/utama_1.png" alt="Raffa" className="h-photo relative z-10 h-full w-auto max-w-none object-contain object-bottom" />
        </div>
        {stickers.map(([src, pos]) => (
          <img key={src} src={src} alt="" aria-hidden="true" className={`h-stk absolute z-10 ${pos}`} />
        ))}
      </div>

      <div className="relative z-20 px-6 pb-24 pt-2 md:absolute md:bottom-24 md:left-16 md:px-0 md:pb-0">
        <p className="h-fade font-serif text-5xl italic text-blush md:text-7xl">Yo, I’m</p>
        <p className="h-fade mt-3 max-w-[22rem] text-base text-cream/90 md:max-w-md md:text-xl">{site.statement}</p>
        <p className="label h-fade mt-3 text-blush">{site.tagline}</p>
        <h1 className="mt-1 font-display text-[24vw] font-extrabold leading-[.9] tracking-[-.03em] md:text-[13vw]">
          <Chars text="RAFFA." />
        </h1>
        <div className="h-fade mt-5 flex flex-wrap items-center gap-3">
          <Magnetic>
            <button onClick={() => window.__lenis?.scrollTo('#what')} data-cursor="Go" className="h-[52px] rounded-full bg-rose px-8 font-semibold text-ink">Explore Portfolio ↓</button>
          </Magnetic>
          <a href="#contact" onClick={(e) => { e.preventDefault(); window.__lenis?.scrollTo('#contact') }} className="flex h-[52px] items-center gap-3 rounded-2xl bg-ink px-4 text-sm font-semibold md:hidden">
            <i className="h-9 w-9 rounded-full bg-blush bg-cover" style={{ backgroundImage: 'url(/img/avatar_1.webp)' }} />Let’s talk ↗
          </a>
        </div>
        <p className="label h-fade mt-5 hidden text-cream/70 md:block">{site.heroStats.map((s) => `${s.value} ${s.label}`).join(' · ')}</p>
      </div>

      {/* <Link to={`/work/${p.slug}`} data-cursor="View" className="h-card absolute right-16 top-[22vh] z-20 hidden w-[300px] rounded-3xl bg-cream p-3 text-ink md:block">
        <img src={p.cover} alt="" className="h-32 w-full rounded-2xl bg-wine object-cover" />
        <div className="flex items-end justify-between p-2 pt-3">
          <div>
            <p className="label text-claret">Latest project</p>
            <p className="font-display text-2xl font-extrabold">{p.title}</p>
            <p className="label mt-1 text-[#5A4A4E]">{p.type} · {p.year}</p>
          </div>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-claret text-cream">↗</span>
        </div>
      </Link> */}

      <a href="#contact" onClick={(e) => { e.preventDefault(); window.__lenis?.scrollTo('#contact') }} data-cursor="Talk" className="h-card absolute bottom-[22vh] right-16 z-20 hidden w-[316px] items-center gap-4 rounded-3xl bg-ink p-6 md:flex">
        <i className="h-14 w-14 shrink-0 rounded-full bg-blush bg-cover" style={{ backgroundImage: 'url(/img/avatar_1.webp)' }} />
        <div className="flex-1">
          <p className="label text-blush">Let’s talk</p>
          <p className="font-display text-2xl font-extrabold">Raffa</p>
          <p className="text-[13px] text-cream/70">Student / Builder</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose text-ink">↗</span>
      </a>

      <Marquee words={['DATA', 'CODE', 'COFFEE', 'MUSIC']} className="absolute inset-x-0 bottom-0 z-20 bg-ink py-3 font-display text-2xl font-extrabold md:text-3xl" />
    </section>
  )
}
