<template>
    <div class="max-w-2xl mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">Your Cart</h1>
      <div v-if="cartItems.length === 0">
        <p>Your cart is empty.</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="item in cartItems" :key="item.id" class="mb-4">
            <div class="flex items-center space-x-4">
              <img :src="item.image" alt="" class="w-16 h-16 object-cover" />
              <div>
                <h2 class="text-lg font-semibold">{{ item.title }}</h2>
                <p>${{ item.price }} x {{ item.quantity }}</p>
              </div>
              <p class="ml-auto text-lg">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
          </li>
        </ul>
        <div class="mt-6">
          <h2 class="text-2xl font-bold">Total: ${{ cartTotal.toFixed(2) }}</h2>
        </div>
        <button class="mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { useCart } from '../store';
  
  export default {
    name: 'Cart',
    setup() {
      const { cartItems, cartTotal } = useCart();
  
      return {
        cartItems,
        cartTotal,
      };
    },
  };
  </script>
  