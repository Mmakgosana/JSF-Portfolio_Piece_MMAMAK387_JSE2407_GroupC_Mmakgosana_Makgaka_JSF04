<template>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in wishlistItems" :key="item.id">
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
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
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
  .swiper-container {
    width: 100%;
    height: 300px;
  }
  
  .wishlist-item {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .wishlist-item-image {
    width: 150px;
    height: 150px;
    object-fit: contain;
  }
  
  .wishlist-item-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .wishlist-item-price {
    color: #888;
    margin-bottom: 10px;
  }
  
  .wishlist-item-actions {
    display: flex;
    gap: 10px;
  }
  
  .remove-btn,
  .add-to-cart-btn {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .remove-btn {
    background-color: #e74c3c;
  }
  </style>