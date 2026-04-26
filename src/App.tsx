import React, { useRef, useEffect } from 'react';
import { DadaScene } from './components/3d/DadaScene';
import { WebcamTracker } from './components/WebcamTracker';
import { UIOverlay } from './components/UIOverlay';
import { TextPhaseTwo } from './components/TextPhaseTwo';
import { TextPhaseThree } from './components/TextPhaseThree';
import { StartScreen } from './components/StartScreen';
import { AudioManager } from './components/AudioManager';
import { useStore } from './store';

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const setScrollProgress = useStore((state) => state.setScrollProgress);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const hasStarted = useStore((state) => state.hasStarted);
  const useWebcam = useStore((state) => state.useWebcam);

  // Sync scroll progress reading
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollProgress(progress);
    }
  };

  // Hand tracking scroll logic
  useEffect(() => {
    let animationFrameId: number;

    const updateScrollFromHand = () => {
      // Only process hand scroll if webcam is enabled and experience has started
      if (useStore.getState().useWebcam && useStore.getState().hasStarted) {
        const currentHand = useStore.getState().handPosition;
        
        if (currentHand && scrollContainerRef.current) {
          // Hand Y is 0 (top) to 1 (bottom)
          const y = currentHand.y;
          const scrollSpeedBase = 25;

          // If hand is in the lower 40% -> Scroll Down
          if (y > 0.6) {
            const intensity = (y - 0.6) / 0.4;
            scrollContainerRef.current.scrollTop += scrollSpeedBase * intensity;
          } 
          // If hand is in the upper 40% -> Scroll Up
          else if (y < 0.4) {
            const intensity = (0.4 - y) / 0.4;
            scrollContainerRef.current.scrollTop -= scrollSpeedBase * intensity;
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateScrollFromHand);
    };

    updateScrollFromHand();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full h-screen relative font-sans overflow-hidden bg-black text-white flex flex-col items-center justify-center">
      
      {!hasStarted && <StartScreen />}
      <AudioManager />

      <div className="fixed top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-900/40 via-blue-900/20 to-transparent pointer-events-none opacity-60 z-0"></div>
      
      <div className="fixed inset-0 z-0">
        <DadaScene />
      </div>

      <WebcamTracker />

      {/* Main Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="absolute inset-0 z-10 overflow-x-hidden overflow-y-auto"
      >
        {/* Much taller container for a long journey -> min-h-[1000vh] gives us 10 viewport heights to scroll */}
        <div className="w-full min-h-[1000vh] flex flex-col items-center">
          <UIOverlay />
          
          <div 
            className="w-full max-w-3xl mt-[50vh] space-y-64 pb-[100vh] relative z-20 pointer-events-auto transition-opacity duration-300 px-4"
            style={{ opacity: scrollProgress < 0.05 || scrollProgress > 0.95 ? 0 : Math.sin(scrollProgress * Math.PI) }}
          >
            
            <div className="p-8 bg-black/40 border border-white/5 backdrop-blur-md rounded-lg group hover:border-white/20 transition-colors ml-[-10%] flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-5/12 aspect-square bg-zinc-900 overflow-hidden rounded-full relative filter grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-[0_0_30px_rgba(0,255,255,0.1)] group-hover:shadow-[0_0_50px_rgba(0,255,255,0.3)]">
                    <video src="/pupila.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 mix-blend-screen group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="w-full md:w-7/12">
                  <p className="font-serif text-3xl leading-relaxed text-white/80 group-hover:text-white transition-colors">
                    Este siglo, el reposo no es ausencia de movimiento.
                  </p>
                </div>
            </div>

            <div className="p-8 bg-black/40 border border-white/5 backdrop-blur-md rounded-lg group hover:border-white/20 transition-colors ml-[10%] flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="w-full md:w-1/2 aspect-[4/3] bg-zinc-900 overflow-hidden rounded relative filter grayscale group-hover:grayscale-0 transition-all duration-700 shadow-lg group-hover:shadow-cyan-500/10">
                    <video src="/pantalla 2.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 mix-blend-screen group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="w-full md:w-1/2">
                  <p className="font-serif text-3xl leading-relaxed text-white/80 group-hover:text-white transition-colors">
                    Cada persona huye bajo un cristal líquido que hace percibir la libertad
                  </p>
                </div>
            </div>

            <div className="p-8 bg-black/40 border border-white/5 backdrop-blur-md rounded-lg group hover:border-white/20 transition-colors ml-[-5%] flex flex-col items-center gap-8 text-center">
                <div className="w-full aspect-[21/9] bg-zinc-900 overflow-hidden rounded relative filter grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl">
                    <img src="/colores.gif" alt="Colores abstractos" className="w-full h-full object-cover opacity-50 mix-blend-screen group-hover:opacity-100 transition-opacity duration-700" />
                    <video src="/Newton.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-color-dodge group-hover:opacity-80 transition-opacity duration-1000" />
                </div>
                <p className="font-serif text-3xl leading-relaxed text-white/80 group-hover:text-white transition-colors">
                  Newton no pudo prever que su ley de la inercia es hoy la de todos.
                </p>
            </div>

            <div className="p-8 bg-black/40 border border-white/5 backdrop-blur-md rounded-lg group hover:border-white/20 transition-colors ml-[5%] flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2 shrink-0 aspect-[9/16] max-h-[60vh] bg-zinc-900 overflow-hidden rounded relative filter grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl">
                    <video src="/notificaciones.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 mix-blend-screen group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                <div className="w-full md:w-1/2">
                  <p className="font-serif text-3xl leading-relaxed text-white/80 group-hover:text-white transition-colors">
                    Su segunda ley se manifiesta en nosotros:<br/>
                    <span className="font-mono text-xl text-cyan-400 mt-6 block p-4 border border-cyan-500/20 bg-cyan-500/5 rounded">Fuerza = Masa * Aceleración</span>
                  </p>
                </div>
            </div>

            <TextPhaseTwo scrollProgress={scrollProgress} />
            <TextPhaseThree scrollProgress={scrollProgress} />

          </div>
        </div>
      </div>

      <div className="fixed inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-0"></div>
      
      {/* Glitch Overlay for whole screen */}
      <div className="fixed inset-0 pointer-events-none mix-blend-overlay opacity-10 z-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=')]"></div>

      <svg width="0" height="0" className="absolute">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.6" 
            numOctaves="3" 
            stitchTiles="stitch" />
        </filter>
      </svg>
    </div>
  );
}
