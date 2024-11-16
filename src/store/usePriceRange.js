import { create } from "zustand";
// import { products } from "../data/allproducts";

const usePriceRangeStore = create((set) => ({
  minValue: 0,
  maxValue: 2500,
  productsByPriceRange: [],
  priceRangeActive: false,

  setMinValue: (value) =>
    set((state) => ({ minValue: Math.min(value, state.maxValue - 100) })),

  setMaxValue: (value) =>
    set((state) => ({ maxValue: Math.max(value, state.minValue + 100) })),

  setProductsByPriceRange: (productArray) =>
    set((state) => ({
      productsByPriceRange: productArray?.filter(
        (p) => p.price >= state.minValue && p.price <= state.maxValue
      ),
    })),
  setPriceRangeActive: () =>
    set((state) => ({
      priceRangeActive: state.minValue > 0 || state.maxValue < 5000,
    })),
}));

export default usePriceRangeStore;
