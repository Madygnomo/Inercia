import React from 'react';
import { useStore } from '../store';

export const StartScreen: React.FC = () => {
  const setHasStarted = useStore((state) => state.setHasStarted);
  const useWebcam = useStore((state) => state.useWebcam);
  const setUseWebcam = useStore((state) => state.setUseWebcam);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white p-8">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/20 via-black to-black opacity-50 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-xl">
        <h1 className="text-6xl font-thin tracking-[0.3em] uppercase mb-12 opacity-90 blur-[0.5px]">
          Inercia
        </h1>
        
        <p className="max-w-md text-center text-white/60 mb-12 font-serif italic text-lg leading-relaxed">
          "La memoria es un acto de desaparición constante. El scroll no es avance, es dilución."
        </p>
        
        {/* Toggle Switch */}
        <div className="flex flex-col items-center mb-16 space-y-6">
          <p className="text-[10px] uppercase font-mono tracking-widest text-white/40">Modo de Navegación</p>
          <div className="flex items-center gap-6">
            <span className={`text-xs font-mono uppercase tracking-wider transition-colors ${!useWebcam ? 'text-white' : 'text-white/30'}`}>
              Touch / Mouse
            </span>
            
            <button 
              onClick={() => setUseWebcam(!useWebcam)}
              className="w-16 h-8 rounded-full border border-white/20 relative flex items-center px-1 cursor-pointer hover:border-white/50 transition-colors"
            >
              <div 
                className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                  useWebcam ? 'translate-x-8 shadow-[0_0_10px_rgba(0,255,255,0.8)]' : 'translate-x-0 opacity-50'
                }`}
              />
            </button>
            
            <span className={`text-xs font-mono uppercase tracking-wider transition-colors ${useWebcam ? 'text-cyan-400' : 'text-white/30'}`}>
              MediaPipe (Cámara)
            </span>
          </div>
          <p className="text-[10px] text-white/30 max-w-xs text-center font-mono">
            {useWebcam 
              ? "Requiere acceso a tu cámara para detectar el movimiento de tu mano en el espacio." 
              : "Navega con el scroll del mouse o deslizando en pantallas táctiles."}
          </p>
        </div>

        <button 
          onClick={() => setHasStarted(true)}
          className="px-12 py-4 border border-white/20 hover:bg-white hover:text-black transition-all uppercase tracking-[0.2em] text-sm font-mono cursor-pointer"
        >
          Entrar al Vacío
        </button>
      </div>
    </div>
  );
};

