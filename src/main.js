// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'; // If using Vue Router
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // Make sure Pinia is used
app.use(router); // If using Vue Router
//app.use(Toaster);
app.mount('#app');
