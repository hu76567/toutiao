// 公共的注册文件,完成所有的组件注册----全局注册
// Vue.use 实际上会调用 Element中的install方法,并传入当前的Vue对象
// 第一个参数Vue对象
import layoutAhead from './home/layout-ahead'
import layoutAside from './home/layout-aside'
export default {
  install: function (Vue) {
    //  全局注册组件,任意位置都可以用
    Vue.component('layout-ahead', layoutAhead)
    Vue.component('layout-aside', layoutAside)
  }
}
