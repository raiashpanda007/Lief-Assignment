// app/store/locationStore.ts (or any folder you prefer)
"use client"; // Must be a client module

import { create } from "zustand";

interface Location {
  lat: number;
  lng: number;
}

interface LocationStore {
  location: Location | null;
  setLocation: (location: Location) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  setLocation: (location) => set({ location }),
}));

export default useLocationStore;
