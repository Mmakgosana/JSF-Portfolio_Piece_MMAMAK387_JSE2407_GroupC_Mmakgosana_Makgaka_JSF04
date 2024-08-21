
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: !!localStorage.getItem('userToken'),
    // Other state properties
  }),
  actions: {
    login() {
      this.isAuthenticated = true;
      localStorage.setItem('userToken', 'Token');
      this.isAuthenticated = true;
    },
    logout() {
      localStorage.removeItem('userToken');
      this.isAuthenticated = false;
    },
  },
});

export const getToken = () => localStorage.getItem('userToken');

export const setToken = (token) => localStorage.setItem('usery', token);

export const removeToken = () => localStorage.removeItem('token');

export const isLoggedIn = () => !!getToken();

export const getUserId = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub; // Assuming 'sub' is the user ID in your JWT
  }
  return null;
};