// Bintang 4 sudut dari brand asset (monogram-r-morph.svg), diwarnai lewat CSS mask.
export default function Star({ size = 22, color = '#E4607A', className = '' }) {
  const m = 'url(/brand/monogram-r-morph.svg) center / contain no-repeat'
  return <span aria-hidden="true" className={`inline-block shrink-0 ${className}`} style={{ width: size, height: size, background: color, WebkitMask: m, mask: m }} />
}
