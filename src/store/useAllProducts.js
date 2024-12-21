import { create } from "zustand";

const useAllProducts = create((set) => ({
  allProducts: [],
  setAllProducts: (data) => set({ allProducts: data }),
}));

export default useAllProducts;
