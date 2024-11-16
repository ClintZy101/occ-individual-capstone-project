import { create } from "zustand";

const useProduct = create((set)=>({
    product: {},
    setProduct: (newProduct) => set({ product: {...newProduct, quantity:1}}),
}))

export default useProduct