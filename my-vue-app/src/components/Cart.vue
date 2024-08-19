<template>
  <div class="cart-container">
    <h1>Your Shopping Cart</h1>
    <div v-if="cartStore.cartItems.length > 0">
      <ul>
        <li v-for="item in cartStore.cartItems" :key="item.id" class="cart-item">
          <div class="item-details">
            <img :src="item.image" alt="Product Image" class="item-image" />
            <div class="item-info">
              <span class="item-name">{{ item.title }}</span>
              <span class="item-price">${{ item.price.toFixed(2) }}</span>
            </div>
          </div>
          <div class="item-actions">
            <input
              type="number"
              v-model.number="item.quantity"
              @change="cartStore.updateCart(item.id, item.quantity)"
              min="1"
              class="quantity-input"
            />
            <button @click="cartStore.removeFromCart(item.id)" class="remove-btn">Remove</button>
          </div>
          <div class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</div>
        </li>
      </ul>
      <div class="cart-summary">
        <p><strong>Total Items:</strong> {{ cartStore.totalItems }}</p>
        <p><strong>Total Cost:</strong> ${{ totalCostFormatted }}</p>
        <button @click="handleClearCart" class="clear-cart-btn">Clear Cart</button>
      </div>
    </div>
    <div v-else class="empty-cart">
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useCart } from '../CartStore';

export default defineComponent({
  name: 'Cart',
  setup() {
    const cartStore = useCart();

    // Use a computed property to format the total cost
    const totalCostFormatted = computed(() => cartStore.totalCost);

    // Function to handle clearing the cart
    const handleClearCart = () => {
      cartStore.clearCart(); // Clears the cart in the store and local storage
    };

    return {
      cartStore,
      totalCostFormatted,
      handleClearCart,
    };
  },
});
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
