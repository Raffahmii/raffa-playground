import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSound } from "../../hooks/useSound"; // (Opsional) Kalau mau ada suara pas loading

export default function Loader() {
  const [show, setShow] = useState(!window.__loaderDone);
  const root = useRef(null);
  const num = useRef(null);
  const api = useRef({});
  const playSound = useSound();

  useEffect(() => {
    if (!show) return;
    window.__lenis?.stop();
    const obj = { v: 0 };

    const finish = () => {
      try {
        sessionStorage.setItem("seen", "1");
      } catch {
        /* diabaikan */
      }
      window.__loaderDone = true;
      window.__lenis?.start();
      window.dispatchEvent(new Event("loader:done"));
      setShow(false);
    };

    const tl = gsap.timeline();

    // 1. Animasi Logo Muncul (0.8s)
    tl.from(".ld-r", {
      scale: 0.6,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(2)",
    })

      // 2. Animasi Counter Angka (Diperlama dari 1.6s jadi 3.5s)
      // Kecepatan counter ngikutin durasi ini.
      .to(
        obj,
        {
          v: 100,
          duration: 3.5, // <-- UBAH DISINI BUAT NGELAMAIN COUNTER
          ease: "power2.inOut",
          onUpdate: () => {
            if (num.current)
              num.current.textContent = String(Math.round(obj.v)).padStart(
                3,
                "0",
              );
          },
        },
        0.2,
      )

      // 3. Animasi Logo Muter (Diperlama)
      .to(".ld-r", { rotate: 720, duration: 2.5, ease: "power3.inOut" }, 0.6)

      // 4. Efek Morph Logo (Tetep sama)
      .to(".ld-a", { opacity: 0, duration: 0.15 }, 2.0)
      .to(".ld-b", { opacity: 1, duration: 0.15 }, 2.0)
      .to(".ld-b", { opacity: 0, duration: 0.15 }, 3.0)
      .to(".ld-a", { opacity: 1, duration: 0.15 }, 3.0)

      // 5. Tirai Naik (Diperlama dari 0.9s jadi 1.4s)
      .to(
        root.current,
        { yPercent: -100, duration: 1.4, ease: "power4.inOut" },
        "+=0.2",
      )

      .call(finish);

    api.current = { tl, finish };
    return () => tl.kill();
  }, [show]);

  const skip = () => {
    playSound();
    api.current.tl?.kill();
    // Kalau di-skip, tirai tetap turun cepet (0.8s)
    gsap.to(root.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: api.current.finish,
    });
  };

  if (!show) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
      style={{
        backgroundImage:
          "radial-gradient(700px 500px at 50% 52%, rgba(228,96,122,.22), transparent 65%)",
      }}
    >
      <span className="label absolute left-6 top-6 opacity-60 md:left-16">
        Raffa // 2026
      </span>

      {/* Logo */}
      <div className="ld-r relative flex h-36 w-36 items-center justify-center rounded-full bg-cream">
        <img
          src="/brand/monogram-r.svg"
          alt=""
          className="ld-a absolute h-16 w-16"
        />
        <img
          src="/brand/monogram-r-morph.svg"
          alt=""
          className="ld-b absolute h-16 w-16 opacity-0"
        />
      </div>

      {/* Counter & Teks */}
      <p className="mt-10 font-display text-6xl font-extrabold">
        <span ref={num}>000</span>
        <span className="label ml-2 opacity-60">%</span>
      </p>

      <p className="mt-3 font-serif text-3xl italic text-blush">
        Crafting my story...
      </p>

      {/* Tombol Skip */}
      <button
        onClick={skip}
        className="absolute bottom-8 right-6 h-11 rounded-full border border-cream/45 px-6 text-sm font-semibold md:right-16"
      >
        Skip ›
      </button>
    </div>
  );
}
