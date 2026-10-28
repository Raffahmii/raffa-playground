import Star from './Star'

export default function Marquee({ words, className = '', speed = 30 }) {
  const items = [...words, ...words, ...words].map((w, i) => (
    <span key={i} className={`mx-5 inline-flex items-center gap-5 ${i % 2 ? 'stroke-text' : ''}`}>
      {w}
      <Star size={22} />
    </span>
  ))
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <div className="marq inline-flex" style={{ animationDuration: `${speed}s` }}>
        {items}
        {items}
      </div>
    </div>
  )
}
