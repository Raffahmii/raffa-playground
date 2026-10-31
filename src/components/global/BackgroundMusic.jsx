import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    // Panggil file backsound.mp4 lu
    audioRef.current = new Audio("/sound/backsound.mp4");
    audioRef.current.loop = true; // Set looping
    audioRef.current.volume = 0.15; // Volume dikecilin biar ga berisik (0.0 - 1.0)

    // Fungsi buat mulai muter musik
    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((e) => {
          console.log("Autoplay diblokir browser:", e);
        });
      }
      // Hapus event listener setelah berhasil muter sekali
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
    };

    // Browser modern ngeblokir autoplay. Kita harus nunggu user nge-klik/nge-tap layar dulu.
    window.addEventListener("click", startAudio);
    window.addEventListener("touchstart", startAudio);

    return () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return null; // Komponen ini ga ngerender UI apa-apa
}
