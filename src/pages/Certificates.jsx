import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import certs from '../data/certificates.json'
import { site } from '../config/site'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 1.4 } } // Delay 1.4s nunggu balok turun
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 60 } }
}

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null)

  // Kunci scroll pas modal kebuka
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [selectedCert])

  return (
    <>
      {/* 🌟 ANIMASI BALOK MASUK (Turun -> Diem -> Naik) */}
      <div className="fixed inset-0 z-[200] pointer-events-none flex">
        <motion.div 
          initial={{ y: '-100%' }} 
          animate={{ y: ['-100%', '0%', '0%', '-100%'] }} 
          transition={{ duration: 1.9, times: [0, 0.25, 0.75, 1], ease: [0.76, 0, 0.24, 1] }} 
          className="h-full w-1/2 bg-burgundy border-r border-wine/20" 
        />
        <motion.div 
          initial={{ y: '-100%' }} 
          animate={{ y: ['-100%', '0%', '0%', '-100%'] }} 
          transition={{ duration: 1.6, times: [0, 0.25, 0.75, 1], ease: [0.76, 0, 0.24, 1], delay: 0.1 }} 
          className="h-full w-1/2 bg-claret" 
        />
      </div>

      <main className="min-h-screen bg-ink pb-32 pt-32 text-cream relative">
        <div className="mx-auto max-w-6xl px-6 md:px-16">
          
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mb-16">
            <Link to="/" className="label mb-8 inline-flex items-center gap-2 text-rose hover:text-blush transition-colors">
              <span>←</span> Back to Home
            </Link>
            <h1 className="font-display text-[12vw] font-extrabold uppercase leading-[.9] tracking-tight md:text-[6vw]">
              Wall of <span className="font-serif italic text-rose font-normal lowercase">Fame</span>.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-cream/70">
              The receipts. A collection of certifications, achievements, and milestones I've gathered along the way.
            </p>
          </motion.div>

          {/* Grid Sertifikat */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="show" 
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {certs.map((c, i) => (
              <motion.button 
                key={c.id} 
                onClick={() => setSelectedCert(c)}
                variants={itemVariants}
                className="group relative flex flex-col overflow-hidden rounded-[24px] border border-cream/10 bg-wine p-4 text-left transition-all hover:border-rose hover:bg-wine/80 shadow-xl cursor-pointer"
              >
                {/* Gambar Sertifikat */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink/50">
                  {c.image ? (
                    <img 
                      src={c.image} 
                      alt={c.name} 
                      loading="lazy" 
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-xl text-cream/30">No Image</div>
                  )}
                  {/* Overlay Hover */}
                  <div className="absolute inset-0 bg-ink/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <span className="rounded-full bg-rose px-6 py-2 font-semibold text-ink transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                      View Certificate ↗
                    </span>
                  </div>
                </div>

                {/* Info Sertifikat */}
                <div className="mt-5 flex flex-1 flex-col justify-between">
                  <div>
                    <p className="label text-rose">{c.year || '2026'}</p>
                    <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight group-hover:text-rose transition-colors">{c.name}</h3>
                  </div>
                  <p className="mt-3 label text-cream/40">Certified</p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Footer CTA */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="mt-24 text-center">
            <p className="text-cream/60">Want to see more? Check my LinkedIn.</p>
            <a href={site.contact.linkedin} target="_blank" rel="noreferrer" className="mt-4 inline-flex h-12 items-center rounded-full border-2 border-cream px-8 font-semibold transition-colors hover:border-rose hover:text-rose">
              LinkedIn Profile ↗
            </a>
          </motion.div>

        </div>
      </main>

      {/* 🌟 MODAL LIGHTBOX (Lingkaran Mekar) */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10"
          >
            {/* Backdrop Gelap yang bisa di-klik buat close */}
            <div className="absolute inset-0 bg-ink/95 backdrop-blur-md" onClick={() => setSelectedCert(null)} />

            {/* Lingkaran Mekar (Background Modal) */}
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0 }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute h-[150vmax] w-[150vmax] rounded-full bg-wine/80 border border-cream/5 shadow-[0_0_100px_rgba(228,96,122,0.2)]"
            />

            {/* Konten Modal (Gambar & Info) */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className="relative z-10 flex w-full max-w-5xl flex-col items-center"
            >
              {/* Tombol Close */}
              <button 
                onClick={() => setSelectedCert(null)} 
                className="absolute -top-16 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-ink/50 text-cream backdrop-blur-md transition-all hover:bg-rose hover:text-ink md:-top-12"
              >
                ✕
              </button>

              {/* Gambar Sertifikat */}
              <div className="relative w-full overflow-hidden rounded-2xl border-2 border-cream/10 bg-ink/50 shadow-2xl">
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.name} 
                  className="max-h-[70vh] w-full object-contain" 
                />
              </div>

              {/* Info di bawah gambar */}
              <div className="mt-8 text-center">
                <p className="label text-rose mb-2">{selectedCert.year || '2026'}</p>
                <h2 className="font-display text-3xl font-extrabold md:text-5xl">{selectedCert.name}</h2>
                <p className="mt-3 text-cream/60">Issued & Verified</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}