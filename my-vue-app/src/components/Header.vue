<template>
  <header class="sticky z-50 top-0">
    <nav class="bg-gray-500 border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <router-link to="/">
          <button class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/online-shop.png" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
              SwiftCart
            </span>
          </button>
        </router-link>
        <button
          @click="toggleNavbar"
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          :class="['w-full md:block md:w-auto', { hidden: isNavbarHidden }]"
          id="navbar-dropdown"
        >
          <ul class="flex flex-col top-10 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li class="hidden lg:block md:block relative">
              <router-link
                to="/wishlist">
                <div class="t-0 absolute left-3 -top-4">
                  <p class="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white"
                  >
                  {{ wishlistItemCount }}
                </p>
                </div>
                <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="file:h-6 w-6 stroke-white cursor-pointer"
      >
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </router-link>
  </li>
                
            <li class="hidden lg:block md:block relative">
              <router-link to="/cart">
                <div class="t-0 absolute left-3 -top-4">
                  <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                    {{ totalItems }}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="file:h-6 w-6 stroke-white cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </router-link>
            </li>
            <li>
              <router-link
                to="/cart"
                class="lg:hidden md:hidden py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Cart
              </router-link>
            </li>
            <li v-if="isLoggedIn">
              <router-link
                to="/comparison"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                <i class="fas fa-balance-scale"></i>
              </router-link>
            </li>
            <li v-if="!isLoggedIn">
              <router-link
                to="/login"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Login
              </router-link>
            </li>
            <li v-if="isLoggedIn">
              <button
                @click="handleLogout"
                class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '../CartStore';
import { useWishlistStore } from '../WishlistStore';


const isNavbarHidden = ref(true);
const isLoggedIn = ref(!!localStorage.getItem('userToken'));
const router = useRouter();
const cartStore = useCart();
const wishlistStore = useWishlistStore();

const wishlistItemCount = computed(() => wishlistStore.items.length);


const toggleNavbar = () => {
  isNavbarHidden.value = !isNavbarHidden.value;
};

const handleLogout = () => {
  cartStore.clearCart(); // Clear the cart on logout
  localStorage.removeItem('userToken');
  isLoggedIn.value = false;
  router.push('/login');
};

watch(() => localStorage.getItem('userToken'), (newVal) => {
  isLoggedIn.value = !!newVal;
});

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('userToken');
});

const totalItems = computed(() => cartStore.totalItems);
</script>

<style scoped>
/* Add any styles specific to the Header component here */
</style>
