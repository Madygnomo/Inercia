import React from 'react';

interface TextPhaseTwoProps {
  scrollProgress: number;
}

export const TextPhaseTwo: React.FC<TextPhaseTwoProps> = ({ scrollProgress }) => {
  // Helpers para efectos caóticos basados en scroll (mantener sutil el movimiento para no marear, 
  // pero lo suficientemente aleatorio para dar el toque de 'locura')
  const getRandomGlitchTransform = (seed: number, intensity: number) => {
    const x = Math.sin(scrollProgress * 100 * seed) * intensity;
    const y = Math.cos(scrollProgress * 80 * seed) * intensity;
    const rotate = Math.sin(scrollProgress * 50 * seed) * (intensity / 2);
    const scale = 1 + Math.sin(scrollProgress * 30 * seed) * (intensity / 50);
    return `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`;
  };

  return (
    <div className="w-full flex flex-col space-y-[30vh] mt-[30vh]">
      
      {/* 1. La Inercia del Fracaso */}
      <div className="relative min-h-[40vh] w-full flex flex-col items-start justify-center ml-[-15%] mix-blend-difference z-10 hover:ml-0 transition-all duration-1000">
        <p className="font-mono text-4xl md:text-5xl font-bold text-[#ff00ff] uppercase tracking-tighter leading-none" style={{ transform: getRandomGlitchTransform(1.2, 5) }}>
          Hoy, nuestra propia existencia es la inercia del fracaso.
        </p>
        <p className="font-mono text-xl md:text-2xl mt-8 text-[#00ffff] bg-black/50 inline-block p-4 border border-[#00ffff]/30" style={{ transform: getRandomGlitchTransform(2.1, 8) }}>
          Fracaso = Memoria * Aburrimiento
        </p>
      </div>

      {/* 2. Espectador Pasivo */}
      <div className="relative min-h-[40vh] w-full flex items-center justify-end mr-[-20%] mix-blend-screen z-10">
        <p className="font-serif italic text-4xl md:text-6xl text-right text-white/50 max-w-xl pr-8 border-r-8 border-white/20 hover:text-white hover:border-red-500 transition-colors duration-1000">
          Así han convertido al hombre en <span className="text-white line-through decoration-red-500 decoration-8">espectador pasivo</span> de su propia vida.
        </p>
      </div>

      {/* 3. Amuletos de plástico */}
      <div className="relative min-h-[50vh] w-full flex flex-col items-center justify-center text-center z-20 hover:scale-110 transition-transform duration-700">
        <p className="font-sans font-black text-5xl md:text-7xl text-yellow-500 tracking-widest uppercase hover:blur-sm transition-all duration-500"
           style={{ WebkitTextStroke: '2px red', transform: getRandomGlitchTransform(3.3, 10) }}>
          Usan amuletos de plástico
        </p>
        <span className="text-3xl text-white bg-red-600 block w-max mt-6 px-4 py-2 rotate-[-5deg] shadow-[10px_10px_0_#000]">
          hechos en China.
        </span>
      </div>

      {/* 4. Realidad lenta */}
      <div className="relative min-h-[50vh] w-full flex flex-col items-center justify-center -ml-[10%]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.8)_0%,transparent_70%)] pointer-events-none -z-10" />
        <p className="font-serif text-3xl md:text-5xl text-center text-zinc-500 max-w-4xl leading-relaxed"
           style={{ transform: `translateY(${Math.sin(scrollProgress * 150) * 30}px)` }}>
          Porque la realidad es <span className="tracking-[0.5em] text-zinc-300">lenta</span> y aburrida.<br/>
          <span className="text-lg font-mono mt-12 block text-zinc-700 uppercase tracking-widest">Y no tiene música de fondo.</span>
        </p>
      </div>

      {/* 5. Parálisis Absoluta */}
      <div className="relative min-h-[40vh] w-[100vw] left-1/2 -translate-x-1/2 flex items-center overflow-hidden z-10 bg-white/5 backdrop-blur-sm -rotate-3 overflow-visible">
        <div className="absolute inset-0 -z-10 mix-blend-screen opacity-40 overflow-hidden">
          <video src="/Cabeza llena de _letras_.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover grayscale blur-[2px]" />
        </div>
        <div 
          className="font-black text-6xl md:text-8xl text-white/10 uppercase whitespace-nowrap absolute"
          style={{ transform: `translateX(${-100 + (scrollProgress * 1000)}px)` }} // moving left to right
        >
          El movimiento frenético del scroll produce una parálisis absoluta del alma. El movimiento frenético del scroll produce una parálisis absoluta del alma.
        </div>
        <div 
          className="font-black text-6xl md:text-8xl text-red-500/40 uppercase whitespace-nowrap absolute mix-blend-color-dodge"
          style={{ transform: `translateX(${100 - (scrollProgress * 1200)}px)` }} // moving right to left
        >
          Parálisis absoluta del alma. El movimiento frenético del scroll. Parálisis absoluta del alma.
        </div>
      </div>

      {/* 6. Seguimos bajando */}
      <div className="relative min-h-[40vh] w-full flex flex-col items-center gap-16 ml-[15%]">
        <p className="font-mono text-2xl text-green-400 bg-black p-6 border-l-8 border-green-400 shadow-[0_0_30px_rgba(0,255,0,0.2)]"
           style={{ transform: `rotate(${Math.sin(scrollProgress * 200) * 5}deg)` }}>
          Seguimos bajando y bajando.
        </p>
        <p className="font-serif italic text-4xl md:text-5xl text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]">
          Creyendo que la siguiente imagen será la que nos salve.
        </p>
      </div>

      {/* 7. Lo tenemos todo */}
      <div className="relative min-h-[50vh] w-full flex flex-col justify-center items-center mix-blend-plus-lighter z-10 pointer-events-auto">
        <div className="w-[100vw] h-[100vw] absolute bg-cyan-500/10 rounded-full blur-3xl -z-10" />
        <p className="font-sans font-bold text-5xl md:text-6xl text-center max-w-4xl text-white leading-tight">
          Lo tenemos todo y, aun así, buscamos las respuestas en una imagen.<br/>
          <span className="text-cyan-400 font-mono text-3xl uppercase mt-8 block p-4 border-2 border-cyan-400/50 hover:bg-cyan-400 hover:text-black transition-colors duration-300 shadow-[0_0_50px_rgba(0,255,255,0.2)] cursor-pointer">
            En un bucle eterno. hiperestimulación.
          </span>
        </p>
      </div>

      {/* 8. Y otra... Caos final */}
      <div className="relative min-h-[100vh] w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden flex items-center justify-center z-30">
        {Array.from({ length: 30 }).map((_, i) => {
           // Seed local pseudo aleatoria para cada tag
           const factorX = Math.sin(i * 12.3) * 50; 
           const factorY = Math.cos(i * 4.5) * 50;
           return (
            <p 
              key={i}
              className="absolute font-black text-5xl md:text-8xl uppercase mix-blend-screen"
              style={{
                top: `calc(50% + ${factorY}%)`,
                left: `calc(50% + ${factorX}%)`,
                color: `hsl(${(i * 50) % 360}, 100%, 60%)`,
                transform: `translate(-50%, -50%) rotate(${Math.sin(scrollProgress * 20 + i) * 360}deg) scale(${Math.sin(scrollProgress * 15 + i) * 1.5 + 1.5})`,
                filter: `blur(${Math.max(0, Math.sin(i) * 5)}px)`,
                opacity: Math.max(0.3, Math.cos(scrollProgress * 30 + i))
              }}
            >
              Y otra.
            </p>
          );
        })}
      </div>

    </div>
  );
};
