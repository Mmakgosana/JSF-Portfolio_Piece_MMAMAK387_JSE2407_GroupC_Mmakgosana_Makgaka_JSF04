#E Commerce Store App
#Author: [Mmakgosana Makgaka]

Table of Contents
1. Introduction
2. Technologies Used
3. Features
4. Project Setup
5. Usage

Introduction
This is an e-commerce application built using Vue.js. The project aimns to provide a seamless shopping experience, allowing users to browse products, view detailed information, andmanage their shopping cart. The application is designed to be responsive and user friendly.

Technologies Used
1. Frontend Framework: Vue 3
2. State Management: Vuex
3. Routing: Vue Router
4. Styling: Tailwind CSS
5. Build Tool: Vite
6. API Calls: Fetch API

Features
1. Price Sorting: Sort products by price(from the lowest to the highest and vice versa)
2. Category filtering 
3. Product Details: View detailed information about a product
4.Product grid which displays product cards.

Setup Instructions
1. Clone the Repository
https://github.com/Mmakgosana/Module_4_MMAMAK387_JSF2407_Mmakgosana_Makgaka_JSF03.git

2. Install the following Dependecies: 
2.1 Create a New Vite Project: 
npm create vite@latest my-vue-app -- --template vue

2.2 Navigate to your directory: 
cd my-vue-app

2.3 Install the required dependencies:
npm install
npm run dev
Tailwind CSS

2.4 Install Vue Router
2.4.1 npm install vue-router
2.4.2 Create a new file named router.js and add this code to the router.js file
 import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
2.4.4 Update main application entry file(src/main.js)
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');

Usage
When the development server is running, the application is accessible at http://localhost:5175/

Key Features
1. Loading States
1.1 Initial loading state: An indicator to show you that it is loading while initial data is being fetched.
2. Data Fetching
An indicator to indicate that it is loading when new data is being fetched.
3. Filtering and Sorting
The application allows the user to filter items according to their categories, it also allows the user to sort the items according to their prices from lowest to highest and vice verssa and to reset the filters and sorts back to default.

4. Products browsing
The application allows the user to browse through the products by showing product images, titles, prices, category, ratings and reviews, when you  click on the product image, it takes you to a detailed page of that specific document, which include a larger image of the product, the description of the product, the price, category, reviews and ratings.


