import { create } from "zustand";

const useAllProducts = create((set) => ({
  allProducts: [],
  isLoading: false,
  setAllProducts: (data) => set({ allProducts: data }),
  setIsLoading: (isLoading) => setTimeout(()=>{ set({ isLoading })}, 1000),
}));

export default useAllProducts;
