
<div align="center">

# 🎨 Raffa's Playground

### A Playful, Scroll-Driven Personal Identity Website

> **"Student by title, builder by habit."**

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.x-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://mraffaizzelh.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

**[Live Demo](https://mraffaizzelh.vercel.app) • [Case Study](https://mraffaizzelh.vercel.app/work/jejak-visual) • [Contact](mailto:1mraffaizzelh@gmail.com)**

</div>

---

## 🌟 About The Project

**Raffa's Playground** is not just a portfolio. It's a short film you scroll through. Designed to bridge the gap between "here is my work" and "here is who I am."

Built with a **Burgundy & Cream** aesthetic, this website is a playground for playful interactions, but serious about the content. It features horizontal scroll storytelling, physics-based sticker piles, intricate SVG line animations, and a custom-built certificate gallery.

### ✨ Why "Playground"?
Because learning should be fun. This site is a space to experiment with web technologies, animations, and design principles—all while telling the story of a student, builder, and data enthusiast.

---

## 🚀 Key Features

### 🎬 Cinematic Page Transitions
- **Curtain Reveal:** Entering a case study page triggers a "curtain" animation where two blocks drop from the top and slide back up.
- **Portal Exit:** Navigating back home activates a "Line-to-Circle" effect where a vertical line expands into a massive circle, covering the screen before transitioning.
- **Loader Animation:** A custom loading screen with a morphing monogram and a real-time loading counter.

### 📜 Scroll as a Story
- **Horizontal Project Showcase:** Utilizing GSAP `ScrollTrigger` with `pin` and `scrub` to create a seamless horizontal scrolling gallery for projects.
- **Pinned Timeline:** The "Story" section pins the screen, revealing milestone cards with a vertical SVG path drawing effect as the user scrolls.
- **Parallax & Reveal:** Images in the "Beyond" section move at different speeds with a clip-path reveal.

### 🧲 Micro-Interactions & Physics
- **Custom Cursor:** A custom-built cursor that changes state (e.g., "View", "Drag", "Talk") based on the hovered element.
- **Magnetic Buttons:** Buttons and badges that slightly attract towards the user's cursor.
- **Physics-based Stickers:** The "Beyond Code" section features a canvas powered by **Matter.js** where stickers fall, collide, and can be dragged around.
- **Interactive Sound Effects:** A custom `useSound` hook that plays a `blob.mp3` sound on every click (buttons, links, menu).

### 🗂️ Interactive Certificate Gallery
- **Asymmetric Layout:** Certificates are displayed in an editorial-style, non-symmetrical grid.
- **Lightbox Modal:** Clicking a certificate opens a modal with a "Line-to-Circle" expanding background animation, keeping the user immersed.

### 🎨 Design System
- **Color Palette:** A purely tonal palette dominated by `Ink`, `Wine`, `Burgundy`, `Claret`, `Rose`, and `Cream` (No orange!).
- **Typography:** Bricolage Grotesque for display, Instrument Serif for accents, Inter for body text, and Space Mono for labels.

---

## 🛠️ Tech Stack

This project is built with modern web technologies to ensure high performance, scalability, and a smooth user experience.

- **Core:** [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Variables
- **Animation:**
  - [GSAP](https://gsap.com/) & ScrollTrigger (Complex scroll animations)
  - [Framer Motion](https://www.framer.com/motion/) (Page transitions & UI reveals)
  - [Lenis](https://lenis.darkroom.engineering/) (Smooth inertia scrolling)
- **Interactions:**
  - [Matter.js](https://brm.io/matter-js/) (2D Physics engine for stickers)
- **Data Management:** Local JSON files (`projects.json`, `certificates.json`, etc.) for easy content management without a backend.
- **Deployment:** [Vercel](https://vercel.com/)

---

## ⚡ Performance & Accessibility

- **60 FPS Animations:** Optimized using `transform` and `opacity` combined with `will-change` and GPU acceleration (`translateZ(0)`).
- **Responsive:** Desktop and Mobile layouts are completely separated where necessary (e.g., Navbar, horizontal scroll is disabled on mobile).
- **Accessibility (a11y):** Respects `prefers-reduced-motion`, supports keyboard navigation, and uses semantic HTML.
- **Lazy Loading:** Images and videos are loaded asynchronously (`loading="lazy"`, `decoding="async"`).

---

## 💻 How to Run Locally

Want to explore the code? Follow these steps:

### Prerequisites
- Node.js (v18 or higher)
- npm (or pnpm / yarn)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RaffaHmii/raffa-playground.git
   cd raffa-playground
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
raffa-playground/
├── public/
│   ├── brand/          # Logos, monograms, and wordmarks
│   ├── img/            # Project screenshots, avatars, certificates
│   ├── photos/         # Gallery photos for the Beyond section
│   ├── sound/          # UI click sounds (blob.mp3)
│   └── textures/       # Grain and contour patterns
├── src/
│   ├── assets/         # Global static assets
│   ├── components/
│   │   ├── global/     # Navbar, Cursor, Loader, Grain
│   │   ├── scenes/     # Hero, WhatIDo, Projects, Story, Beyond, Skills, Contact
│   │   └── ui/         # Reusable UI (Magnetic, Chars, Marquee, StickerPile)
│   ├── config/         # Site configuration (site.js)
│   ├── data/           # Content data (projects.json, certificates.json, etc.)
│   ├── hooks/          # Custom hooks (useSound, useLenis)
│   ├── pages/          # Home, CaseStudy, Certificates, NotFound
│   └── index.css       # Global styles & Tailwind theme
├── vercel.json         # Vercel routing configuration
└── vite.config.js      # Vite configuration
```

---

## 🧠 Lessons Learned & Challenges

Building this website was a journey. Here are some key takeaways:

1. **Horizontal Scroll on Mobile is a Trap:** Initially, I used horizontal scrolling for projects on mobile. It caused terrible UX. I learned to disable it on mobile and replace it with a vertical card layout.
2. **GSAP ScrollTrigger in React:** Managing `ScrollTrigger` in React can be tricky. Using `@gsap/react` (`useGSAP`) was a lifesaver for cleaning up animations and preventing memory leaks.
3. **Performance is King:** Using `clip-path` and animating width/height looked cool, but tanked performance. Replacing them with `transform` and `opacity` made the site fly.
4. **Sound Design Matters:** Adding subtle click sounds (`blob.mp3`) made the interactions feel much more tactile and satisfying.

---

## 🤝 Let's Connect!

I'm always open to collaborating on interesting projects, discussing data, or just talking about tech and design.

- **Website:** [mraffaizzelh.vercel.app](https://mraffaizzelh.vercel.app)
- **LinkedIn:** [M. Raffa Izzel Hendro](https://www.linkedin.com/in/raffa-izzel/)
- **GitHub:** [@RaffaHmii](https://github.com/RaffaHmii)
- **Email:** [1mraffaizzelh@gmail.com](mailto:1mraffaizzelh@gmail.com)

---

<div align="center">

**Designed & Built by Raffa. Powered by Coffee.** ☕

*If you like this project, feel free to give it a ⭐!*

</div>
```
