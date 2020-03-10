// 公共的注册文件,完成所有的组件注册----全局注册
// Vue.use 实际上会调用 Element中的install方法,并传入当前的Vue对象
// 第一个参数Vue对象
import layoutAhead from './home/layout-ahead'
import layoutAside from './home/layout-aside'
import BreadCrumb from './common/bread-crumb'
import CoverImage from './publish/cover-image'
import SelectImage from './publish/select-image'
// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install: function (Vue) {
    //  全局注册组件,任意位置都可以用
    Vue.component('layout-ahead', layoutAhead)
    Vue.component('layout-aside', layoutAside)
    Vue.component('bread-crumb', BreadCrumb) // 面包屑组件
    // 注册富文本编辑器
    Vue.use(VueQuillEditor)
    Vue.component('cover-image', CoverImage)
    Vue.component('select-image', SelectImage)
  }
}
