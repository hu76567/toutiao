import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 引入权限模块
// 引入element-ui模块
import ElementUI from 'element-ui'
import axios from 'axios'
import Components from '@/components'
// 引入css样式
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'

Vue.config.productionTip = false

// 配置公共的请求头地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 将axios赋值给 Vue对象的原型属性
Vue.prototype.$axios = axios

Vue.use(Components)
// 注册全局组件
Vue.use(ElementUI)
// Vue.use 实际上会调用 Element中的install方法,并传入当前的Vue对象

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
