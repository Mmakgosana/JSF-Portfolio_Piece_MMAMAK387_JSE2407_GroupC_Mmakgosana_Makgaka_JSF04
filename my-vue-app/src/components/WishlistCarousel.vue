<template>
    <swiper :slides-per-view="3" :space-between="30" pagination navigation>
      <swiper-slide v-for="item in wishlistItems" :key="item.id">
        <div class="wishlist-item">
          <img :src="item.image" :alt="item.title" class="wishlist-item-image" />
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
  //import { Pagination, Navigation } from 'swiper';
  
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
  /* Your styles remain the same */
  </style>
  