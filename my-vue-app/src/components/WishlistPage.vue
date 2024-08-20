<template>
    <div v-if="authStore.isAuthenticated">
      <h1>Your Wishlist</h1>
      <div v-if="wishlistStore.items.length">
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
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useWishlistStore } from '../WishlistStore';
  import { useAuthStore } from '../auth';
  import { useCart } from '../CartStore';
  
  export default {
    setup() {
      const wishlistStore = useWishlistStore();
      const authStore = useAuthStore();
      const cartStore = useCart();
      
      const removeItem = (itemId) => {
        wishlistStore.removeFromWishlist(itemId);
      };
  
      const clearWishlist = () => {
        wishlistStore.clearWishlist();
      };
  
      const addToCart = (item) => {
        cartStore.addToCart(item);
      };
  
      const filteredItems = computed(() => {
        // Implement any sorting/filtering logic here if needed
        return wishlistStore.items;
      });
  
      return {
        wishlistStore,
        authStore,
        cartStore,
        removeItem,
        clearWishlist,
        addToCart,
        filteredItems,
      };
    },
  };
  </script>
  
  <style scoped>
  .wishlist-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .item-details {
    display: flex;
    align-items: center;
  }
  
  .item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 10px;
  }
  
  .item-info {
    flex: 1;
  }
  
  .item-name {
    font-weight: bold;
  }
  
  .item-price {
    color: #888;
  }
  
  .item-actions {
    display: flex;
    gap: 10px;
  }
  
  .remove-btn {
    background-color: red;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
  }
  
  .add-to-cart-btn {
    background-color: green;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
  }
  
  .clear-wishlist-btn {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
  }
  </style>
  