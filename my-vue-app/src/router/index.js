// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Cart from '../components/Cart.vue';
// import About from '../views/ProductDetails.vue';
import ProductDetails from '../views/ProductDetails.vue';
import Login from '../components/Login.vue';
import { useCart } from '../CartStore';
import { useAuthStore } from '../auth';
import ComparisonPage from '../components/ComparisonPage.vue';


// const { cartItems, cartTotal, updateItemQuantity, removeItemFromCart, clearCart } = useCart();


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/comparison',
    name: 'Comparison',
    component: () => import('../components/ComparisonPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('../components/WishlistPage.vue'),
    meta: { requiresAuth: true },
  },
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
