<template>
  <div class="login-container">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div class="form-group">
        <label for="username" class="block mb-1">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter your username"
          required
          class="w-full px-3 py-2 border rounded"
        />
      </div>

      <div class="form-group">
        <label for="password" class="block mb-1">Password</label>
        <div class="password-wrapper relative">
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
            class="w-full px-3 py-2 border rounded pr-10"
          />
          <button 
            type="button" 
            @click="togglePasswordVisibility"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
          >
          <span v-if="isPasswordVisible">🙈</span>
          <span v-else>👁️</span>
            {{ isPasswordVisible ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>

      <div v-if="loading" class="loading-indicator text-blue-500">
        Authenticating...
      </div>

      <div v-if="errorMessage" class="error-message text-red-500">
        {{ errorMessage }}
      </div>

      <button 
        type="submit" 
        :disabled="!username || !password || loading"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Log In
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { setToken } from '../auth';


export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const isPasswordVisible = ref(false);
    const loading = ref(false);
    const errorMessage = ref(null);

    

    const togglePasswordVisibility = () => {
      isPasswordVisible.value = !isPasswordVisible.value;
    };

    const handleLogin = async () => {
      if (!username.value || !password.value) return;

      loading.value = true;
      errorMessage.value = null;

      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        });

    

        const data = await response.json();

        if (response.ok) {
          console.log('Login successful:', data);
          localStorage.setItem('userToken', data.token);
          router.push('/').then(() => {
            window.location.reload();
          });
        } else {
          errorMessage.value = 'Login failed. Please check your credentials.';
        }
      } catch (error) {
        console.error('Login error:', error);
        errorMessage.value = 'An error occurred. Please try again.';
      } finally {
        loading.value = false;
      }
    };

    return {
      username,
      password,
      isPasswordVisible,
      loading,
      errorMessage,
      togglePasswordVisibility,
      handleLogin
    };
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
}
</style>