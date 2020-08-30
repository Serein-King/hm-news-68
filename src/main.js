import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
// 全局的把 vant组件都导入好了
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import axios from 'axios'
import HmNavItem from './components/HmNavItem.vue'
import moment from 'moment'
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
// 把axios挂在到vue 的原型上
Vue.prototype.$axios = axios
// g给axios 配置默认的baseUrl,基准地址
axios.defaults.baseURL = 'http://localhost:3000'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log('拦截了请求', config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log('拦截了响应', response)
  const { message, statusCode } = response.data
  if (statusCode === 401 && message === '用户验证信息失败') {
    // 1.给提示 用户验证 失败
    Toast.fail('登录信息失败')
    // 2 跳转到登录页面
    router.push('/login')
    // 3 清除 失效 信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
  return response
})
Vue.component('hm-header', HmHeader)
Vue.component('hm-navitem', HmNavItem)
Vue.component('hm-logo', HmLogo)
Vue.use(Vant)
// 自动按需引入组件 (推荐)
// import { Button } from 'vant'
// Vue.use(Button)
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';
Vue.config.productionTip = false
window.vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
