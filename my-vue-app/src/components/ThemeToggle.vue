<template>
    <button @click="toggleTheme" class="theme-toggle">
      <span v-if="isDarkMode">🌙</span>
      <span v-else>☀️</span>
    </button>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue';
  
  export default {
    name: 'ThemeToggle',
    setup() {
      const isDarkMode = ref(false);
  
      const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value;
        updateTheme();
      };
  
      const updateTheme = () => {
        if (isDarkMode.value) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      };
  
      onMounted(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          isDarkMode.value = savedTheme === 'dark';
        } else {
          isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        updateTheme();
      });
  
      watch(isDarkMode, updateTheme);
  
      return {
        isDarkMode,
        toggleTheme,
      };
    },
  };
  </script>
  
  <style scoped>
  .theme-toggle {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
  }
  </style>