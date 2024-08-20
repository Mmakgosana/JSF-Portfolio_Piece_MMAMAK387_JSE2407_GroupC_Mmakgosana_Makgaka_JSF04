import { reactive } from 'vue';

const state = reactive({
  items: JSON.parse(localStorage.getItem('wishlist')) || []
});

const addToWishlist = (item) => {
  if (!state.items.find(i => i.id === item.id)) {
    state.items.push(item);
    saveToLocalStorage();
  }
};

const removeFromWishlist = (itemId) => {
  state.items = state.items.filter(item => item.id !== itemId);
  saveToLocalStorage();
};

const clearWishlist = () => {
  state.items = [];
  saveToLocalStorage();
};

const saveToLocalStorage = () => {
  localStorage.setItem('wishlist', JSON.stringify(state.items));
};

export function useWishlistStore() {
  return {
    items: state.items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  };
}
