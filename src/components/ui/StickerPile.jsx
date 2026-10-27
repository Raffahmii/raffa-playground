import { useEffect, useRef } from 'react'
import Matter from 'matter-js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const items = [
  { img: '/stickers/coffe.svg', w: 120, h: 120 }, { img: '/stickers/code.svg', w: 120, h: 120 },
  { img: '/stickers/guitar.svg', w: 130, h: 130 }, { img: '/stickers/grafik.svg', w: 120, h: 120 },
  { img: '/stickers/shape.svg', w: 100, h: 100 }, { img: '/stickers/spark.svg', w: 90, h: 90 },
  { label: 'DATA', w: 150, h: 64, cls: 'bg-claret text-cream' }, { label: 'GAME', w: 150, h: 64, cls: 'bg-wine text-cream' },
  { label: 'GYM', w: 120, h: 64, cls: 'bg-rose text-ink' }, { label: 'BOOKS', w: 150, h: 64, cls: 'bg-ink text-cream' },
  { label: 'BAND', w: 140, h: 64, cls: 'bg-cream text-ink' }, { label: '2026', w: 130, h: 64, cls: 'bg-burgundy text-blush' },
]

// Stiker jatuh dengan fisika (Matter.js). Desktop: bisa di-drag. Sentuh/reduced-motion: tanpa drag atau statis.
export default function StickerPile() {
  const box = useRef(null)
  const els = useRef([])

  useEffect(() => {
    const el = box.current
    const W = el.clientWidth, H = el.clientHeight
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.current.forEach((n, i) => { n.style.visibility = 'visible'; gsap.set(n, { x: 16 + (i % 4) * (W / 4), y: H - 110 - Math.floor(i / 4) * 100, rotate: (i % 3 - 1) * 8 }) })
      return
    }
    const { Engine, Bodies, Composite, Mouse, MouseConstraint } = Matter
    const engine = Engine.create()
    const t = 80
    const walls = [Bodies.rectangle(W / 2, H + t / 2, W * 2, t, { isStatic: true }), Bodies.rectangle(-t / 2, H / 2, t, H * 4, { isStatic: true }), Bodies.rectangle(W + t / 2, H / 2, t, H * 4, { isStatic: true })]
    const bodies = items.map((it, i) => Bodies.rectangle(W * 0.12 + Math.random() * W * 0.76, -80 - i * 90, it.w, it.h, { restitution: 0.5, friction: 0.4, angle: Math.random(), chamfer: { radius: Math.min(it.w, it.h) / 2.2 } }))
    Composite.add(engine.world, [...walls, ...bodies])
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const mouse = Mouse.create(el)
      ;['wheel', 'mousewheel', 'DOMMouseScroll'].forEach((ev) => mouse.element.removeEventListener(ev, mouse.mousewheel))
      Composite.add(engine.world, MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } }))
    }
    let raf = 0, running = false
    const loop = () => {
      Engine.update(engine, 1000 / 60)
      bodies.forEach((b, i) => {
        const n = els.current[i]
        n.style.visibility = 'visible'
        n.style.transform = `translate(${b.position.x - items[i].w / 2}px, ${b.position.y - items[i].h / 2}px) rotate(${b.angle}rad)`
      })
      raf = requestAnimationFrame(loop)
    }
    const start = () => { if (!running) { running = true; loop() } }
    const stop = () => { cancelAnimationFrame(raf); running = false }
    const st = ScrollTrigger.create({ trigger: el, start: 'top 85%', end: 'bottom top', onEnter: start, onEnterBack: start, onLeave: stop, onLeaveBack: stop })
    return () => { st.kill(); stop(); Composite.clear(engine.world); Engine.clear(engine) }
  }, [])

  return (
    <div ref={box} className="relative h-[520px] select-none overflow-hidden" aria-label="Sticker playground: drag the stickers">
      {items.map((it, i) => (
        <div key={i} ref={(n) => (els.current[i] = n)} style={{ width: it.w, height: it.h }} className={`invisible absolute left-0 top-0 flex items-center justify-center font-display text-xl font-extrabold ${it.img ? '' : `rounded-full border-[5px] border-cream shadow-lg ${it.cls}`}`}>
          {it.img ? <img src={it.img} alt="" draggable={false} className="pointer-events-none h-full w-full object-contain" /> : it.label}
        </div>
      ))}
    </div>
  )
}
