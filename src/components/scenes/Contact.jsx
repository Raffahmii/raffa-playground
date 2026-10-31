import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { site, isFilled } from "../../config/site";
import Chars from "../ui/Chars";
import Magnetic from "../ui/Magnetic";
import { useSound } from "../../hooks/useSound"; // Import Sound Hook

const href = (v, f) => (isFilled(v) ? f(v) : "#");

export default function Contact() {
  const root = useRef(null);
  const [copied, setCopied] = useState(false);
  const c = site.contact;
  const playSound = useSound(); // Panggil Hook

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".char", {
          yPercent: 110,
          stagger: 0.04,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: root.current, start: "top 60%" },
        });
        gsap.from(".c-fade", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 50%" },
        });
        gsap.from(".c-word", {
          yPercent: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".c-word", start: "top 95%" },
        });
      });
    },
    { scope: root },
  );

  const copy = async () => {
    playSound(); // <-- Tambah Sound
    try {
      await navigator.clipboard.writeText(c.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* diabaikan */
    }
  };

  const socials = [
    ["WA", "WhatsApp", href(c.whatsapp, (v) => `https://wa.me/${v}`)],
    ["in", "LinkedIn", href(c.linkedin, (v) => v)],
    ["GH", "GitHub", href(c.github, (v) => v)],
    ["@", "Email", href(c.email, (v) => `mailto:${v}`)],
  ];

  return (
    <section
      id="contact"
      ref={root}
      className="relative overflow-hidden bg-wine pt-32"
      style={{
        backgroundImage:
          "radial-gradient(900px 600px at 50% 105%, rgba(228,96,122,.45), transparent 62%)",
      }}
    >
      <div className="px-6 md:px-16">
        <p className="label mb-4 text-blush">Connect</p>
        <h2 className="font-display text-[15vw] font-extrabold leading-[.95] tracking-[-.03em] md:text-[10vw]">
          <Chars text="LET’S BUILD" />
        </h2>
        <p className="font-serif text-[16vw] italic leading-none text-blush md:text-[11vw]">
          something.
        </p>

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="c-fade">
            <button
              onClick={copy}
              data-cursor="Copy"
              className="text-left font-display text-3xl font-extrabold md:text-5xl"
            >
              {c.email}
              <span className="label ml-3 align-middle text-rose">
                {copied ? "Copied!" : "click to copy"}
              </span>
            </button>

            <div className="mt-8 flex flex-wrap gap-6">
              {socials.map(([s, l, h]) => (
                <Magnetic key={l}>
                  <a
                    href={h}
                    target={h.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    onClick={playSound} // <-- Tambah Sound
                    className="flex flex-col items-center gap-2"
                    aria-label={l}
                  >
                    <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-cream/50 font-display text-xl font-extrabold transition-colors hover:bg-cream hover:text-ink">
                      {s}
                    </span>
                    <span className="label text-[10px] opacity-70">{l}</span>
                  </a>
                </Magnetic>
              ))}

              <Magnetic>
                <a
                  href={c.cv}
                  download
                  onClick={playSound} // <-- Tambah Sound
                  className="flex flex-col items-center gap-2"
                  aria-label="Download CV"
                >
                  <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-rose font-display text-xl font-extrabold text-ink">
                    CV
                  </span>
                  <span className="label text-[10px] opacity-70">
                    Download CV
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>

          <p className="c-fade max-w-sm text-xl text-cream/90">
            Got an interesting project, a data challenge, or just want to talk
            tech? Let’s build something.
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="c-word relative mt-16 select-none overflow-hidden"
      >
        <p className="-mb-[6vw] whitespace-nowrap text-center font-display text-[36vw] font-extrabold leading-[.85] tracking-[-.04em] text-cream">
          RAFFA
        </p>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <footer className="label relative flex flex-wrap justify-between gap-4 bg-ink px-6 py-6 text-cream/70 md:px-16">
        <span className="flex items-center gap-3">
          <img
            src="/brand/woodmark-raffa-w.svg"
            alt="Raffa"
            className="h-5 w-auto"
          />
          © 2026
        </span>
        <span>{site.location}</span>
        <span>Powered by coffee</span>
        <button
          onClick={() => {
            playSound();
            window.__lenis?.scrollTo(0);
          }}
        >
          Back to top ↑
        </button>
      </footer>
    </section>
  );
}
