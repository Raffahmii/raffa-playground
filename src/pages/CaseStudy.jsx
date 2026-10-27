import { Link, useParams } from 'react-router-dom'
import projects from '../data/projects.json'
import { isFilled } from '../config/site'

// Halaman detail sementara. Nanti dikembangkan sesuai konsep (problem, solution, process, result).
export default function CaseStudy() {
  const { slug } = useParams()
  const p = projects.find((x) => x.slug === slug)
  if (!p) return <main className="grid min-h-screen place-items-center">Project not found. <Link to="/" className="ml-2 text-rose">Back</Link></main>
  return (
    <main className="min-h-screen bg-wine px-6 pb-24 pt-32 md:px-16">
      <Link to="/" className="label text-rose">← Back</Link>
      <h1 className="mt-6 font-display text-[12vw] font-extrabold uppercase leading-[.92] md:text-[7vw]">{p.title}</h1>
      <p className="label mt-4 text-rose">{p.type} · {p.stack.join(' · ')} · {p.year}</p>
      <img src={p.cover} alt={p.title} className="mt-10 w-full rounded-3xl border border-cream/20" />
      <p className="mt-8 max-w-2xl text-xl text-cream/85">{p.summary}</p>
      <div className="mt-8 flex gap-3">
        {isFilled(p.links.live) && p.links.live && <a href={p.links.live} target="_blank" rel="noreferrer" className="rounded-full bg-rose px-7 py-3 font-semibold text-ink">Live site ↗</a>}
        {isFilled(p.links.github) && p.links.github && <a href={p.links.github} target="_blank" rel="noreferrer" className="rounded-full border border-cream px-7 py-3 font-semibold">GitHub ↗</a>}
      </div>
    </main>
  )
}
