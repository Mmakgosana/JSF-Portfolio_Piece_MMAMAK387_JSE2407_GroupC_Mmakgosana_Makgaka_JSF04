import { ref, computed } from 'vue';

const cartItems = ref([]);

export function useCart() {
  const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
  };

  const cartTotal = computed(() =>
    cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  return {
    cartItems,
    addToCart,
    cartTotal,
  };
}
