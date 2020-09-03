// 处理axios 请求
import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'
// 把axios挂在到vue 的原型上
Vue.prototype.$axios = axios
// g给axios 配置默认的baseUrl,基准地址
const URL = 'http://localhost:3000'
axios.defaults.baseURL = URL
Vue.prototype.$base = URL
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

Vue.prototype.$url = function (url) {
  if (url.startsWith('http')) {
    // 网络图片
    return url
  } else {
    return URL + url
  }
}
