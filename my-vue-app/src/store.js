// src/store/cart.js
import { ref, computed } from 'vue';
import { getUserId } from './auth';

const cart = ref({});

export function useCart() {
  const addToCart = (product) => {
    const userId = getUserId();
    if (!userId) return;

    if (!cart.value[userId]) {
      cart.value[userId] = [];
    }
    
    const existingItem = cart.value[userId].find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value[userId].push({ ...product, quantity: 1 });
    }
  };

  const removeFromCart = (productId) => {
    const userId = getUserId();
    if (!userId || !cart.value[userId]) return;

    cart.value[userId] = cart.value[userId].filter(item => item.id !== productId);
  };

  const cartItems = computed(() => {
    const userId = getUserId();
    return userId ? cart.value[userId] || [] : [];
  });

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
  });

  return {
    addToCart,
    removeFromCart,
    cartItems,
    cartTotal,
  };
}