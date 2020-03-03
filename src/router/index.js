import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import Sechome from '@/views/home/sechome'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/home'
},
{
  path: '/home',
  name: 'Home',
  component: Home,
  // 在一级路由表下的children中配置二级路由表
  children: [
    {
      path: '', // 二级路由不填写代表二级路由默认组件
      component: Sechome
    }
  ]
}, {
  path: '/login',
  name: 'Login',
  component: Login
}
// {
//   // 按需加载
//   path: '/about',
//   name: 'About',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
// }
]

const router = new VueRouter({
  routes
})

export default router
