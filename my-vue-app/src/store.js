import { reactive, onMounted } from 'vue';
import * as jwtDecode from 'jwt-decode'; // Named import



const state = reactive({
  cartItems: [],
  cartTotal: 0,
});

function getCartKey() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token); // Decode JWT token
      return `cartItems_${decoded.sub}`; // Use user's ID as part of the key
    } catch (error) {
      console.error('Failed to decode JWT token:', error);
    }
  }
  return 'cartItems';
}

function loadCartFromLocalStorage() {
  const cart = JSON.parse(localStorage.getItem(getCartKey()));
  if (cart) {
    state.cartItems = cart;
    calculateCartTotal();
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem(getCartKey(), JSON.stringify(state.cartItems));
}

function calculateCartTotal() {
  state.cartTotal = state.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function updateItemQuantity(itemId, quantity) {
  const item = state.cartItems.find(item => item.id === itemId);
  if (item) {
    item.quantity = quantity;
    calculateCartTotal();
    saveCartToLocalStorage();
  }
}

function removeItemFromCart(itemId) {
  state.cartItems = state.cartItems.filter(item => item.id !== itemId);
  calculateCartTotal();
  saveCartToLocalStorage();
}

function clearCart() {
  state.cartItems = [];
  calculateCartTotal();
  saveCartToLocalStorage();
}

export function useCart() {
  onMounted(() => {
    loadCartFromLocalStorage();
  });

  return {
    cartItems: state.cartItems,
    cartTotal: state.cartTotal,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
  };
}

export function addToCart(product) {
  const alreadyInCart = state.cartItems.find(item => item.id === product.id);
  if (alreadyInCart) {
    alreadyInCart.quantity += 1;
  } else {
    const newProduct = {
      ...product,
      quantity: 1,
    };
    state.cartItems.push(newProduct);
  }
  calculateCartTotal();
  saveCartToLocalStorage();
}
