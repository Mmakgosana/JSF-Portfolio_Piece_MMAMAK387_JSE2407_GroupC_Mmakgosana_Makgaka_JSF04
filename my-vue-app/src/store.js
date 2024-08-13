// src/store/cart.js
import { reactive } from 'vue';

const state = reactive({
  items: [],
});

export const useCart = () => {
  const addToCart = (product) => {
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      state.items.push({ ...product, quantity: 1 });
    }
    saveCartToLocalStorage();
  };

  const removeFromCart = (productId) => {
    const index = state.items.findIndex(item => item.id === productId);
    if (index !== -1) {
      state.items.splice(index, 1);
      saveCartToLocalStorage();
    }
  };

  const clearCart = () => {
    state.items = [];
    saveCartToLocalStorage();
  };

  const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  };

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      state.items = JSON.parse(savedCart);
    }
  };

  return {
    items: state.items,
    addToCart,
    removeFromCart,
    clearCart,
    loadCartFromLocalStorage,
  };
};