
//import jwtDecode from 'jwt-decode';

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