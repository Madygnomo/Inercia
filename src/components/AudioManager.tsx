import React, { useEffect, useRef } from 'react';
import { useStore } from '../store';

export const AudioManager: React.FC = () => {
  const { hasStarted, scrollProgress } = useStore();
  
  // Audio Refs
  const streetNoiseRef = useRef<HTMLAudioElement>(null);
  const multipleNotifRef = useRef<HTMLAudioElement>(null);
  const glitchRef = useRef<HTMLAudioElement>(null);
  const chaoticRef = useRef<HTMLAudioElement>(null);
  const casinoMachineRef = useRef<HTMLAudioElement>(null);
  const casinoTopSymbolRef = useRef<HTMLAudioElement>(null);
  const tensionRiserRef = useRef<HTMLAudioElement>(null);
  const laughingRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!hasStarted) return;
    
    // Attempt play on all. Browsers usually require interaction, which `hasStarted` implies (button click).
    [
      streetNoiseRef, multipleNotifRef, glitchRef, chaoticRef, 
      casinoMachineRef, casinoTopSymbolRef, tensionRiserRef, laughingRef
    ].forEach(ref => {
      if (ref.current) {
        ref.current.volume = 0; // start muted
        ref.current.play().catch(e => console.log('Audio play failed:', e));
      }
    });
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const clamp = (val: number) => Math.max(0, Math.min(1, val));
    
    // Helper to map a progress range [start, end] to a volume peak curve [0 -> 1 -> 0]
    const getPeakVolume = (prog: number, start: number, peak: number, end: number, maxVol = 1) => {
      if (prog < start || prog > end) return 0;
      if (prog <= peak) return clamp((prog - start) / (peak - start)) * maxVol;
      return clamp(1 - (prog - peak) / (end - peak)) * maxVol;
    };

    const getFadeOutVolume = (prog: number, start: number, end: number, maxVol = 1) => {
      if (prog < start) return maxVol;
      if (prog > end) return 0;
      return clamp(1 - (prog - start) / (end - start)) * maxVol;
    };

    if (streetNoiseRef.current) streetNoiseRef.current.volume = getFadeOutVolume(scrollProgress, 0.2, 0.35, 0.6);
    if (multipleNotifRef.current) multipleNotifRef.current.volume = getPeakVolume(scrollProgress, 0.05, 0.15, 0.25, 0.8);
    if (glitchRef.current) glitchRef.current.volume = getPeakVolume(scrollProgress, 0.15, 0.35, 0.55, 0.4);
    if (chaoticRef.current) chaoticRef.current.volume = getPeakVolume(scrollProgress, 0.4, 0.55, 0.7, 0.6);
    
    if (casinoMachineRef.current) casinoMachineRef.current.volume = getPeakVolume(scrollProgress, 0.6, 0.72, 0.8, 1);
    // casinoTopSymbol could trigger intensely near the exact casino text
    if (casinoTopSymbolRef.current) casinoTopSymbolRef.current.volume = getPeakVolume(scrollProgress, 0.68, 0.72, 0.78, 0.6);
    
    if (tensionRiserRef.current) tensionRiserRef.current.volume = getPeakVolume(scrollProgress, 0.7, 0.85, 0.95, 0.9);
    if (laughingRef.current) laughingRef.current.volume = getPeakVolume(scrollProgress, 0.8, 0.95, 1.0, 0.7);
    
  }, [scrollProgress, hasStarted]);

  return (
    <div className="hidden">
      <audio ref={streetNoiseRef} src="/audios/Street noise.MP3" loop />
      <audio ref={multipleNotifRef} src="/audios/multiple notifications.MP3" loop />
      <audio ref={glitchRef} src="/audios/Glitch.MP3" loop />
      <audio ref={chaoticRef} src="/audios/Chaotic.MP3" loop />
      <audio ref={casinoMachineRef} src="/audios/casino machine.MP3" loop />
      <audio ref={casinoTopSymbolRef} src="/audios/Casino top symbol.MP3" loop />
      <audio ref={tensionRiserRef} src="/audios/Tension riser.MP3" loop />
      <audio ref={laughingRef} src="/audios/Laughing.MP3" loop />
    </div>
  );
};
