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
    const index = cart.items.findIndex(item => item.id === id);
    if (index !== -1) {
      cart.items.splice(index, 1); // This maintains reactivity
      saveCart(); // Save the updated cart to local storage
    }
  };
  const clearCart = () => {
    cart.items.splice(0, cart.items.length); // Clear the array reactively
    localStorage.removeItem('cartItems'); // Clear the cart in local storage
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
