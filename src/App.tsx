import React, { useRef, useEffect } from 'react';
import { DadaScene } from './components/3d/DadaScene';
import { WebcamTracker } from './components/WebcamTracker';
import { UIOverlay } from './components/UIOverlay';
import { useStore } from './store';

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const setScrollProgress = useStore((state) => state.setScrollProgress);

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

      animationFrameId = requestAnimationFrame(updateScrollFromHand);
    };

    updateScrollFromHand();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full h-full relative font-sans overflow-hidden bg-black text-white flex flex-col items-center justify-center">
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
          
          <div className="w-full max-w-lg mt-[50vh] space-y-64 pb-[100vh] relative z-20 pointer-events-auto">
            
            <div className="p-8 bg-black/60 border border-white/10 backdrop-blur-md rounded-lg group hover:border-white/30 transition-colors cursor-pointer">
                <p className="font-mono text-sm leading-relaxed text-white/70 group-hover:text-white transition-colors">
                  <span className="text-cyan-500 mb-2 block">// Entrada de diario 01</span>
                  Los colores se desvanecen cuando intento atraparlos. Sigo bajando, esperando encontrar el origen, pero el aburrimiento pesa y me hunde.
                </p>
                <div className="w-24 h-[1px] bg-white/20 mt-6 group-hover:bg-cyan-500/50 transition-colors"></div>
            </div>

            <div className="p-8 bg-black/60 border border-white/10 backdrop-blur-md rounded-lg group hover:border-white/30 transition-colors ml-16 cursor-pointer">
                <div className="w-full aspect-video bg-zinc-900 mb-4 overflow-hidden rounded relative">
                   {/* Placeholder for an interactive vertical gallery / gif */}
                   <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Abstract glitch" className="w-full h-full object-cover opacity-50 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700"/>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <p className="font-mono text-sm leading-relaxed text-white/70 group-hover:text-white transition-colors">
                  El ruido estático es el único acompañante.<br/>
                  Ya no hay rojos, ni azules. Solo memoria difusa.
                </p>
            </div>

            <div className="p-8 bg-black/60 border border-white/10 backdrop-blur-md rounded-lg group hover:border-white/30 transition-colors -ml-16 cursor-pointer">
                <p className="font-mono text-sm leading-relaxed text-white/70 group-hover:text-white transition-colors">
                  <span className="text-pink-500 mb-2 block">// Sistema de comentarios encriptado...</span>
                  No entiendo la inercia de esta máquina. Me pide interactuar pero al hacerlo... todo oscurece.
                </p>
                <input type="text" placeholder="Deja una huella..." className="mt-4 w-full bg-white/5 border border-white/10 p-3 text-xs font-mono text-white placeholder-white/30 outline-none focus:border-white/50 transition-colors" />
            </div>

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
