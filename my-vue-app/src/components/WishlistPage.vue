<template>
  <div v-if="authStore.isAuthenticated">
    <h1>Your Wishlist</h1>
    <div class="mt-20 flex justify-between items-center flex-wrap mb-4">
      <select v-model="selectedCategory" class="border p-2 rounded mb-2 sm:mb-0">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <div class="flex items-center mb-2 sm:mb-0">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
          class="border p-2 rounded-l"
        />
        <button @click="searchProducts" class="bg-white text-black border border-l-0 p-2 rounded-r">
          Search
        </button>
      </div>

      <select v-model="sortOrder" class="border p-2 rounded">
        <option value="">Sort by Price</option>
        <option value="default">Default</option>
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>
    <div v-if="filteredItems.length">
      <ul>
        <li v-for="item in filteredItems" :key="item.id" class="wishlist-item">
          <div class="item-details">
            <img :src="item.image" alt="Product Image" class="item-image" />
            <div class="item-info">
              <span class="item-name">{{ item.title }}</span>
              <span class="item-price">${{ item.price.toFixed(2) }}</span>
            </div>
          </div>
          <div class="item-actions">
            <button @click="removeItem(item.id)" class="remove-btn">Remove</button>
            <button @click="addToCart(item)" class="add-to-cart-btn">Add to Cart</button>
            <button @click="viewProductDetails(item.id)" class="view-details-btn">
              View Details
            </button>
          </div>
        </li>
      </ul>
      <button @click="clearWishlist" class="clear-wishlist-btn">Clear Wishlist</button>
    </div>
    <div v-else>
      <p>Your wishlist is empty.</p>
    </div>


  </div>
  <div v-else>
    <p>Please log in to view your wishlist.</p>
  </div>
  <router-view></router-view>
</template>

<script>
import { ref, computed } from 'vue';
import { useWishlistStore } from '../WishlistStore';
import { useAuthStore } from '../auth';
import { useCart } from '../CartStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const wishlistStore = useWishlistStore();
    const authStore = useAuthStore();
    const cartStore = useCart();
    const router = useRouter();

    const searchQuery = ref('');
    const selectedCategory = ref('');
    const sortOrder = ref('');
    const categories = ref([]);

    const removeItem = (itemId) => {
      wishlistStore.removeFromWishlist(itemId);
    };
    

    const clearWishlist = () => {
      wishlistStore.clearWishlist();
    };

    const addToCart = (item) => {
      cartStore.addToCart(item);
      removeItem(item.id); // Remove the item from the wishlist
    };

    const searchProducts = () => {
      // This will trigger the computed property to recalculate
    };

    const filteredItems = computed(() => {
      let items = wishlistStore.items;

      if (selectedCategory.value) {
        items = items.filter((item) => item.category === selectedCategory.value);
      }

      if (sortOrder.value === 'asc') {
        items = items.sort((a, b) => a.price - b.price);
      } else if (sortOrder.value === 'desc') {
        items = items.sort((a, b) => b.price - a.price);
      } else if (sortOrder.value === 'default') {
        items = items.sort((a, b) => a.id - b.id);
      }

      if (searchQuery.value) {
        items = items.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      return items;
    });

    const viewProductDetails = (itemId) => {
      router.push(`/product/${itemId}`);
    };

    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      categories.value = data;
    };

    fetchCategories();

    return {
      wishlistStore,
      authStore,
      cartStore,
      removeItem,
      clearWishlist,
      addToCart,
      searchQuery,
      selectedCategory,
      sortOrder,
      categories,
      searchProducts,
      filteredItems,
      viewProductDetails,
    };
  },
};
</script>