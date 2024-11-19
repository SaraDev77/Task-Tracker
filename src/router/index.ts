import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('../views/MainView.vue'),
    },
    {
      path: '/details/:id',
      name: 'task',
      component: () => import('../views/TaskDetails.vue'),
    },
    {
      name:'not-found',
      path:'/:catchAll(.*)',
      component:() => import('../views/NotFound.vue')
    }
  ],
})

export default router
