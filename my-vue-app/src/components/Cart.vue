<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Your Cart</h1>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else class="flex">
      <div class="w-2/3 pr-4">
        <div class="bg-blue-50 p-4 mb-4 rounded">
          <h2 class="text-lg font-semibold">Shipping fee</h2>
          <p>Buy R500 more to enjoy FREE STANDARD SHIPPING!</p>
          <a href="#" class="text-blue-600">Add ></a>
        </div>
        <ul>
          <li v-for="item in cartItems" :key="item.id" class="mb-4 flex items-start space-x-4">
            <input type="checkbox" class="mt-2">
            <img :src="item.image" alt="" class="w-24 h-24 object-cover" />
            <div class="flex-grow">
              <h2 class="text-lg font-semibold">${{ item.price }}</h2>
              <p class="text-sm">{{ item.title }}</p>
              <p class="text-xs text-gray-500">{{ item.color }} / {{ item.size }}</p>
              <p class="text-xs text-orange-500">{{ item.soldCount }} sold</p>
            </div>
            <div class="flex items-center space-x-2">
              <button @click="decreaseQuantity(item)" class="border px-2">-</button>
              <input type="text" v-model="item.quantity" class="w-10 text-center border">
              <button @click="increaseQuantity(item)" class="border px-2">+</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="w-1/3 pl-4">
        <div class="bg-white p-4 rounded shadow">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>
          <p class="text-2xl font-bold mb-4">${{ cartTotal.toFixed(2) }}</p>
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
    const { cartItems, cartTotal, updateItemQuantity } = useCart();

    const increaseQuantity = (item) => {
      updateItemQuantity(item.id, item.quantity + 1);
    };

    const decreaseQuantity = (item) => {
      if (item.quantity > 1) {
        updateItemQuantity(item.id, item.quantity - 1);
      }
    };

    return {
      cartItems,
      cartTotal,
      increaseQuantity,
      decreaseQuantity,
    };
  },
};
</script>