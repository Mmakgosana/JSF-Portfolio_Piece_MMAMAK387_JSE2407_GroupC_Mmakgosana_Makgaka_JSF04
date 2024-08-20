// src/stores/WishlistStore.js
import { defineStore } from 'pinia';


export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [],
  }),
  actions: {
    addToWishlist(item) {
      if (!this.items.find(i => i.id === item.id)) {
        this.items.push(item);
        this.saveToLocalStorage();
      }
    },
    removeFromWishlist(itemId) {
      this.items = this.items.filter(item => item.id !== itemId);
      this.saveToLocalStorage();
    },
    clearWishlist() {
      this.items = [];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('wishlist', JSON.stringify(this.items));
    },
    loadFromLocalStorage() {
      const storedData = localStorage.getItem('wishlist');
      if (storedData) {
        this.items = JSON.parse(storedData);
      }
    }
  },
  getters: {
    wishlistCount() {
      return this.items.length;
    },
  },
  persist: true,
});
