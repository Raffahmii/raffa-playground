import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import timeline from "../../data/timeline.json";
import narrative from "../../data/narrative.json";
import certs from "../../data/certificates.json";
import Star from "../ui/Star";
import { useSound } from "../../hooks/useSound";

const pad = (n) => String(n).padStart(2, "0");
const PATH =
  "M55 20 C55 120 90 150 90 270 C90 390 20 400 20 520 C20 640 90 650 90 770 C90 890 55 880 55 980";

export default function Story() {
  const root = useRef(null);
  const wrap = useRef(null);
  const pv = useRef(null);
  const [hov, setHov] = useState(null);
  const playSound = useSound();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const n = timeline.length;
          const path = root.current.querySelector(".tl-path");
          const svg = path.ownerSVGElement;
          const L = path.getTotalLength();
          const nodes = gsap.utils.toArray(".nd", root.current);
          const cnt = root.current.querySelector(".cnt");
          let last = -1;

          gsap.set(path, { strokeDasharray: L, strokeDashoffset: L });
          gsap.set(".yr", { yPercent: 100, opacity: 0 });

          gsap.set(".sc", { x: 150, rotate: 5, opacity: 0 });
          gsap.set(".yr-0", { yPercent: 0, opacity: 1 });
          gsap.set(".sc-0", { x: 0, rotate: 0, opacity: 1 });
          gsap.set(nodes, { scale: 0.6 });

          const scale = () => {
            const r = svg.getBoundingClientRect();
            return [r.width / 110, r.height / 1000];
          };
          const layout = () => {
            const [sx, sy] = scale();
            nodes.forEach((nd, i) => {
              const pt = path.getPointAtLength((L * i) / (n - 1));
              gsap.set(nd, { x: pt.x * sx - 12, y: pt.y * sy - 12 });
            });
          };

          const place = (p) => {
            const [sx, sy] = scale();
            const pt = path.getPointAtLength(L * p);
            path.style.strokeDashoffset = L * (1 - p);
            gsap.set(".trav", {
              x: pt.x * sx - 16,
              y: pt.y * sy - 16,
              rotate: p * 540,
            });
            gsap.to(".hint", {
              opacity: p > 0.04 ? 0 : 1,
              duration: 0.3,
              overwrite: "auto",
            });
            const k = Math.min(n - 1, Math.floor(p * (n - 1) + 0.12));
            if (k !== last) {
              last = k;
              nodes.forEach((nd, i) =>
                gsap.to(nd, {
                  scale: i <= k ? 1 : 0.6,
                  backgroundColor: i <= k ? "#E4607A" : "#3A0E19",
                  duration: 0.3,
                  overwrite: "auto",
                }),
              );
              cnt.textContent = pad(k + 1);
              gsap.fromTo(
                nodes[k].querySelector(".rg"),
                { scale: 1, opacity: 0.9 },
                { scale: 2.8, opacity: 0, duration: 0.9, ease: "power2.out" },
              );
            }
          };
          layout();
          place(0);
          ScrollTrigger.addEventListener("refresh", layout);

          const proxy = { p: 0 };
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".st-pin",
              pin: true,
              scrub: 0.6,
              start: "top top",
              end: () => "+=" + n * window.innerHeight,
              invalidateOnRefresh: true,
            },
          });
          tl.to(
            proxy,
            {
              p: 1,
              ease: "none",
              duration: n - 1,
              onUpdate: () => place(proxy.p),
            },
            0,
          );

          for (let i = 1; i < n; i++) {
            tl.to(
              `.yr-${i - 1}`,
              { yPercent: -100, opacity: 0, duration: 0.4 },
              i - 0.5,
            )
              .to(
                `.sc-${i - 1}`,
                { x: -150, rotate: -5, opacity: 0, duration: 0.4 },
                i - 0.5,
              )

              .fromTo(
                `.yr-${i}`,
                { yPercent: 100, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 0.4 },
                i - 0.3,
              )
              .fromTo(
                `.sc-${i}`,
                { x: 150, rotate: 5, opacity: 0 },
                { x: 0, rotate: 0, opacity: 1, duration: 0.4 },
                i - 0.3,
              )

              .fromTo(
                `.mls-${i} li`,
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.06, duration: 0.3 },
                i - 0.2,
              );
          }
          return () => ScrollTrigger.removeEventListener("refresh", layout);
        },
      );
    },
    { scope: root },
  );

  const move = (e) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const r = wrap.current.getBoundingClientRect();
    gsap.to(pv.current, {
      x: e.clientX - r.left + 40,
      y: e.clientY - r.top - 80,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <section
      id="story"
      ref={root}
      className="relative bg-burgundy"
      style={{
        backgroundImage:
          "radial-gradient(800px 500px at 80% 80%, rgba(228,96,122,.18), transparent 60%)",
      }}
    >
      <div className="px-6 pb-16 pt-28 md:px-16">
        <p className="label text-blush">Story</p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {narrative.map(([t, d], i) => (
            <div key={t} className="border-t border-cream/25 pt-5">
              <span className="label text-rose">{pad(i + 1)}</span>
              <h3 className="mt-2 font-display text-3xl font-extrabold leading-none">
                {t}
              </h3>
              <p className="mt-3 text-[17px] text-cream/80">{d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="st-pin relative px-6 py-16 lg:h-screen lg:px-16 lg:py-0">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[.12] lg:block"
          style={{
            backgroundImage: "radial-gradient(#F5EBDD 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <h2 className="relative font-display text-[9vw] font-extrabold leading-[1.05] lg:absolute lg:left-16 lg:top-24 lg:max-w-[40vw] lg:text-[2.6vw]">
          Where this is{" "}
          <span className="font-serif font-normal italic text-blush">
            going
          </span>
          .
        </h2>
        <p className="label absolute right-16 top-24 hidden text-blush lg:block">
          <span className="cnt">01</span> / {pad(timeline.length)}
        </p>
        <p className="hint label absolute bottom-10 left-16 hidden text-blush lg:block">
          Scroll to travel ↓
        </p>

        <div className="hidden lg:absolute lg:left-16 lg:top-[15vh] lg:block lg:h-[56vh] lg:w-[38vw]">
          {timeline.map((t, i) => (
            <div key={t.year} className={`yr yr-${i} absolute left-0 top-0`}>
              <p className="font-display text-[11vw] font-extrabold leading-none text-cream drop-shadow-lg">
                {t.year}
              </p>
              <ul className={`mls-${i} mt-6 space-y-3`}>
                {t.milestones.map((m) => (
                  <li
                    key={m}
                    className="flex items-start gap-3 text-xl text-cream/90"
                  >
                    <Star size={16} className="mt-1.5" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="absolute bottom-24 left-[44.5vw] top-28 hidden w-[110px] lg:block">
          <svg
            viewBox="0 0 110 1000"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <path
              d={PATH}
              fill="none"
              stroke="rgba(245,235,221,.25)"
              strokeWidth="2"
              strokeDasharray="4 8"
            />
            <path
              className="tl-path"
              d={PATH}
              fill="none"
              stroke="#E4607A"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px #E4607A)" }}
            />
          </svg>
          {timeline.map((t) => (
            <div
              key={t.year}
              className="nd absolute left-0 top-0 h-6 w-6 rounded-full border-2 border-cream/60 bg-wine"
            >
              <span className="rg absolute inset-0 rounded-full border-2 border-rose opacity-0" />
            </div>
          ))}
          <div className="trav pointer-events-none absolute left-0 top-0 h-8 w-8">
            <span className="absolute inset-0 animate-ping rounded-full bg-rose/40" />
            <Star
              size={32}
              className="relative drop-shadow-[0_0_12px_#E4607A]"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:absolute lg:left-[52vw] lg:right-16 lg:top-[18vh] lg:mt-0 lg:block lg:h-[52vh]">
          {timeline.map((t, i) => (
            <article
              key={t.year}
              className={`sc sc-${i} relative overflow-hidden rounded-[28px] bg-cream p-7 text-ink shadow-2xl md:p-8 lg:absolute lg:inset-x-0 lg:top-0`}
            >
              <div className="pointer-events-none absolute -right-6 -top-6 opacity-10">
                <Star size={140} color="#A32239" />
              </div>
              <div className="relative flex items-center justify-between">
                <span
                  className={`label rounded-full px-3 py-1 ${t.status === "now" ? "bg-rose text-ink" : "border border-ink/30 text-ink/70"}`}
                >
                  {t.status === "now" ? "Now" : "Next"}
                </span>
                <span className="label text-claret">
                  Phase {pad(i + 1)} / {pad(timeline.length)}
                </span>
              </div>
              <p className="label relative mt-6 text-claret">{t.year}</p>
              <h3 className="relative mt-2 font-display text-3xl font-extrabold leading-none md:text-4xl">
                {t.title}
              </h3>
              <div className="relative mt-5 flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-claret/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-claret"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ul className="relative mt-6 space-y-2 lg:hidden">
                {t.milestones.map((m) => (
                  <li
                    key={m}
                    className="flex items-start gap-2 text-[15px] text-[#5A4A4E]"
                  >
                    <Star size={12} color="#A32239" className="mt-1.5" />
                    {m}
                  </li>
                ))}
              </ul>
              <div className="relative mt-7 flex gap-1.5" aria-hidden="true">
                {timeline.map((_, k) => (
                  <span
                    key={k}
                    className={`h-1.5 flex-1 rounded-full ${k <= i ? "bg-claret" : "bg-ink/10"}`}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        ref={wrap}
        onMouseMove={move}
        onMouseLeave={() => setHov(null)}
        className="relative px-6 pb-28 pt-12 lg:px-16"
      >
        <p className="label text-blush">Achievements</p>
        <h3 className="mb-6 font-serif text-5xl italic md:text-6xl">
          Receipts.{" "}
          <span className="font-display text-3xl font-extrabold not-italic md:text-4xl">
            (Yes, I kept them.)
          </span>
        </h3>
        <ul>
          {certs.map((c, i) => {
            const inner = (
              <div
                className={`flex items-center gap-4 border-t border-cream/20 py-5 transition-opacity duration-300 ${hov !== null && hov !== i ? "opacity-40" : ""}`}
                onMouseEnter={() => setHov(i)}
              >
                <span className="label w-8 text-rose">{pad(i + 1)}</span>
                <span
                  className={`flex-1 font-display text-2xl font-extrabold transition-transform duration-300 md:text-4xl ${hov === i ? "translate-x-4" : ""}`}
                >
                  {c.title}
                </span>
                <span className="label hidden sm:block">{c.year}</span>
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 ${hov === i ? "!border-rose bg-rose text-ink" : ""}`}
                >
                  ↗
                </span>
              </div>
            );
            return (
              <li key={c.slug}>
                {/* Arahin ke detail spesifik berdasarkan slug */}
                <Link
                  to={`/certificates/${c.slug}`}
                  onClick={playSound}
                  data-cursor="View"
                >
                  {inner}
                </Link>
              </li>
            );
          })}
        </ul>
        <div
          ref={pv}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 hidden h-44 w-64 rotate-6 overflow-hidden rounded-lg border-4 border-cream bg-wine shadow-2xl transition-opacity duration-300 lg:block"
          style={{ opacity: hov === null ? 0 : 1 }}
        >
          {hov !== null &&
            (certs[hov].cover ? (
              <img
                src={certs[hov].cover}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="label flex h-full items-center justify-center p-4 text-center text-blush">
                {certs[hov].title}
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
