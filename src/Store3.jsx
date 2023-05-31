import { create } from 'zustand'

export const useZagr = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  
}))