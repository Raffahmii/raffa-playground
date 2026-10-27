import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-burgundy px-6 text-center">
      <div>
        <h1 className="font-display text-[16vw] font-extrabold leading-none">404</h1>
        <p className="mt-4 text-xl">Oops. This page wandered off.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-rose px-7 py-3 font-semibold text-ink">Back to safety</Link>
      </div>
    </main>
  )
}
