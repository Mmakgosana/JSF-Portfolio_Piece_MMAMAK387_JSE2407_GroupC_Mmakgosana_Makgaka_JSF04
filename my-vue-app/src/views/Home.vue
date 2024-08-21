<template>
  
  <div v-if="authStore.isAuthenticated">
      <h2 class="text-2xl font-bold mb-4">Your Wishlist</h2>
      <WishlistCarousel
        :wishlistItems="wishlistItems"
        @remove-from-wishlist="removeFromWishlist"
        @add-to-cart="addToCart"
      />
    </div>
    <div class="container mx-auto p-6">
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
          <button
            @click="searchProducts"
            class="bg-white text-black border border-l-0 p-2 rounded-r"
          >
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
  
      <Loading v-if="loading" />
      <ProductGrid :products="filteredProducts" v-else />

      
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import Loading from '../components/Loading.vue';
  import ProductGrid from '../components/ProductGrid.vue';
  import { useAuthStore } from '../auth';
  import { useWishlistStore } from '../WishlistStore';
  import { useCart } from '../CartStore';
  import WishlistCarousel from '../components/WishlistCarousel.vue';
  
  export default {
    components: {
      Loading,
      ProductGrid,
      WishlistCarousel
    },
    setup() {
      const products = ref([]);
      const categories = ref([]);
      const searchQuery = ref('');
      const selectedCategory = ref('');
      const sortOrder = ref('');
      const loading = ref(true);
      const authStore = useAuthStore();
      const wishlistStore = useWishlistStore();
      const cartStore = useCart();

      const wishlistItems = computed(() => wishlistStore.items);

      const removeFromWishlist = (itemId) => {
        wishlistStore.removeFromWishlist(itemId);
      };

      const addToCart = (item) => {
      cartStore.addToCart(item);
      removeFromWishlist(item.id);
      };

      const fetchProducts = async () => {
        loading.value = true;
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        products.value = data;
        loading.value = false;
      };
  
      const fetchCategories = async () => {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        categories.value = data;
      };
  
      const searchProducts = () => {
        // This will trigger the computed property to recalculate
      };
  
      const filteredProducts = computed(() => {
        let prods = products.value;
  
        if (selectedCategory.value) {
          prods = prods.filter(product => product.category === selectedCategory.value);
        }
        if (sortOrder.value === 'asc') {
          prods = prods.sort((a, b) => a.price - b.price);
        } else if (sortOrder.value === 'desc') {
          prods = prods.sort((a, b) => b.price - a.price);
        } else if (sortOrder.value === 'default') {
          prods = prods.sort((a, b) => a.id - b.id);
        }
  
        if (searchQuery.value) {
          prods = prods.filter(product =>
            product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
          );
        }
        return prods;
      });
  
      onMounted(() => {
        fetchProducts();
        fetchCategories();
      });
  
      return {
        products,
        categories,
        searchQuery,
        selectedCategory,
        sortOrder,
        loading,
        searchProducts,
        filteredProducts,
        authStore,
        wishlistItems,
        removeFromWishlist,
        addToCart,
      };
    }
  };
  </script>