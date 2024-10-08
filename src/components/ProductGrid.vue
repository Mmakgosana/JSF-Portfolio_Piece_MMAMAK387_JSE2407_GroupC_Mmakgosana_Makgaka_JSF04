<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="product in products" :key="product.id" class="card-container bg-white shadow-md rounded-lg overflow-hidden border p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <router-link :to="`/product/${product.id}`" class="flex justify-center items-center">
        <img :src="product.image" :alt="product.title" class="w-400px h-48 object-cover mb-5 rounded" />
      </router-link>
      <div class="card-content p-4 flex flex-col flex-grow">
        <h3 class="text-lg font-bold mb-2">{{ product.title }}</h3>
        <p class="text-gray-700 mb-2">${{ product.price }}</p>
        <p class="text-gray-500">{{ product.category }}</p>
        <div class="text-gray-700 mb-4">
          <StarRating :rate="product.rating.rate" />
          ({{ product.rating.count }} reviews)
        </div>
        <div class="mt-auto flex justify-evenly items-center">
          <div>
            <!-- Toggle favorite button -->
            <button @click="toggleFavorite(product)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="{'text-gray-300': !isFavorite(product.id), 'text-red-500': isFavorite(product.id)}" class="w-6 h-6" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
          <button @click="handleAddToCart(product)" class="bg-purple-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition duration-200">
            Add To Cart +
          </button>
          <button @click="addToComparison(product)" :disabled="isInComparison(product.id)">
            {{ isInComparison(product.id) ? 'In Comparison' : 'Add to Compare' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import StarRating from './Ratings.vue';
import { useCart } from '../CartStore';
import { useComparisonStore } from '../ComparisonStore';
import { useAuthStore } from '../auth';
import { useWishlistStore } from '../WishlistStore';

export default {
  name: 'ProductGrid',
  components: {
    StarRating,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const cartStore = useCart();
    const comparisonStore = useComparisonStore();
    const authStore = useAuthStore();
    const wishlistStore = useWishlistStore();

    const handleAddToCart = (product) => {
      if (authStore.isAuthenticated) {
        cartStore.addToCart(product);
        alert(`Added ${product.title} to the cart!`);
      } else {
        alert('Please log in to add items to your cart.');
      }
    };

    const addToComparison = (product) => {
      if (authStore.isAuthenticated) {
        if (comparisonStore.items.length >= 4) {
          alert('You can only compare up to 4 items.');
          return;
        }
        comparisonStore.addToComparison(product);
        alert(`${product.title} has been added to the comparison list.`);
      } else {
        alert('Please log in to add items to your comparison list.');
      }
    };

    const isInComparison = (productId) => 
      comparisonStore.items.some(item => item.id === productId);

    const toggleFavorite = (product) => {
      if (wishlistStore.items.some(item => item.id === product.id)) {
        wishlistStore.removeFromWishlist(product.id);
        alert(`${product.title} has been removed from your wishlist.`);
      } else {
        wishlistStore.addToWishlist(product);
        alert(`${product.title} has been added to your wishlist.`);
      }
    };

    const isFavorite = (productId) => {
      return wishlistStore.items.some(item => item.id === productId);
    };

    return {
      toggleFavorite,
      isFavorite,
      handleAddToCart,
      addToComparison,
      isInComparison,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
