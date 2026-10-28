import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import StickerPile from '../ui/StickerPile'
import fun from '../../data/fun.json'

const photos = [
  ['coding', 'md:left-[2%] md:top-[4%] md:w-[30%] md:-rotate-3', 0.3],
  ['band', 'md:left-[34%] md:top-[12%] md:w-[30%] md:rotate-2', 0.6],
  ['kopi', 'md:right-[3%] md:top-[2%] md:w-[28%] md:rotate-[5deg]', 0.4],
  ['motivation', 'md:left-[5%] md:top-[52%] md:w-[30%] md:rotate-1', 0.7],
  ['workshop', 'md:left-[40%] md:top-[56%] md:w-[26%] md:-rotate-3', 0.35],
  ['2026', 'md:right-[4%] md:top-[50%] md:w-[24%] md:rotate-[4deg]', 0.5],
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
}

function Block({ label, items, cols }) {
  return (
    <motion.div 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true, margin: "-50px" }} 
      variants={containerVariants}
    >
      <p className="label mb-5 text-claret">{label}</p>
      <div className={`grid gap-5 ${cols}`}>
        {items.map((it, i) => (
          <motion.article 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03, 
              rotate: i % 2 === 0 ? 1 : -1,
              backgroundColor: 'var(--color-burgundy)',
              color: 'var(--color-cream)',
              transition: { duration: 0.2 } 
            }}
            key={it.t} 
            tabIndex={0} 
            className="rounded-[24px] border-[1.5px] border-claret p-6 transition-colors duration-0 focus-visible:bg-burgundy focus-visible:text-cream cursor-crosshair will-change-transform"
          >
            <span className="label opacity-60">{String(i + 1).padStart(2, '0')}</span>
            <h4 className="mt-3 font-display text-2xl font-extrabold leading-tight">{it.t}</h4>
            <p className="mt-3 text-[15px] opacity-85">{it.d}</p>
          </motion.article>
        ))}
      </div>
    </motion.div>
  )
}

export default function Beyond() {
  const root = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      
      // OPTIMASI: Parallax Ringan tanpa clip-path berat
      gsap.utils.toArray('.ph').forEach((n) => {
        const img = n.querySelector('img')
        
        // Parallax dengan jarak lebih pendek & GPU-accelerated
        gsap.to(n, {
          y: () => -40 * Number(n.dataset.speed),
          ease: 'none',
          scrollTrigger: {
            trigger: '.collage',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5, // Lebih smooth
          }
        })

        // Animasi Reveal pakai opacity + scale (JAUH LEBIH RINGAN dari clip-path)
        gsap.fromTo(img, 
          { opacity: 0, scale: 1.15 },
          { 
            opacity: 1, 
            scale: 1,
            duration: 1, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: n,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Teks Raksasa "BEYOND" Parallax
      gsap.to('.beyond-text', {
        xPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.collage',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5
        }
      })
    })
  }, { scope: root })

  return (
    <section id="beyond" ref={root} className="relative overflow-hidden bg-sand px-6 py-28 text-ink md:px-16">
      <div aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url(/textures/contour.svg)', backgroundSize: 'cover' }} />
      
      <div className="relative">
        <h2 className="max-w-3xl font-display text-[12vw] font-extrabold leading-none md:text-[6vw]">Things that make <span className="font-serif font-normal italic text-claret">me</span>, me.</h2>
        <p className="mb-6 mt-4 font-serif text-3xl italic text-claret">Drag the stickers ↓</p>
        <StickerPile />

        <div className="collage relative mt-20 grid grid-cols-2 gap-3 md:mt-24 md:block md:h-[720px]">
          <p aria-hidden="true" className="beyond-text absolute left-[-1vw] top-[24%] hidden select-none whitespace-nowrap font-display text-[24vw] font-extrabold leading-none text-burgundy/15 md:block will-change-transform">BEYOND</p>
          
          {photos.map(([name, pos, speed]) => (
            <figure key={name} data-speed={speed} className={`ph relative md:absolute ${pos} will-change-transform`}>
              <img 
                src={`/photos/${name}.jpg`} 
                alt={name} 
                loading="lazy" 
                decoding="async" 
                className="aspect-[16/10] w-full rounded-lg border-[6px] border-cream object-cover shadow-xl transform-gpu" 
              />
              <figcaption className="label absolute bottom-3 left-3 rounded bg-ink/70 px-2 py-1 text-cream backdrop-blur-sm">{name}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-24 space-y-16">
          <Block label="Facts · Habits" items={fun.habits} cols="sm:grid-cols-2 lg:grid-cols-4" />
          <Block label="Goals · 2026-2027" items={fun.goals} cols="md:grid-cols-3" />
          <Block label="Reflection · Evolution" items={fun.reflection} cols="md:grid-cols-3" />
        </div>
      </div>
    </section>
  )
}