import { createRouter, createWebHistory } from 'vue-router'

import LoginVue from '../views/login.vue'
import HomeVue from '../views/mainviews/home.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginVue
  },
  {
    path: '/home:id',
    name: 'Home',
    component: HomeVue,
    props: true
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
