<template>
  <div v-if="authStore.isAuthenticated" class="p-6">
    <h1 class="text-3xl font-bold mb-4">Product Comparison</h1>
    <div v-if="comparisonStore.items.length">
      <table class="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th v-for="item in comparisonStore.items" :key="item.id" class="p-4 text-left border-b border-gray-300">
              <div class="flex flex-col items-start">
                <span class="font-semibold">{{ item.title }}</span>
                <button @click="removeItem(item.id)" class="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                  Remove
                </button>
              </div>
            </th>
          </tr>
        </thead>;
        <tbody>
          <tr class="bg-white hover:bg-gray-50">
            <td v-for="item in comparisonStore.items" :key="item.id" class="p-4 border-b border-gray-300">
              <img :src="item.image" :alt="item.title" class="w-32 h-32 object-cover mx-auto rounded" />
            </td>
          </tr>
          <tr class="bg-white hover:bg-gray-50">
            <td v-for="item in comparisonStore.items" :key="item.id" class="p-4 border-b border-gray-300">
              {{ item.description }}
            </td>
          </tr>
          <tr class="bg-white hover:bg-gray-50">
            <td v-for="item in comparisonStore.items" :key="item.id" class="p-4 border-b border-gray-300">
              ${{ item.price }}
            </td>
          </tr>
          <tr class="bg-white hover:bg-gray-50">
            <td v-for="item in comparisonStore.items" :key="item.id" class="p-4 border-b border-gray-300">
              {{ item.rating.rate }} ({{ item.rating.count }} reviews)
            </td>
          </tr>
          <!-- Add more rows for other specifications -->
        </tbody>
      </table>
      <div class="mt-4 flex justify-between items-center">
        <p class="text-gray-600">Total items: {{ comparisonStore.items.length }}</p>
        <button @click="clearComparison" class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
          Clear Comparison
        </button>
      </div>
    </div>
    <p v-else class="mt-4 text-gray-600">No items in comparison list.</p>
  </div>

  <div v-else class="p-6">
    <p class="text-xl text-gray-800">Please log in to access the comparison page.</p>
  </div>
</template>

<script>
import { useComparisonStore } from '../ComparisonStore';
import { useAuthStore } from '../auth';
//import { cart } from '../CartStore'

export default {
  setup() {
    const comparisonStore = useComparisonStore();
    const authStore = useAuthStore();

    const removeItem = (itemId) => {
      comparisonStore.removeFromComparison(itemId);
    };

    const clearComparison = () => {
      comparisonStore.clearComparison();
    };

    return { comparisonStore, authStore, removeItem, clearComparison };
  }
};
</script>

<style scoped>
/* Additional scoped styles, if needed */
</style>
