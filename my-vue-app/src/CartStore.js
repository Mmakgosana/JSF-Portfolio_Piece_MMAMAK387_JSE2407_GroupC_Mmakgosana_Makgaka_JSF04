// CartStore.js
import { ref, reactive, computed } from 'vue';

export function useCart() {
  const cart = reactive({
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
  });

  const addToCart = (product) => {
    const existingItem = cart.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ ...product, quantity: 1 });
    }
    saveCart();
  };

  const updateCart = (id, quantity) => {
    const item = cart.items.find(item => item.id === id);
    if (item) {
      item.quantity = quantity;
      saveCart();
    }
  };

  const removeFromCart = (id) => {
    cart.items = cart.items.filter(item => item.id !== id);
    saveCart();
  };

  const clearCart = () => {
    cart.items = [];
    localStorage.removeItem('cartItems'); // Clear the local storage as well
  };

  const saveCart = () => {
    localStorage.setItem('cartItems', JSON.stringify(cart.items));
  };

  const totalItems = computed(() => cart.items.reduce((acc, item) => acc + item.quantity, 0));
  const totalCost = computed(() => cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0));

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
