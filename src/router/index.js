import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import GamePage from '../pages/GamePage.vue'
import NotFound from '../pages/NotFound.vue'
import Login from '../pages/loginPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/game',
    name: 'game',
    component: GamePage
  },
  { 
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router