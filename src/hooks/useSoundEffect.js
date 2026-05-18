import { useCallback, useRef } from "react";

export const useSoundEffect = (url, volume = 0.5) => {
  const audioRef = useRef(null);

  const playSound = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.volume = volume;
    }
    
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      console.log("Audio play blocked by browser autoplay restrictions");
    });
  }, [url, volume]);

  return playSound;
};
