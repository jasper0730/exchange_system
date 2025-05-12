import { create } from "zustand";

export const useUIStore = create((set) => ({
  isLoading: true,
  setLoading: (value) => set({ isLoading: value }),
}));