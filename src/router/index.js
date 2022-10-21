import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { getToken } from '@/utils/cookies'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    meta: {
      isPublic: true
    },
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new Router({
  routes
})

router.beforeEach(async (to, from, next) => {
  // determine whether the user has logged in
  const token = getToken()

  if (token) {
    if (to.path === '/login' || to.path === '/register') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      try {
        // get user info
        await store.dispatch('getUser')
        next()
      } catch (error) {
        console.log(error)
        // remove token and go to login page to re-login
        await store.dispatch('logout')
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    /* has no token */
    if (to.meta.isPublic) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router
