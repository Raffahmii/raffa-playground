import Hero from '../components/scenes/Hero'
import WhatIDo from '../components/scenes/WhatIDo'
import Projects from '../components/scenes/Projects'
import Contact from '../components/scenes/Contact'

// Tambah scene baru (Story, Skills, Beyond Code) di antara komponen ini.
export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <Projects />
      <Contact />
    </main>
  )
}
