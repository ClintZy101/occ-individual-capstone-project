import { create } from "zustand";

// Helper functions for localStorage
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return [];
  }
};

const saveToLocalStorage = (cartItems) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// Zustand store
const useCartStore = create((set, get) => ({
  cartItems: loadFromLocalStorage(), // Load initial state from localStorage

  // Add item to cart
  addToCart: (newItem) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      let updatedCart;

      if (existingItem) {
        updatedCart = state.cartItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        updatedCart = [
          ...state.cartItems,
          { ...newItem, quantity: newItem.quantity },
        ];
      }

      // Save to localStorage
      saveToLocalStorage(updatedCart);
      return { cartItems: updatedCart };
    }),

  // Remove item from cart
  removeFromCart: (itemId) =>
    set((state) => {
      const updatedCart = state.cartItems.filter((item) => item.id !== itemId);
      saveToLocalStorage(updatedCart);
      return { cartItems: updatedCart };
    }),

  // Action to increment quantity of a specific product
  incrementQuantity: (itemId) =>
    set((state) => {
      let updatedCart = state.cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveToLocalStorage(updatedCart);
      return { cartItems: updatedCart };
    }),

  // Action to decrement quantity of a specific product, with a minimum of 1
  decrementQuantity: (itemId) =>
    set((state) => {
      let updatedCart = state.cartItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      saveToLocalStorage(updatedCart);
      return {
        cartItems: updatedCart,
      };
    }),

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

  // Clear cart
  clearCart: () => {
    saveToLocalStorage([]);
    set({ cartItems: [] });
  },

  // Get total price
  getTotalPrice: () =>
    get().cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
}));

export default useCartStore;
