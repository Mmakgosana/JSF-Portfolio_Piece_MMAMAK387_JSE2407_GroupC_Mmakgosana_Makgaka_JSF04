<template>
  <!-- Render the Header component -->
  <Header />

  <!-- Render the StarRating component -->
  <StarRating />



  <!-- Render the content for the current route -->
  <router-view></router-view>
</template>

<script>
/**
 
@fileoverview This is the main layout component for the application.
It includes a Header, Login, and a router-view for rendering matched components based on the current route.
*/

import Header from './components/Header.vue';
import Ratings from './components/Ratings.vue';
import Login from './components/Login.vue';
import { watch } from 'vue';

/** 
 
Main layout component for the application.
It includes the Header, Login, and router-view components.
*
@component
*/
export default {
  components: {
    /** 
     
The Header component used for navigation throughout the app.
@type {import('./components/Header.vue').default}*/
    Header,
    Ratings,
    Login
  },
};

</script>
