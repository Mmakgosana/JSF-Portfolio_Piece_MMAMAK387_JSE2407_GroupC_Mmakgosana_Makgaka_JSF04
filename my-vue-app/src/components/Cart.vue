<template>
  <div class="cart-container">
    <h1 class="cart-title">Your Shopping Cart</h1>
    <div v-if="cartStore.cartItems.length > 0">
      <ul class="cart-list">
        <li v-for="item in cartStore.cartItems" :key="item.id" class="cart-item">
          <div class="item-details">
            <img :src="item.image" alt="Product Image" class="item-image" />
            <div class="item-info">
              <span class="item-name">{{ item.title }}</span>
              <span class="item-price">${{ item.price }}</span>
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
/* Container for the cart */
.cart-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Title styling */
.cart-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* List of cart items */
.cart-list {
  list-style-type: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
}

/* Item details section */
.item-details {
  display: flex;
  align-items: center;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-right: 1rem;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: 1.125rem;
  font-weight: bold;
}

.item-price {
  color: #666;
}

/* Actions and total section */
.item-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 200px;
}

.quantity-input {
  width: 60px;
  padding: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
}

.remove-btn {
  background-color: #e53e3e;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
}

.remove-btn:hover {
  background-color: #c53030;
}

.item-total {
  font-weight: bold;
  min-width: 100px;
  text-align: right;
}

/* Summary section */
.cart-summary {
  margin-top: 1.5rem;
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}

.clear-cart-btn {
  background-color: #4a5568;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  display: block;
  width: 100%;
}

.clear-cart-btn:hover {
  background-color: #2d3748;
}

/* Empty cart section */
.empty-cart {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.125rem;
  color: #666;
}
</style>
