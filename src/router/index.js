import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入注册登录组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' }
]
const router = new VueRouter({
  routes
})
export default router
