import React from 'react';
import { useStore } from '../store';

export const UIOverlay: React.FC = () => {
  const { handPosition, scrollProgress } = useStore();

  return (
    <div className="relative w-full min-h-screen z-40 pointer-events-none">
      {/* Hand Cursor Tracking Map */}
      {handPosition && (
        <div 
          className="fixed w-8 h-8 -ml-4 -mt-4 border border-white rounded-full transition-all duration-75 mix-blend-difference"
          style={{
            // Convert normalized coordinates back to screen space. Hand X is mirrored
            left: `${(1 - handPosition.x) * 100}vw`,
            top: `${handPosition.y * 100}vh`,
          }}
        >
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      )}

      <div className="relative z-10 text-center select-none flex flex-col items-center justify-center w-full min-h-screen pointer-events-none text-white">
        
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-pink-500/10 to-transparent blur-[80px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 -z-10"></div>
        
        <div className="w-96 h-96 relative border border-white/5 flex flex-col items-center justify-center mt-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-20"></div>
          <div className="text-center px-12 z-10">
            <p className="text-sm italic font-serif text-white/60 leading-relaxed mb-4">
              Levanta tu mano hacia el borde superior de la cámara para scrollear hacia arriba.<br/>
              Baja tu mano al borde inferior para scrollear hacia abajo.
            </p>
            <div className="flex justify-center space-x-2 mb-8">
              <div className="w-1 h-1 rounded-full bg-white/40"></div>
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
              <div className="w-1 h-1 rounded-full bg-white/10"></div>
            </div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
              Profundidad: {(scrollProgress * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      <div className="fixed left-1/2 -translate-x-1/2 bottom-12 flex flex-col items-center opacity-40 pointer-events-none text-white">
        <span className="text-[9px] uppercase tracking-[0.3em] mb-4">Doomscroll Loop</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

