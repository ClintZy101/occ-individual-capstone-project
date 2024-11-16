import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartItems: [], // Initial cart state

  // Action to add a new item to the cart
  addToCart: (newItem) =>
    set((state) => {
      // Check if the item already exists in the cart
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        // If it exists, increase the quantity
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity}
              : item
          ),
        };
      } else {
        // If it doesn't exist, add as a new item with whatever the quantity in single product
        return {
          cartItems: [...state.cartItems, { ...newItem, quantity: newItem.quantity }],
        };
      }
    }),

  // Action to remove an item from the cart
  removeFromCart: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    })),

 // Action to increment quantity of a specific product
 incrementQuantity: (itemId) =>
  set((state) => ({
    cartItems: state.cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ),
  })),

// Action to decrement quantity of a specific product, with a minimum of 1
decrementQuantity: (itemId) =>
  set((state) => ({
    cartItems: state.cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ),
  })),
   // Helper to calculate total price of an item
   getItemTotalPrice: (id) => (state) => {
    const item = state.cartItems.find((item) => item.id === id);
    return item ? item.price * item.quantity : 0;
  },
   // Selector to calculate the total price of all items in the cart
   getTotalPrice: () =>
    get().cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
  // Action to clear all items from the cart
  clearCart: () => set({ cartItems: [] }),
  

}));

export default useCartStore;
