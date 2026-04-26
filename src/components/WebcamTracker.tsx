import React, { useEffect, useRef } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { useStore } from '../store';

export const WebcamTracker: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const setWebcamReady = useStore((state) => state.setWebcamReady);
  const setHandPosition = useStore((state) => state.setHandPosition);
  const useWebcam = useStore((state) => state.useWebcam);

  // We need to keep references for the animation loop
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const videoTimeRef = useRef<number>(-1);
  const isRunningRef = useRef<boolean>(false);

  useEffect(() => {
    if (!useWebcam) return;

    let animationFrameId: number;

    const setupMediapipe = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1 // Single hand tracking for simplicity
        });

        // Setup webcam
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.addEventListener('loadeddata', () => {
              setWebcamReady(true);
              isRunningRef.current = true;
              predictWebcam();
            });
          }
        }
      } catch (error) {
        console.error("Error setting up MediaPipe:", error);
      }
    };

    const predictWebcam = () => {
      if (!isRunningRef.current || !videoRef.current || !handLandmarkerRef.current) return;

      const video = videoRef.current;
      let startTimeMs = performance.now();
      
      if (videoTimeRef.current !== video.currentTime) {
        videoTimeRef.current = video.currentTime;
        
        const results = handLandmarkerRef.current.detectForVideo(video, startTimeMs);
        
        if (results.landmarks && results.landmarks.length > 0) {
          // Index finger tip is landmark 8
          const indexFinger = results.landmarks[0][8];
          setHandPosition({ x: indexFinger.x, y: indexFinger.y });
        } else {
          setHandPosition(null);
        }
      }
      
      animationFrameId = requestAnimationFrame(predictWebcam);
    };

    setupMediapipe();

    return () => {
      isRunningRef.current = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (videoRef.current && videoRef.current.srcObject) {
         const stream = videoRef.current.srcObject as MediaStream;
         stream.getTracks().forEach(track => track.stop());
      }
      setWebcamReady(false);
      setHandPosition(null);
    };
  }, [useWebcam, setWebcamReady, setHandPosition]);

  if (!useWebcam) return null;

  return (
    <div className="absolute bottom-16 right-16 w-64 h-48 border border-white/20 bg-zinc-900/80 backdrop-blur-md shadow-2xl overflow-hidden group transform rotate-2 z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#333_0%,_#111_100%)] opacity-50 z-0"></div>
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="w-full h-full object-cover -scale-x-100 opacity-50 contrast-150 saturate-0 relative z-10" 
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="w-4 h-4 rounded-full border border-cyan-400/50 animate-pulse"></div>
      </div>
      <div className="absolute top-3 left-3 flex items-center space-x-2 z-20">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0"></div>
        <span className="text-[9px] uppercase tracking-widest text-white/70 overflow-hidden whitespace-nowrap">MediaPipe: Active</span>
      </div>
      <div className="absolute bottom-3 right-3 text-[8px] text-white/30 uppercase z-20">
        Ocular Input // 60fps
      </div>
      <div className="absolute inset-0 border-[0.5px] border-white/10 pointer-events-none z-20"></div>
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=')] z-30"></div>
    </div>
  );
};
