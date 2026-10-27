import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import skills from '../../data/skills.json'

const row1 = ['LARAVEL', 'REACT', 'TAILWIND', 'MYSQL', 'PYTHON', 'SQL']
const row2 = ['EXCEL', 'TABLEAU', 'GIT', 'FIGMA', 'GITHUB', 'PHP']

const Row = ({ words, cls }) => {
  const one = words.map((w, i) => (
    <span key={w} className={`mr-9 inline-block ${i % 2 ? 'stroke-text' : ''}`}>{w} <span className="text-rose">✦</span></span>
  ))
  return <div className={`mq ${cls} whitespace-nowrap font-display text-[16vw] font-extrabold leading-[1.1] md:text-[9vw]`}><span className="inline-block">{one}{one}</span></div>
}

function Card({ s, i }) {
  const ref = useRef(null)
  const move = (e) => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const r = ref.current.getBoundingClientRect()
    gsap.to(ref.current, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 10, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 10, transformPerspective: 700, duration: 0.4 })
  }
  const leave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6 })
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className="sk rounded-[20px] border border-cream/20 bg-cream/5 p-6">
      <p className="label text-blush">{String(i + 1).padStart(2, '0')} {s.title}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {s.items.map((x) => <span key={x} className="rounded-full border border-cream/50 px-3 py-1 text-[13px]">{x}</span>)}
      </div>
    </div>
  )
}

export default function Skills() {
  const root = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const t1 = gsap.to('.r1 > span', { xPercent: -50, repeat: -1, duration: 30, ease: 'none' })
      const t2 = gsap.fromTo('.r2 > span', { xPercent: -50 }, { xPercent: 0, repeat: -1, duration: 30, ease: 'none' })
      const st = ScrollTrigger.create({
        trigger: root.current, start: 'top bottom', end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity()
          gsap.to('.mq', { skewX: gsap.utils.clamp(-8, 8, v / -250), duration: 0.3, overwrite: 'auto' })
          gsap.to([t1, t2], { timeScale: 1 + Math.abs(v) / 250, duration: 0.3, overwrite: 'auto' })
        },
      })
      const reset = () => { gsap.to('.mq', { skewX: 0, duration: 0.6 }); gsap.to([t1, t2], { timeScale: 1, duration: 0.6 }) }
      ScrollTrigger.addEventListener('scrollEnd', reset)
      gsap.from('.sk', { y: 50, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.sk-grid', start: 'top 85%' } })
      return () => { ScrollTrigger.removeEventListener('scrollEnd', reset); st.kill() }
    })
  }, { scope: root })

  return (
    <section id="skills" ref={root} className="relative overflow-hidden bg-wine py-24">
      <div className="overflow-hidden"><Row words={row1} cls="r1" /><Row words={row2} cls="r2" /></div>
      <div className="px-6 pt-16 md:px-16">
        <h2 className="mb-8 font-display text-[10vw] font-extrabold leading-none md:text-[4vw]">My toolbox. <span className="font-serif font-normal italic text-blush">Always getting heavier.</span></h2>
        <div className="sk-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => <Card key={s.title} s={s} i={i} />)}
          <div className="sk rounded-[20px] bg-rose p-6 text-ink">
            <p className="label">08 Now</p>
            <p className="mt-5 font-display text-2xl font-extrabold leading-tight">Learning: React, Next.js.<br />Building: Finance App.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
