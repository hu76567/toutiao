// 此文件用于处理路由权限问题
import router from '@/router'// 导入路由

// 引入进度条包和样式文件
import progress from 'nprogress'
import 'nprogress/nprogress.css'

// 前置守卫
router.beforeEach(function (to, from, next) {
  // 开启进度条
  progress.start()
  // next() 没有参数的情况表示放过,
  // 为false表示当前跳转被停止了
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      // 有token放行
      next()
    } else {
      // 没有token 回到登录页
      next('/login')
    }
  } else {
    next()
  }
})

// 后置守卫
router.afterEach(() => {
  // 关闭进度条
  progress.done()
})
