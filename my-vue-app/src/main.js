// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'; // If using Vue Router
//import Toaster from "@meforma/vue-toaster";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // Make sure Pinia is used
app.use(router); // If using Vue Router
//app.use(Toaster);
app.mount('#app');
