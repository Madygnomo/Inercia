import { create } from 'zustand';

interface AppState {
  hasStarted: boolean;
  setHasStarted: (started: boolean) => void;
  useWebcam: boolean;
  setUseWebcam: (use: boolean) => void;
  isWebcamReady: boolean;
  setWebcamReady: (ready: boolean) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  handPosition: { x: number; y: number } | null;
  setHandPosition: (pos: { x: number; y: number } | null) => void;
}

export const useStore = create<AppState>((set) => ({
  hasStarted: false,
  setHasStarted: (started) => set({ hasStarted: started }),
  useWebcam: false,
  setUseWebcam: (use) => set({ useWebcam: use }),
  isWebcamReady: false,
  setWebcamReady: (ready) => set({ isWebcamReady: ready }),
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  handPosition: null,
  setHandPosition: (pos) => set({ handPosition: pos }),
}));

