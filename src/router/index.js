import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../views/login'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
]

const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const router = createRouter()

//解决退出登入后重新登入路由重复问题
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
