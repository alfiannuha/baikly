import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/index.js"
import routes from '@/router/routes/index.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/404"
    },
    {
      path: "/",
      redirect: "/dashboard"
    }
  ].concat(routes)
})

router.beforeEach((to, from, next) => {
  const authenticated = store.state.authenticated
  const user = store.state.user
  const isAll = to.matched.some(record => record.meta.all)
  const onlyLoggedOut = to.matched.some(record => record.meta.onlyLoggedOut)
  const isPublic = to.matched.some(record => record.meta.public)
  
  if (!isAll && !isPublic && !authenticated) {
    return next({
      path: "/login",
    })
  }
  if (authenticated && onlyLoggedOut && user.user.is_fill_personal == 0) {
    return next("/profile/personal/info")
  }

  if (authenticated && onlyLoggedOut && user.user.is_fill_personal == 1) {
      return next("/")
  }
  document.title = `BAIKLY | ${to.meta.title}`
  next()
})

export default router
