import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import Sechome from '@/views/home/sechome'

Vue.use(VueRouter)

const routes = [
  {
    path: '*', // 路由无法匹配的时候，进入404
    component: () => import('@/views/404')
  }, {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    // 在一级路由表下的children中配置二级路由表
    children: [
      {
        path: '', // 二级路由不填写代表二级路由默认组件
        component: Sechome
      }, {
      // 采用按需加载的方式引入
      // 发布文章
      // 加问号 有参数能匹配，也能匹配,用于修改跳转到发布页
        path: 'publish/:articleId?',
        component: () => import('@/views/publish')
      }, {
      // 内容列表
        path: 'articles',
        component: () => import('@/views/articles')
      }, {
      // 评论列表
        path: 'comment',
        component: () => import('@/views/comment')
      }, {
      // 素材管理
        path: 'material',
        component: () => import('@/views/material')
      }, {
      // 图文数据
        path: 'picture',
        component: () => import('@/views/picture')
      }, {
      // 粉丝列表
        path: 'fanslist',
        component: () => import('@/views/fanslist')
      }, {
      // 粉丝概况
        path: 'fansinfo',
        component: () => import('@/views/fansinfo')
      }, {
      // 粉丝画像
        path: 'fansphoto',
        component: () => import('@/views/fansphoto')
      }, {
      // 账户信息
        path: 'account',
        component: () => import('@/views/account')
      }
    ]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }

]

const router = new VueRouter({
  routes
})

export default router
