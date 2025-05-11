import { create } from "zustand";

export const useAuthStore = create((set) => ({
  role: "",
  routes: [],
  setRole: (role) => set({ role }),
  setRoutes: (routes) => set({ routes })
}));