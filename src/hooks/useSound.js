import { useEffect, useRef } from 'react'

let audioCtx = null

export function useSound(src = '/sound/blob.mp3') {
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio(src)
    audioRef.current.volume = 0.3 // Atur volume biar ga kenceng banget
  }, [src])

  const play = () => {
    if (!audioRef.current) return
    // Reset audio ke awal biar bisa di-spam klik
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {
      // Abaikan error kalau browser blokir autoplay
    })
  }

  return play
}