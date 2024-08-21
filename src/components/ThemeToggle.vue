import { ref, onMounted } from 'vue';

export default {
  name: 'ProductGrid',
  setup() {
    const currentTheme = ref('light');

    onMounted(() => {
      if (localStorage.getItem('theme')) {
        currentTheme.value = localStorage.getItem('theme');
        document.documentElement.classList.add(currentTheme.value);
      } else {
        document.documentElement.classList.add(currentTheme.value);
      }
    });

    const toggleTheme = () => {
      if (currentTheme.value === 'light') {
        currentTheme.value = 'dark';
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      } else {
        currentTheme.value = 'light';
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
      localStorage.setItem('theme', currentTheme.value);
    };

    return {
      currentTheme,
      toggleTheme,
    };
  },
};
