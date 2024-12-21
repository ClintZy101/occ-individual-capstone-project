import { create } from "zustand";

const useProduct = create((set) => ({
  product: {},
  setProduct: (newProduct) =>
    set((state) => ({
      product: {
        ...state.product, // Preserve current product data
        ...newProduct,   // Update with new product data
        quantity: newProduct.quantity ?? state.product.quantity ?? 1, // Retain or initialize quantity
      },
    })),
}));

export default useProduct;
