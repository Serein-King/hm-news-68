import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

// 导入amfe-flexible库
import 'amfe-flexible'

// 全局注册组件
import './utils/global.js'
// 全局处理axios 请求
import './utils/request.js'
// 配置全局过滤器
import './utils/filters'
// 全局导入vant
import './utils/vant'

// 注册VueCropper
// import VueCropper from 'vue-cropper'
// Vue.use(VueCropper)

Vue.config.productionTip = false
window.vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
