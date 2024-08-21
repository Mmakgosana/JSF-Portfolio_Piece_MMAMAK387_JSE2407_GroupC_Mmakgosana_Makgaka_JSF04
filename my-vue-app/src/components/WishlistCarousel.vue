<template>
  <swiper :slides-per-view="3" :space-between="30" pagination navigation>
    <swiper-slide v-for="item in wishlistItems" :key="item.id">
      <div class="wishlist-item">
        <img :src="item.image" :alt="item.title" class="wishlist-item-img" />
        <div class="wishlist-item-info">
          <h3 class="wishlist-item-title">{{ item.title }}</h3>
          <p class="wishlist-item-price">${{ item.price.toFixed(2) }}</p>
          <div class="wishlist-item-actions">
            <button @click="removeFromWishlist(item.id)" class="remove-btn">
              Remove
            </button>
            <button @click="addToCart(item)" class="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    wishlistItems: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const removeFromWishlist = (itemId) => {
      emit('remove-from-wishlist', itemId);
    };

    const addToCart = (item) => {
      emit('add-to-cart', item);
    };

    return {
      removeFromWishlist,
      addToCart,
    };
  },
};
</script>

<style scoped>
.wishlist-item-img{
    object-fit: contain;
    width: 100%;
    height: 12rem;
    padding: 1rem;
}
.wishlist-item {
  background-color: #f9f9f9; /* Light background */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow */
}

.wishlist-item-info {
  padding: 1rem;
}

.wishlist-item-title {
  font-weight: bold;
  font-size: 1.25rem;
  color: #333; /* Dark text color */
}

.wishlist-item-price {
  color: #666; /* Grey color */
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.wishlist-item-actions {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.remove-btn {
  background-color: #e53e3e; /* Red color */
  color: #fff;
}

.remove-btn:hover {
  background-color: #c53030; /* Darker red */
}

.add-to-cart-btn {
  background-color: #3182ce; /* Blue color */
  color: #fff;
}

.add-to-cart-btn:hover {
  background-color: #2b6cb0; /* Darker blue */
}

/* Swiper navigation buttons */
.swiper-button-prev,
.swiper-button-next {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background-color: rgba(0, 0, 0, 0.7); /* Darker background on hover */
}
</style>
