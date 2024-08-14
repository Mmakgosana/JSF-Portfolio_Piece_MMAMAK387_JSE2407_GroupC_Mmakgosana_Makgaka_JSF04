// src/utils/auth.js

export const getToken = () => localStorage.getItem('userToken');

export const setToken = (token) => localStorage.setItem('userToken', token);

export const removeToken = () => localStorage.removeItem('userToken');

export const isLoggedIn = () => !!getToken();

export const getUserId = async () => {
  const token = getToken();
  if (token) {
    try {
      const jwtDecode = (await import('jwt-decode')).default;
      const decodedToken = jwtDecode(token);
      return decodedToken.sub; // Assuming 'sub' is the user ID in your JWT
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};