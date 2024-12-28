import { create } from "zustand";

const useSeller= create((set) => ({
  seller: null,
    setSeller: (newSeller) =>
        set((state) => ({
        seller: newSeller,
        })),
}));

export default useSeller;
