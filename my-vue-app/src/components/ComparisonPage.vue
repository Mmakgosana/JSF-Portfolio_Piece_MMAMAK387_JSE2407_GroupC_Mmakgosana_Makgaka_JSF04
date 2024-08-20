<!-- src/views/ComparisonPage.vue -->
<template>
    <div v-if="authStore.isAuthenticated">
      <h1>Product Comparison</h1>
      <table v-if="comparisonStore.items.length">
        <thead>
          <tr>
            <th v-for="item in comparisonStore.items" :key="item.id">
              {{ item.title }}
              <button @click="removeItem(item.id)">Remove</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr> <!-- Images -->
            <td v-for="item in comparisonStore.items" :key="item.id">
              <img :src="item.image" :alt="item.title" />
            </td>
          </tr>
          <tr> <!-- Descriptions -->
            <td v-for="item in comparisonStore.items" :key="item.id">
              {{ item.description }}
            </td>
          </tr>
          <tr> <!-- Prices -->
            <td v-for="item in comparisonStore.items" :key="item.id">
              {{ item.price }}
            </td>
          </tr>
          <tr> <!-- Ratings -->
            <td v-for="item in comparisonStore.items" :key="item.id">
              {{ item.rating }}
            </td>
          </tr>
          <!-- Add more rows for other specifications -->
        </tbody>
      </table>
      <p v-else>No items in comparison list.</p>
      <button @click="clearComparison">Clear Comparison</button>
    </div>
    

    <div v-else>
      <p>Please log in to access the comparison page.</p>
    </div>
  </template>
  
  <script>
  import { useComparisonStore } from '../ComparisonStore';
  import { useAuthStore } from '../auth';
  
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
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  </style>