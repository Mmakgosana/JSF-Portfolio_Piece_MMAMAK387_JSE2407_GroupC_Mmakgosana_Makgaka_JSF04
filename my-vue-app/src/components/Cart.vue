<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Your Cart</h1>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else class="flex flex-col lg:flex-row">
      <!-- Left Section: Cart Items -->
      <div class="w-full lg:w-2/3 lg:pr-4">
        <div class="bg-blue-50 p-4 mb-4 rounded">
          <h2 class="text-lg font-semibold">Shipping fee</h2>
          <p>Buy $500 more to enjoy FREE STANDARD SHIPPING!</p>
          <a href="#" class="text-blue-600">Add ></a>
        </div>
        <ul>
          <li v-for="item in cartItems" :key="item.id" class="mb-4 flex flex-col lg:flex-row items-start space-x-0 lg:space-x-4">
            <input type="checkbox" class="mt-2">
            <img :src="item.image" alt="" class="w-full lg:w-24 lg:h-24 object-cover mb-2 lg:mb-0" />
            <div class="flex-grow">
              <h2 class="text-lg font-semibold">${{ item.price }}</h2>
              <p class="text-sm">{{ item.title }}</p>
              <p class="text-xs text-gray-500">{{ item.color }} / {{ item.size }}</p>
              <p class="text-xs text-orange-500">{{ item.soldCount }} sold</p>
            </div>
            <div class="flex items-center space-x-2 mt-2 lg:mt-0">
              <button @click="decreaseQuantity(item)" class="border px-2">-</button>
              <input type="text" v-model="item.quantity" class="w-10 text-center border">
              <button @click="increaseQuantity(item)" class="border px-2">+</button>
            </div>
            <button @click="removeItem(item.id)" class="text-gray-500 hover:text-red-500 mt-2 lg:mt-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <!-- Right Section: Order Summary -->
      <div class="w-full lg:w-1/3 lg:pl-4 mt-4 lg:mt-0">
        <div class="bg-white p-4 rounded shadow">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>
          <p class="text-2xl font-bold mb-4">${{ cartTotal.toFixed(2) }}</p>
          <button @click="clearCart" class="w-full bg-red-500 text-white font-bold py-3 px-4 rounded mb-4">
          Clear Cart
          </button>
          <button class="w-full bg-black text-white font-bold py-3 px-4 rounded mb-4">
            Checkout Now
          </button>
          <h3 class="font-semibold mb-2">We Accept</h3>
          <div class="flex flex-wrap gap-2">
            <!-- Add payment method icons here -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart } from '../store';

export default {
  name: 'Cart',
  setup() {
    // Destructure the cartItems, cartTotal, and methods from useCart
    const { cartItems, cartTotal, updateItemQuantity, removeItemFromCart } = useCart();

    const increaseQuantity = (item) => {
      updateItemQuantity(item.id, item.quantity + 1);
    };

    const decreaseQuantity = (item) => {
      if (item.quantity > 1) {
        updateItemQuantity(item.id, item.quantity - 1);
      }
    };

    const removeItem = (itemId) => {
      removeItemFromCart(itemId);
    };

    return {
      cartItems,
      cartTotal,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
    };
  },
};
</script>
