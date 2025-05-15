import { create } from "zustand";

export const useUIStore = create((set) => ({
  sideMenuCollapsed: false,
  setSideMenuCollapsed: (collapsed) => set({ sideMenuCollapsed: collapsed }),
  toggleSideMenuCollapsed: () => set((state) => ({ sideMenuCollapsed: !state.sideMenuCollapsed }))
}));