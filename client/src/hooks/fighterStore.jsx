import { create } from 'zustand';

const useFighterStore = create((set) => ({
  fighter1: null,
  fighter2: null,
  fighters: [], // Initialize as an empty array
  selectFighter1: (fighter) => set({ fighter1: fighter }),
  selectFighter2: (fighter) => set({ fighter2: fighter }),
}));

export default useFighterStore;
