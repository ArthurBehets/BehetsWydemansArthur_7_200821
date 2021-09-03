import { createRouter, createWebHashHistory } from 'vue-router'
import signup from '../views/signup.vue'
import login from '../views/login.vue'

const routes = [
  {
    path: '/',
    name: 'signup',
    component: signup
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
