import { useEffect, useRef, useState } from 'react'

// Kursor custom (desktop saja). Beri atribut data-cursor="View" pada elemen untuk label.
export default function Cursor() {
  const el = useRef(null)
  const [label, setLabel] = useState('')
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const node = el.current
    node.style.opacity = 1
    let x = 0, y = 0, tx = 0, ty = 0, raf
    const mv = (e) => {
      tx = e.clientX
      ty = e.clientY
      const t = e.target.closest?.('[data-cursor]')
      setLabel(t ? t.dataset.cursor : '')
    }
    const loop = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      node.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', mv)
    loop()
    return () => {
      window.removeEventListener('mousemove', mv)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div
      ref={el}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-rose font-display text-sm font-bold text-ink opacity-0 transition-[width,height] duration-300 ${label ? 'h-24 w-24' : 'h-4 w-4'}`}
    >
      {label}
    </div>
  )
}
