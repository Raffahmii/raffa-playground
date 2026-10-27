import Hero from '../components/scenes/Hero'
import WhatIDo from '../components/scenes/WhatIDo'
import Projects from '../components/scenes/Projects'
import Story from '../components/scenes/Story'
import Beyond from '../components/scenes/Beyond'
import Skills from '../components/scenes/Skills'
import Contact from '../components/scenes/Contact'

// Tambah scene baru (Story, Skills, Beyond Code) di antara komponen ini.
export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <Projects />
      <Story />
      <Beyond />
      <Skills />
      <Contact />
    </main>
  )
}
