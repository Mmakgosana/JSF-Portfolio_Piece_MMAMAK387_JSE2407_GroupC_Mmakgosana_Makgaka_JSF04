<template>
  <main>
    <!-- Display error message if there's an error -->
    <div v-if="error" class="flex justify-center p-5">
      <Error :message="error" />
    </div>
    <!-- Display loading state while data is being fetched -->
    <div v-else-if="loading" class="flex justify-center p-5">
      <LoadingState />
    </div>
    <!-- Display product details if available -->
    <div v-else class="grid m-10 space-y-5">
      <!-- Back button to navigate to the homepage -->
      <a href="/">
        <button class="bg-gray-500 text-white py-2 px-4 rounded">Back</button>
      </a>
      <!-- Product detail section -->
      <div v-if="product" class="flex flex-col items-center bg-white border-2 border-gray-500 p-4">
        <img :src="product.image" :alt="product.title" class="object-contain h-48 mt-3 mb-3" />
        <h1 class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600">{{ product.title }}</h1>
        <p class="mt-2 text-center text-gray-700 mb-3">{{ product.description }}</p>
        <h2 class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug mb-3">$ {{ product.price }}</h2>
        <div class="justify-start flex-1 mt-2 mb-3">
          <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{{ product.category }}</span>
        </div>
        <!-- <p class="mt-2 text-gray-700 mb-3">⭐ {{ product.rating?.rate }}</p> -->
        <!-- <p class="mt-1 text-gray-700 mb-3">Reviews: {{ product.rating?.count }}</p> -->
        <div class="card-container bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border dark:border-gray-700 p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
    
    <h3 class="text-lg font-bold mb-2 dark:text-white">{{ product.title }}</h3>
    <p class="text-gray-700 dark:text-gray-300 mb-2">${{ product.price }}</p>
    
  </div>
  <div class="product-actions">
          <button @click="addToCart" class="add-to-cart-btn">Add to Cart</button>
          <button @click="addToWishlist" class="add-to-wishlist-btn">
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  </main>
  <div class="bg-customBg min-h-screen">
    <!-- Your content here -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useWishlistStore } from '../WishlistStore';
import { useRouter, useRoute } from 'vue-router';
import { useCart } from '../CartStore';

/**
 * @fileoverview This component fetches and displays the details of a single product based on its ID.
 */

export default {
  name: 'ProductDetail',
  
  /**
   * @type {Object}
   * @property {string | number} id - The ID of the product to display details for.
   */
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },

  setup(props) {
    /**
     * Reactive reference for holding product details.
     * @type {import('vue').Ref<Object>}
     */
    const product = ref({});

    /**
     * Reactive reference for tracking error messages.
     * @type {import('vue').Ref<string | null>}
     */
    const error = ref(null);

    /**
     * Reactive reference for tracking loading state.
     * @type {import('vue').Ref<boolean>}
     */
    const loading = ref(false);

    /**
     * Fetches product details from the API.
     * @param {string | number} productId - The ID of the product to fetch details for.
     * @returns {Promise<{response: Object | null, error: string | null}>} An object containing the response data and error message.
     */
    const getProductDetails = async (productId) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return { response: data, error: null };
      } catch (err) {
        return { response: null, error: err.message };
      }
    };

    /**
     * Lifecycle hook that runs when the component is mounted.
     * It fetches the product details based on the provided ID and updates the component state.
     */
    onMounted(async () => {
      loading.value = true;
      const { response, error: fetchError } = await getProductDetails(props.id);
      if (fetchError) {
        error.value = fetchError;
      } else {
        product.value = response;
      }
      loading.value = false;
    });

    const router = useRouter();
    const route = useRoute();
    const wishlistStore = useWishlistStore();
    const cartStore = useCart();

    

    //const product = wishlistStore.items.find(
      //(item) => item.id === parseInt(route.params.id)
    //);

    //const addToCart = () => {
      //cartStore.addToCart(product);
      //router.push('/cart');
    //};

    const addToCart = () => {
  // Pass the necessary product details to the cart store
  const productDetails = {
    id: product.value.id,
    title: product.value.title,
    price: product.value.price,
    image: product.value.image,
    quantity: 1 // Default quantity when adding a new item
  };
  cartStore.addToCart(productDetails);
  router.push('/cart');
};


    const addToWishlist = () => {
      wishlistStore.addToWishlist(product);
    };

    return {
      product,
      error,
      loading,
      addToCart,
      addToWishlist,
    };
  },
};
</script>

<style>
/* Buttons */
.remove-btn, .add-to-cart-btn, .add-to-wishlist-btn, .clear-wishlist-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}


.add-to-cart-btn {
  background-color: #38a169; /* Green color */
}

.add-to-cart-btn:hover {
  background-color: #2f855a; /* Darker green */
}

.add-to-wishlist-btn {
  background-color: #4a5568; /* Gray color */
}

.add-to-cart-btn:hover:hover {
  background-color: #2d3748; /* Darker gray */
}






</style>
