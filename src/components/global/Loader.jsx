import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Loader() {
  const [show, setShow] = useState(!window.__loaderDone)
  const root = useRef(null)
  const num = useRef(null)
  const api = useRef({})

  useEffect(() => {
    if (!show) return
    window.__lenis?.stop()
    const obj = { v: 0 }
    const finish = () => {
      try { sessionStorage.setItem('seen', '1') } catch { /* diabaikan */ }
      window.__loaderDone = true
      window.__lenis?.start()
      window.dispatchEvent(new Event('loader:done'))
      setShow(false)
    }
    const tl = gsap.timeline()
    tl.from('.ld-r', { scale: 0.6, opacity: 0, duration: 0.6, ease: 'back.out(2)' })
      .to(obj, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(obj.v)).padStart(3, '0') } }, 0.2)
      .to('.ld-r', { rotate: 360, duration: 1.2, ease: 'power3.inOut' }, 0.6)
      .to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.1')
      .call(finish)
    api.current = { tl, finish }
    return () => tl.kill()
  }, [show])

  const skip = () => {
    api.current.tl?.kill()
    gsap.to(root.current, { yPercent: -100, duration: 0.5, ease: 'power3.inOut', onComplete: api.current.finish })
  }
  if (!show) return null
  return (
    <div ref={root} className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink" style={{ backgroundImage: 'radial-gradient(700px 500px at 50% 52%, rgba(228,96,122,.22), transparent 65%)' }}>
      <span className="label absolute left-6 top-6 opacity-60 md:left-16">Raffa // 2026</span>
      <div className="ld-r flex h-36 w-36 items-center justify-center rounded-full bg-cream font-display text-8xl font-extrabold text-ink">R</div>
      <p className="mt-10 font-display text-6xl font-extrabold"><span ref={num}>000</span><span className="label ml-2 opacity-60">%</span></p>
      <p className="mt-3 font-serif text-3xl italic text-blush">Crafting my story...</p>
      <button onClick={skip} className="absolute bottom-8 right-6 h-11 rounded-full border border-cream/45 px-6 text-sm font-semibold md:right-16">Skip ›</button>
    </div>
  )
}
