import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ExampleView from '../views/ExampleView.vue'
import LoginView from '../views/LoginView.vue'
import HomePageView from '../views/HomePageView.vue'
import Page404View from '../views/Page404View.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: ExampleView
  },
  {
    path: "/:pathMatch(.*)*",
    component: Page404View
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home-page',
    name: 'home-page',
    component: HomePageView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
