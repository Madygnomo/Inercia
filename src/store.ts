import { create } from 'zustand';

interface AppState {
  isWebcamReady: boolean;
  setWebcamReady: (ready: boolean) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  handPosition: { x: number; y: number } | null;
  setHandPosition: (pos: { x: number; y: number } | null) => void;
}

export const useStore = create<AppState>((set) => ({
  isWebcamReady: false,
  setWebcamReady: (ready) => set({ isWebcamReady: ready }),
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  handPosition: null,
  setHandPosition: (pos) => set({ handPosition: pos }),
}));

