// src/stores/ComparisonStore.js
import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';

const STORAGE_KEY = 'comparisonList'

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

const saveToLocalStorage = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};



export const useComparisonStore = defineStore('comparison', {
  state: () => ({
    items: [],
    maxItems: 4, // Limit the number of items
  }),
  actions: {
    addToComparison(item) {
      if (this.items.length < this.maxItems && !this.items.find(i => i.id === item.id)) {
        this.items.push(item);
      }
    },
    removeFromComparison(itemId) {
      this.items = this.items.filter(item => item.id !== itemId);
    },
    clearComparison() {
      this.items = [];
    },
  },
});