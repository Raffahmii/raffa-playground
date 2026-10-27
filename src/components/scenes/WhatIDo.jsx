import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { site } from '../../config/site'

const words = [['I'], ['turn'], ['ideas'], ['into'], ['digital'], ['products'], ['—'], ['websites'], ['people'], ['enjoy', 1], ['using,'], ['and'], ['data'], ['people'], ['can'], ['actually'], ['understand.', 1]]
const cards = [
  { n: '01', t: ['WEB', 'DEVELOPMENT'], d: 'From idea to deployed site.', chips: ['Laravel', 'React', 'Tailwind', 'MySQL'] },
  { n: '02', t: ['DATA', 'ANALYTICS'], d: 'Turning raw numbers into decisions.', chips: ['Python', 'SQL', 'Excel', 'Tableau'] },
  { n: '03', t: ['PROBLEM', 'SOLVING'], d: 'Stuck is just a step before solved.', chips: ['Debugging', 'Systems thinking'] },
]

export default function WhatIDo() {
  const root = useRef(null)
  const [active, setActive] = useState(0)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.w', { opacity: 0.18 }, { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: '.stmt', start: 'top 80%', end: 'bottom 45%', scrub: true } })
      gsap.from('.wcard', { y: 60, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.cards', start: 'top 85%' } })
    })
  }, { scope: root })

  return (
    <section id="what" ref={root} className="relative overflow-hidden bg-cream px-6 pb-24 pt-40 text-ink md:px-16">
      <svg aria-hidden="true" viewBox="0 0 1440 90" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[7vw] w-full">
        <path d="M0 0H1440V30C1200 90 1000 90 760 50S280 10 0 70Z" fill="#6D1A2B" />
      </svg>
      <div aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url(/textures/contour.svg)', backgroundSize: 'cover' }} />
      <div className="relative">
        <p className="stmt font-display text-[9vw] font-extrabold leading-[1.08] md:text-[4.4vw]">
          {words.map(([w, em], i) => (
            <span key={i} className={`w mr-[.25em] inline-block ${em ? 'font-serif font-normal italic text-claret' : ''}`}>{w}</span>
          ))}
        </p>
        <div className="cards mt-16 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => {
            const on = active === i
            return (
              <article
                key={c.n}
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`wcard flex min-h-[320px] flex-col justify-between rounded-[28px] border-[1.5px] border-claret p-7 transition-colors duration-500 ${on ? 'bg-burgundy text-cream' : 'text-ink'}`}
              >
                <div className="flex items-start justify-between">
                  <span className="label opacity-70">{c.n}</span>
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full ${on ? 'bg-rose text-ink' : 'bg-claret text-cream'}`}>↗</span>
                </div>
                <div>
                  <h3 className="font-display text-4xl font-extrabold leading-none md:text-[2.6vw]">{c.t[0]}<br />{c.t[1]}</h3>
                  <p className="mt-4 text-[17px] opacity-85">{c.d}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.chips.map((x) => <span key={x} className="rounded-full border border-current px-3 py-1 text-[13px]">{x}</span>)}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <p className="label mt-10 text-claret">{site.heroStats.map((s) => `${s.value} ${s.label}`).join(' · ')}</p>
      </div>
    </section>
  )
}
