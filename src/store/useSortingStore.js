// store/sortingStore.js
import { create } from "zustand";

export const useSortingStore = create((set) => ({
  sortOption: null,
  setSortOption: (option) => set({ sortOption: option }),
}));
