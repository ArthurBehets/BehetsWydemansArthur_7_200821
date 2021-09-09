import { createRouter, createWebHashHistory } from 'vue-router'
import signup from '../views/signup.vue'
import login from '../views/login.vue'
import home from '../views/home.vue'
import createArticle from '../views/createArticle.vue'

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
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/createArticle',
    name: 'createArticle',
    component : createArticle
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router