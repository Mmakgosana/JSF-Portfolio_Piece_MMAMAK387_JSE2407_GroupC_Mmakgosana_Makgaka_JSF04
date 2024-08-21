<template>
  <div v-if="authStore.isAuthenticated">
    <h1 class="text-3xl font-bold mb-6">Your Wishlist</h1>
    <div class="mt-8 flex flex-col sm:flex-row justify-between items-center flex-wrap mb-4">
      <select v-model="selectedCategory" class="border p-2 rounded mb-2 sm:mb-0 w-full sm:w-auto">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <div class="flex items-center mb-2 sm:mb-0 w-full sm:w-auto">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
          class="border p-2 rounded-l flex-grow"
        />
        <button @click="searchProducts" class="bg-blue-500 text-white border border-l-0 p-2 rounded-r hover:bg-blue-600">
          Search
        </button>
      </div>

      <select v-model="sortOrder" class="border p-2 rounded w-full sm:w-auto mt-2 sm:mt-0">
        <option value="">Sort by Price</option>
        <option value="default">Default</option>
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>

    <div v-if="filteredItems.length">
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li v-for="item in filteredItems" :key="item.id" class="bg-white p-4 rounded shadow-md flex flex-col">
          <div class="item-details flex-grow">
            <img :src="item.image" alt="Product Image" class="item-image w-full h-48 object-cover mb-4" />
            <div class="item-info">
              <span class="item-name text-lg font-semibold block mb-2">{{ item.title }}</span>
              <span class="item-price text-gray-600">${{ item.price.toFixed(2) }}</span>
            </div>
          </div>
          <div class="item-actions flex justify-between mt-4">
            <button @click="removeItem(item.id)" class="remove-btn bg-red-500 text-white hover:bg-red-600">
              Remove
            </button>
            <button @click="addToCart(item)" class="add-to-cart-btn bg-green-500 text-white hover:bg-green-600">
              Add to Cart
            </button>
            <button @click="viewProductDetails(item.id)" class="view-details-btn bg-blue-500 text-white hover:bg-blue-600">
              View Details
            </button>
          </div>
        </li>
      </ul>
      <button @click="clearWishlist" class="clear-wishlist-btn bg-gray-500 text-white hover:bg-gray-600 mt-4 px-4 py-2 rounded">
        Clear Wishlist
      </button>
    </div>
    <div v-else>
      <p class="text-gray-600">Your wishlist is empty.</p>
    </div>
  </div>
  <div v-else>
    <p class="text-gray-600">Please log in to view your wishlist.</p>
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

<style scoped>
/* Container Styling */
.wishlist-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Heading */
h1 {
  font-size: 2rem;
  color: #2d3748; /* Dark gray */
}

/* Filters and Search Bar */
select, input[type="text"] {
  border: 1px solid #e2e8f0; /* Light gray */
  padding: 0.5rem;
  border-radius: 0.375rem; /* 6px */
  transition: border-color 0.3s ease;
}

select:focus, input[type="text"]:focus {
  border-color: #3182ce; /* Blue color */
  outline: none;
}

/* Item List */
.item-image {
  width: 100%; /* Adjust width as needed */
  height: auto; /* Maintain aspect ratio */
  max-height: 200px; /* Set a max height for consistency */
  object-fit: contain; /* Show the entire image */
  border-radius: 0.375rem; /* Rounded corners for the image */
}

.item-details {
  padding: 1rem;
  flex-grow: 1;
}

.item-name {
  color: #2d3748; /* Dark gray */
}

.item-price {
  color: #4a5568; /* Gray */
}

.bg-white {
  background-color: #ffffff; /* Ensure white background for items */
}

/* Buttons */
.remove-btn, .add-to-cart-btn, .view-details-btn, .clear-wishlist-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.remove-btn {
  background-color: #e53e3e; /* Red color */
}

.remove-btn:hover {
  background-color: #c53030; /* Darker red */
}

.add-to-cart-btn {
  background-color: #38a169; /* Green color */
}

.add-to-cart-btn:hover {
  background-color: #2f855a; /* Darker green */
}

.view-details-btn {
  background-color: #3182ce; /* Blue color */
}

.view-details-btn:hover {
  background-color: #2b6cb0; /* Darker blue */
}

.clear-wishlist-btn {
  background-color: #4a5568; /* Gray color */
}

.clear-wishlist-btn:hover {
  background-color: #2d3748; /* Darker gray */
}

/* Empty State */
.text-gray-600 {
  color: #a0aec0; /* Light gray for empty state */
  text-align: center;
  font-size: 1.25rem;
  margin-top: 2rem;
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .item-image {
    max-height: 150px; /* Adjust height for small screens */
  }
}
</style>
