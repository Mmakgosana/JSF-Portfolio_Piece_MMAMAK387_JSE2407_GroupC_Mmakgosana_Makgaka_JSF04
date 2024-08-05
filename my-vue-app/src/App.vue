<template>
  <Header />
  <router-view></router-view>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
html {
  background-color: #caf0f8;
}
</style>