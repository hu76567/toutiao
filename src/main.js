import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element-ui模块
import ElementUI from 'element-ui'
// 引入css样式
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import axios from 'axios'
Vue.config.productionTip = false

// 配置公共的请求头地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 将axios赋值给 Vue对象的原型属性
Vue.prototype.$axios = axios

// 注册全局组件
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
