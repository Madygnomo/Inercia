import React from 'react';

interface TextPhaseThreeProps {
  scrollProgress: number;
}

export const TextPhaseThree: React.FC<TextPhaseThreeProps> = ({ scrollProgress }) => {

  const getFlicker = (seed: number) => {
    return Math.sin(scrollProgress * 300 * seed) > 0.5 ? '0 0 30px rgba(255,255,255,0.8)' : 'none';
  };

  return (
    <div className="w-full flex flex-col space-y-[35vh] mt-[35vh] pb-[50vh]">
        {/* Y otra. En un bucle eterno. */}
        <div className="relative min-h-[30vh] w-full flex flex-col items-center justify-center text-center mix-blend-difference z-10">
            <p className="font-mono text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter shadow-xl">
               Y otra. <br/> <span className="text-cyan-500 ml-8 block mt-4" style={{ transform: `rotate(${Math.sin(scrollProgress * 50) * 5}deg)` }}>En un bucle eterno.</span>
            </p>
        </div>

        {/* Ya no reclamamos derechos. Reclamamos conexión. */}
        <div className="relative min-h-[40vh] w-full flex flex-col items-center mx-auto mix-blend-screen z-10 text-center md:text-left md:-ml-[10%]">
            <p className="font-serif italic text-3xl md:text-5xl text-zinc-400 max-w-2xl">
              Ya no reclamamos <span className="line-through decoration-white/50 decoration-4">derechos</span>.<br/>
              <span className="text-white font-black not-italic text-5xl md:text-7xl uppercase drop-shadow-[0_0_20px_rgba(255,0,0,0.8)] text-red-500 block mt-6"
                    style={{ transform: `translateX(${Math.sin(scrollProgress * 80) * 10}px)` }}>
                Reclamamos conexión.
              </span>
            </p>
        </div>

        {/* No estamos consumiendo contenido. */}
        <div className="relative min-h-[20vh] w-full flex items-center justify-center">
            <p className="font-mono text-lg md:text-xl text-zinc-500 uppercase tracking-[0.5em] text-center border-y border-zinc-800 py-8 w-full">
              No estamos consumiendo contenido.
            </p>
        </div>

        {/* El contenido nos está consumiendo a nosotros. */}
        <div className="relative min-h-[60vh] w-full flex items-center justify-center overflow-visible">
            <div className="absolute inset-0 bg-red-900/10 blur-3xl -z-10 rounded-full" style={{ transform: `scale(${1 + Math.sin(scrollProgress * 20)})` }} />
            <div className="absolute inset-0 -z-20 mix-blend-screen opacity-40 flex items-center justify-center overflow-hidden">
              <video src="/neuro.mp4" autoPlay loop muted playsInline className="w-full h-full md:w-[60%] object-cover contrast-150 saturate-200" style={{ transform: `rotate(${Math.sin(scrollProgress * 15) * 10}deg)` }} />
            </div>
             <p 
                className="font-black text-6xl md:text-[7rem] text-red-600 leading-none text-center uppercase mix-blend-color-dodge transition-transform duration-700 px-4 w-[120%]"
                style={{ transform: `scale(${0.8 + Math.sin(scrollProgress * Math.PI) * 0.4})` }}
              >
               El contenido <br/> nos está <br/> consumiendo <br/> a nosotros.
             </p>
        </div>

        {/* Nos volvemos una máquina de casino. */}
        <div className="relative min-h-[60vh] w-full flex flex-col items-center justify-center gap-12 mt-[10vh]">
            <div className="absolute inset-0 -z-30 overflow-hidden opacity-30 mix-blend-lighten flex">
                <video src="/Casino vide.mp4" autoPlay loop muted playsInline className="w-1/2 h-full object-cover" />
                <video src="/casino 1.mp4" autoPlay loop muted playsInline className="w-1/2 h-full object-cover scale-x-[-1]" />
            </div>

            <div className="flex gap-4 md:gap-8 bg-zinc-900/80 p-8 rounded-3xl border border-yellow-500/40 backdrop-blur-xl shadow-[0_0_50px_rgba(255,215,0,0.2)]">
              {/* Slot machine effect */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-28 md:w-32 md:h-48 bg-black border-4 border-yellow-500/50 rounded-xl flex items-center justify-center overflow-hidden relative shadow-[inset_0_0_20px_rgba(255,215,0,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-20 pointer-events-none" />
                    <div className="absolute inset-0 flex flex-col items-center" style={{ transform: `translateY(${(Math.sin(scrollProgress * 200 + i * 10) * 150)}%)` }}>
                         <img src="/Casino.png" alt="Casino Slot" className="h-[200%] w-auto object-cover opacity-90 blur-[1px]" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,0,0.8))' }} />
                    </div>
                </div>
              ))}
            </div>
            <p className="font-sans font-black text-2xl md:text-5xl text-yellow-500/90 uppercase tracking-widest text-center shadow-black drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
              Nos volvemos una<br/><span className="text-white text-4xl md:text-7xl mt-4 block">máquina de casino.</span>
            </p>
        </div>

        {/* Aunque sea solo por una inercia que no pertenece ni permanece. */}
        <div className="relative min-h-[40vh] w-full flex items-center justify-end md:mr-[10%]">
            <p className="font-serif italic text-2xl md:text-4xl text-zinc-500 max-w-xl text-right px-8"
               style={{ filter: `blur(${Math.max(0, Math.sin(scrollProgress * 100) * 8)}px)` }}>
              Aunque sea solo por una inercia que no pertenece ni permanece.
            </p>
        </div>

        {/* Y al final del recorrido, quedamos en negro. */}
        <div className="relative min-h-[50vh] w-full flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/90 blur-xl -z-10 transition-opacity duration-1000" />
            <p className="font-mono text-xl md:text-3xl text-zinc-700 uppercase tracking-widest text-center leading-loose">
              Y al final del recorrido,<br/>
              <span className="text-black bg-zinc-800 p-4 inline-block mt-8 border border-black shadow-[inset_0_0_20px_rgba(0,0,0,1)]">quedamos en negro.</span>
            </p>
        </div>

        {/* Queriendo pertenecer, quedamos envueltos en la soledad. */}
        <div className="relative min-h-[60vh] w-full flex flex-col items-center justify-center md:-ml-[5%] px-4">
            <p className="font-serif text-2xl md:text-4xl text-zinc-500/40 max-w-2xl text-center leading-loose">
              <span className="text-white/20 block mb-12">Queriendo pertenecer,</span>
              quedamos envueltos en la <span className="text-transparent text-stroke-white text-stroke-1 opacity-50 blur-[2px] hover:blur-none hover:text-white transition-all duration-1000 text-5xl md:text-6xl uppercase font-black block mt-8">soledad.</span>
            </p>
        </div>

        {/* ==================================================== */}
        {/* FINAL PHASE 80% - 100% */}
        {/* ==================================================== */}
        
        {/* Fingiendo que conquistábamos el universo. */}
        <div className="relative min-h-[60vh] w-full flex items-center justify-center mt-[20vh] px-4">
            <p className="font-sans font-black text-3xl md:text-6xl text-white/10 uppercase tracking-[0.2em] text-center leading-tight transition-all duration-300"
               style={{ textShadow: getFlicker(1.5) }}>
               Fingiendo que conquistábamos el universo.
            </p>
        </div>

        {/* Cuando solo estábamos cavando nuestra propia fosa. */}
        <div className="relative min-h-[70vh] w-full flex flex-col items-center justify-center mt-[10vh] px-4">
            <div className="w-[1px] h-48 bg-gradient-to-b from-white/20 to-transparent mb-16" />
            <p className="font-serif italic text-2xl md:text-4xl text-white/30 text-center max-w-xl drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
              Cuando solo estábamos cavando nuestra propia fosa.
            </p>
            <div className="w-[1px] h-48 bg-gradient-to-t from-black to-white/20 mt-16" />
        </div>

        {/* En el cementerio de lo virtual. */}
        <div className="relative min-h-[100vh] w-full flex items-center justify-center pb-[30vh] px-4">
            <p className="font-mono text-xs md:text-sm text-white/5 uppercase tracking-[1em] md:tracking-[2em] text-center hover:text-white/40 transition-colors duration-[2000ms] cursor-crosshair ml-[1em]">
               En el cementerio de lo virtual.
            </p>
        </div>
        
    </div>
  );
};
