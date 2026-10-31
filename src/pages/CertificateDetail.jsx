import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import certs from "../data/certificates.json";
import Magnetic from "../components/ui/Magnetic";
import { useSound } from "../hooks/useSound"; // Tambahan buat sound di tombol back

gsap.registerPlugin(ScrollTrigger);

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1.2 },
  },
};

export default function CertificateDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const p = certs.find((x) => x.slug === slug);
  const containerRef = useRef(null);
  const playSound = useSound(); // Panggil Hook

  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 1400);
    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const path = document.querySelector(".squiggly-path");
    if (!path) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    const st = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 20%",
        end: "bottom 80%",
        scrub: 1,
      },
    });
    return () => st.kill();
  }, [p]);

  const handleBack = () => {
    playSound();
    setIsExiting(true);
    setTimeout(() => {
      navigate("/certificates", { state: { fromDetail: true } });
    }, 1200);
  };

  if (!p)
    return (
      <main className="grid min-h-screen place-items-center bg-wine">
        <div className="text-center">
          <h1 className="font-display text-6xl font-extrabold text-cream">
            404
          </h1>
          <p className="mt-4 text-cream/70">Certificate not found.</p>
          <Link
            to="/certificates"
            className="mt-8 inline-block rounded-full bg-rose px-8 py-3 font-semibold text-ink hover:bg-blush"
          >
            Back to Certificates
          </Link>
        </div>
      </main>
    );

  return (
    <>
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

      <AnimatePresence>
        {isExiting && (
          <motion.div className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100vh" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute w-1.5 bg-rose z-10"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 3 }}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute h-[100vw] w-[100vw] rounded-full bg-burgundy z-20 shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="min-h-screen bg-ink pb-32 text-cream relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(228,96,122,0.15),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 px-6 pb-24 pt-40 md:px-16">
          <div className="relative z-10 mx-auto max-w-6xl">
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="show"
            >
              <button
                onClick={handleBack}
                className="label mb-12 inline-flex items-center gap-2 text-rose hover:text-blush transition-colors"
              >
                <span>←</span> Back to Wall of Fame
              </button>
              <h1 className="font-display text-[12vw] font-extrabold uppercase leading-[.9] tracking-tight md:text-[7vw]">
                {p.title}
              </h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-rose/20 px-4 py-1.5 text-sm font-semibold text-rose">
                  {p.type}
                </span>
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-cream/20 px-4 py-1.5 text-sm"
                  >
                    {s}
                  </span>
                ))}
                <span className="rounded-full border border-cream/20 px-4 py-1.5 text-sm">
                  {p.year}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative mx-auto max-w-6xl px-6 md:px-16 mt-8"
        >
          <div className="absolute left-0 top-0 hidden h-full w-[60px] lg:block -translate-x-1/2">
            <svg
              width="60"
              height="100%"
              viewBox="0 0 60 1000"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <path
                className="squiggly-path"
                d="M30,0 C60,100 -20,200 30,300 C80,400 -10,500 30,600 C70,700 -20,800 30,900 C60,950 20,980 30,1000"
                fill="none"
                stroke="var(--color-rose)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative z-20 -mt-8 rounded-3xl overflow-hidden border border-cream/10 shadow-2xl bg-ink"
          >
            <img
              src={p.cover}
              alt={p.title}
              className="w-full object-cover max-h-[70vh]"
            />
          </motion.div>

          <div className="mt-24 grid gap-12 md:grid-cols-2 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="label text-rose mb-4 border-b border-cream/20 pb-2">
                The Background
              </h2>
              <p className="text-xl leading-relaxed text-cream/80">
                {p.problem}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="label text-rose mb-4 border-b border-cream/20 pb-2">
                The Action
              </h2>
              <p className="text-xl leading-relaxed text-cream/80">
                {p.solution}
              </p>
            </motion.div>
          </div>

          {p.details && p.details.length > 0 && (
            <div className="mt-24 relative z-10">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="label mb-8 text-claret border-b border-cream/20 pb-4"
              >
                Certificate Highlights
              </motion.h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {p.details.map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group rounded-2xl border border-cream/10 bg-wine p-6 transition-all hover:border-rose/50 hover:bg-wine/80"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-rose/10 text-rose group-hover:bg-rose group-hover:text-ink transition-colors">
                      <span className="text-xl font-bold">✦</span>
                    </div>
                    <h3 className="font-display text-xl font-extrabold text-cream">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/70">
                      {d.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {p.desktop && p.desktop.length > 0 && (
            <div className="mt-24 relative z-10">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="label mb-8 text-claret border-b border-cream/20 pb-4"
              >
                Documentation
              </motion.h2>
              <div className="space-y-12">
                {p.desktop.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 }}
                    className="overflow-hidden rounded-2xl border border-cream/10 shadow-lg bg-ink"
                  >
                    <img
                      src={img}
                      alt={`Main ${i + 1}`}
                      className="w-full object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {p.gallery && p.gallery.length > 0 && (
            <div className="mt-24 relative z-10">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="label mb-8 text-claret border-b border-cream/20 pb-4"
              >
                Additional Pages
              </motion.h2>
              <div className="grid gap-6 md:grid-cols-2">
                {p.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (i % 2) * 0.1 }}
                    className="overflow-hidden rounded-2xl border border-cream/10 bg-ink shadow-lg"
                  >
                    <img
                      src={img}
                      alt={`Additional ${i + 1}`}
                      className="w-full object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 relative z-10 flex flex-col items-center justify-center rounded-3xl border border-cream/10 bg-wine p-12 text-center overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 text-rose/10 text-[200px] font-display font-extrabold pointer-events-none select-none">
              CERT
            </div>

            <h2 className="font-display text-4xl font-extrabold mb-6 md:text-5xl">
              Want to see{" "}
              <span className="font-serif italic text-rose font-normal">
                more
              </span>
              ?
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic>
                <a
                  href="https://www.linkedin.com/in/raffa-izzel/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 items-center rounded-full bg-rose px-8 font-semibold text-ink transition-transform hover:scale-105"
                >
                  LinkedIn Profile ↗
                </a>
              </Magnetic>
            </div>

            <div className="mt-16 pt-10 border-t border-cream/10 w-full flex justify-center">
              <Magnetic>
                <button
                  onClick={handleBack}
                  className="group inline-flex items-center gap-3 font-display text-2xl font-extrabold text-cream hover:text-rose transition-colors"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream group-hover:border-rose transition-colors">
                    ←
                  </span>
                  Back to Wall of Fame
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
}
