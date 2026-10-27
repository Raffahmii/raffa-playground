// Memecah teks per huruf supaya bisa dianimasikan (class .char)
export default function Chars({ text, className = '' }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((c, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
          <span className="char inline-block">{c === ' ' ? '\u00A0' : c}</span>
        </span>
      ))}
    </span>
  )
}
