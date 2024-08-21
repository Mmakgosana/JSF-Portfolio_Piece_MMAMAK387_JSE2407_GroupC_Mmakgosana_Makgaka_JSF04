// CartStore.js
import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { onMounted } from 'vue';
import { loadFromLocalStorage } from './localStorageUtils';


export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addToCart(item) {
      this.cartItems.push(item);
    },
    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    },
    clearCart() {
      this.cartItems = [];
    },
  },
  getters: {
    totalItems: (state) => state.cartItems.length,
    totalCost: (state) => state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
  },
});

export function useCart() {
  // Initialize cart with items from local storage or an empty array
  const cart = reactive({
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
  });

  // Add a product to the cart
  const addToCart = (product) => {
    const existingItem = cart.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ ...product, quantity: 1 });
    }
    saveCart();
  };

  // Update the quantity of an item in the cart
  const updateCart = (id, quantity) => {
    const item = cart.items.find(item => item.id === id);
    if (item) {
      item.quantity = quantity;
      console.log('Updated item:', item)
      saveCart();
    }
  };

  // Remove an item from the cart
  const removeFromCart = (id) => {
    const index = cart.items.findIndex(item => item.id === id);
    if (index !== -1) {
      cart.items.splice(index, 1); // Maintains reactivity
      saveCart();
    }
  };

  // Clear all items from the cart
  const clearCart = () => {
    cart.items.splice(0, cart.items.length); // Clear reactively
    localStorage.removeItem('cartItems'); // Clear from local storage
  };

  // Save the current cart state to local storage
  const saveCart = () => {
    localStorage.setItem('cartItems', JSON.stringify(cart.items));
  };

  // Computed properties for total items and total cost
  const totalItems = computed(() => cart.items.reduce((acc, item) => acc + item.quantity, 0));
  const totalCost = computed(() => cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0));
  //onMounted (() => {
    
  //})
  

  return {
    cartItems: cart.items,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalCost,
  };
}
