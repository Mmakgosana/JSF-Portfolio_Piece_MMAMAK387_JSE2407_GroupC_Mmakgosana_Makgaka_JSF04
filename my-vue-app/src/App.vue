App.vue
<template>
  <div>
    <!-- Render the Navbar component -->
    <Header />

    <!-- Render the content for the current route -->
    <router-view />
  </div>
</template>

<script>
/** 
 
@fileoverview This is the main layout component for the application.
It includes a Navbar and a router-view for rendering matched components based on the current route.
*/

import Header from './components/Header.vue';

/** 
 
Main layout component for the application.
It includes the Navbar component and the router-view.
*
@component
*/
export default {
  components: {
    /** 
     
The Header component used for navigation throughout the app.
@type {import('./components/Navbar.vue').default}*/
Header
}
};
</script>
