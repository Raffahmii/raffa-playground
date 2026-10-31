import { useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import certs from "../data/certificates.json";
import { useSound } from "../hooks/useSound";

const getLayoutClass = (i) => {
  const layouts = [
    "col-span-12 md:col-span-7 md:col-start-1",
    "col-span-12 md:col-span-4 md:col-start-9 md:mt-48",
    "col-span-12 md:col-span-5 md:col-start-2 md:-mt-30",
    "col-span-12 md:col-span-6 md:col-start-7 md:mt-32",
    "col-span-12 md:col-span-5 md:col-start-1 md:mt-30",
    "col-span-12 md:col-span-6 md:col-start-7 md:mt-25",
  ];
  return layouts[i % layouts.length];
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

export default function Certificates() {
  const root = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const playSound = useSound();

  const fromDetail = location.state?.fromDetail || false;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!fromDetail) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 1400);
      return () => {
        document.body.style.overflow = "auto";
        clearTimeout(timer);
      };
    } else {
      window.history.replaceState({}, document.title);
    }
  }, [fromDetail]);

  const handleBackToStory = () => {
    playSound();
    navigate("/");
    setTimeout(() => window.__lenis?.scrollTo("#story"), 600);
  };

  // Dynamic variants biar delay-nya nyesuain (kalau dari detail ga perlu nunggu 3 balok)
  const dynamicContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: fromDetail ? 0.2 : 1.4,
      },
    },
  };

  return (
    <>
      {!fromDetail && (
        <div className="fixed inset-0 z-[200] pointer-events-none flex">
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: ["-100%", "0%", "0%", "-100%"] }}
            transition={{
              duration: 1.4,
              times: [0, 0.25, 0.75, 1],
              ease: [0.76, 0, 0.24, 1],
            }}
            className="h-full w-1/3 bg-burgundy border-r border-wine/20"
          />
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: ["-100%", "0%", "0%", "-100%"] }}
            transition={{
              duration: 1.4,
              times: [0, 0.25, 0.75, 1],
              ease: [0.76, 0, 0.24, 1],
              delay: 0.05,
            }}
            className="h-full w-1/3 bg-wine border-r border-claret/20"
          />
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: ["-100%", "0%", "0%", "-100%"] }}
            transition={{
              duration: 1.4,
              times: [0, 0.25, 0.75, 1],
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1,
            }}
            className="h-full w-1/3 bg-claret"
          />
        </div>
      )}

      <main
        ref={root}
        className="min-h-screen bg-ink pb-32 text-cream relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-[radial-gradient(circle_at_top_right,rgba(228,96,122,0.12),transparent_60%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#F5EBDD 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="mx-auto max-w-7xl px-6 md:px-16 relative z-10 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
              delay: fromDetail ? 0.2 : 1.2,
            }}
            className="mb-24 md:mb-40 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-cream/10 pb-16"
          >
            <div>
              <button
                onClick={handleBackToStory}
                className="label mb-8 inline-flex items-center gap-2 text-rose hover:text-blush transition-colors cursor-pointer"
              >
                <span>←</span> Back to Story
              </button>
              <h1 className="font-display text-[16vw] md:text-[10vw] font-extrabold uppercase leading-[0.8] tracking-tighter">
                Wall
                <br />
                <span className="font-serif italic text-rose font-normal lowercase tracking-normal">
                  of
                </span>{" "}
                Fame.
              </h1>
            </div>
            <div className="max-w-xs border-l-2 border-rose pl-6">
              <p className="label text-rose mb-2">Archive / 2023-2026</p>
              <p className="text-cream/70 leading-relaxed text-sm md:text-base">
                The receipts. A curated collection of certifications,
                achievements, and milestones gathered along the journey.
              </p>
            </div>
          </motion.div>

          {/* Grid dengan Dynamic Variants biar delay-nya bener */}
          <motion.div
            variants={dynamicContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-12 gap-10 md:gap-24 pb-32"
          >
            {certs.map((c, i) => {
              const layoutClass = getLayoutClass(i);
              return (
                <motion.div
                  key={c.slug}
                  variants={itemVariants}
                  className={`relative group ${layoutClass}`}
                >
                  <span className="absolute -top-16 -left-8 text-[10rem] font-display font-extrabold text-cream/[0.03] pointer-events-none select-none z-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 w-full overflow-hidden rounded-3xl border-2 border-cream/10 bg-wine shadow-2xl transition-all duration-500 group-hover:border-rose/50 group-hover:shadow-[0_20px_60px_-15px_rgba(228,96,122,0.3)]">
                    <img
                      src={c.cover}
                      alt={c.title}
                      loading="lazy"
                      className="w-full aspect-[4/3] md:aspect-video object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-ink/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center backdrop-blur-sm">
                      <Link
                        to={`/certificates/${c.slug}`}
                        onClick={playSound}
                        className="rounded-full bg-rose px-8 py-4 font-bold text-ink transform translate-y-8 transition-all duration-300 group-hover:translate-y-0 hover:scale-105 hover:bg-blush"
                      >
                        View Certificate ↗
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-start transition-transform duration-300 group-hover:translate-x-2">
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-extrabold leading-tight max-w-[80%] group-hover:text-rose transition-colors">
                        {c.title}
                      </h3>
                      <p className="mt-2 label text-cream/50">
                        {c.type} · {c.stack.join(" · ")}
                      </p>
                    </div>
                    <span className="label text-rose px-4 py-1.5 border border-rose/30 rounded-full bg-rose/10">
                      {c.year}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-center border-t border-cream/10 pt-20"
          >
            <p className="text-cream/60 mb-6">Want to see more?</p>
            <a
              href="https://www.linkedin.com/in/raffa-izzel/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 items-center rounded-full border-2 border-cream px-10 font-bold transition-all hover:border-rose hover:text-rose hover:scale-105"
            >
              Check LinkedIn Profile ↗
            </a>
          </motion.div>
        </div>
      </main>
    </>
  );
}
