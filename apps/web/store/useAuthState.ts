import { create } from "zustand";

type AuthState = {
  role: "manager" | "worker" | null;
  setRole: (role: "manager" | "worker") => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
