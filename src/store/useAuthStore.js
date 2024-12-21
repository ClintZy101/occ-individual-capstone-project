import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, 
      token: null,
      tokenExpiry: null,
      isLoading: true,
      setUser: (userData) => set({ user: userData }),
      setToken: (data) => set({ token: data }),
      setTokenExpiry: (data) => set({ tokenExpiry: data }),
      signOut: () => set({ user: null, token: null, tokenExpiry: null }),
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "auth-storage", // Key in localStorage
      getStorage: () => localStorage, // Use localStorage
    }
  )
);
