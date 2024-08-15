import { ref } from 'vue';

const cartItems = ref([]);
const cartTotal = ref(0);

export function useCart() {
  const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
    updateCartTotal();
  };

  const updateCartTotal = () => {
    cartTotal.value = cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return {
    cartItems,
    cartTotal,
    addToCart,
  };
}
