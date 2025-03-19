import { create } from "zustand";

type AuthState = {
  role: "MANAGER" | "WORKER" | null;
  setRole: (role: "MANAGER" | "WORKER") => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
