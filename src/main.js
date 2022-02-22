import Vue from 'vue'
import App from './App.vue'
import router from './router' // 路由
import '@/permission' // 权限
import axios from '@/utils/request' // 引入axios
import Components from '@/components' // 全局组件

import ElementUI from 'element-ui'// element-ui
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.use(Components)

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
