import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import StickerPile from '../ui/StickerPile'
import goalsData from '../../data/goals.json'

const photos = [
  ['coding', 'left-[2%] top-[6%] w-[30%] -rotate-3', 0.6],
  ['workout', 'left-[30%] top-[22%] w-[34%] rotate-2', 1.1],
  ['kopi', 'right-[3%] top-[4%] w-[28%] rotate-[5deg]', 0.8],
  ['band', 'left-[6%] top-[52%] w-[32%] rotate-1', 1.3],
  ['workshop', 'left-[42%] top-[56%] w-[26%] -rotate-3', 0.7],
  ['2026', 'right-[4%] top-[50%] w-[24%] rotate-[4deg]', 1],
]

export default function Beyond() {
  const root = useRef(null)
  const [goals, setGoals] = useState(goalsData)
  const toggle = (yi, ii) => setGoals((g) => g.map((y, a) => (a !== yi ? y : { ...y, items: y.items.map((it, b) => (b === ii ? { ...it, done: !it.done } : it)) })))

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('.ph', root.current).forEach((n) => {
        gsap.to(n, { y: () => -60 * Number(n.dataset.speed), ease: 'none', scrollTrigger: { trigger: '.collage', start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    })
  }, { scope: root })

  return (
    <section id="beyond" ref={root} className="relative overflow-hidden bg-sand px-6 py-28 text-ink md:px-16">
      <div aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url(/textures/contour.svg)', backgroundSize: 'cover' }} />
      <div className="relative">
        <h2 className="max-w-3xl font-display text-[13vw] font-extrabold leading-none md:text-[6vw]">Things that make <span className="font-serif font-normal italic text-claret">me</span>, me.</h2>
        <p className="mt-3 font-serif text-3xl italic text-claret">Drag the stickers ↓</p>
        <StickerPile />

        <div className="collage relative mt-16 h-[640px] md:h-[760px]">
          <p aria-hidden="true" className="absolute left-[-1vw] top-[18%] select-none whitespace-nowrap font-display text-[34vw] font-extrabold leading-none text-burgundy/15 md:text-[24vw]">BEYOND</p>
          {photos.map(([name, pos, speed]) => (
            <figure key={name} data-speed={speed} className={`ph absolute ${pos}`}>
              <img src={`/img/galeri/${name}.jpg`} alt={name} loading="lazy" className="aspect-[4/5] w-full rounded-lg border-[6px] border-cream object-cover shadow-xl" />
              <figcaption className="label absolute bottom-3 left-3 rounded bg-ink/70 px-2 py-1 text-cream">{name}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {goals.map((y, yi) => (
            <div key={y.year} className="flex flex-wrap items-center gap-3">
              <span className="label w-28 text-claret">Goals {y.year}</span>
              {y.items.map((it, ii) => (
                <button key={it.t} onClick={() => toggle(yi, ii)} aria-pressed={it.done} className={`h-10 rounded-full px-5 text-[15px] font-semibold transition-colors ${it.done ? 'bg-burgundy text-cream' : 'border-[1.5px] border-claret text-ink'}`}>{it.done ? '✓ ' : ''}{it.t}</button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
