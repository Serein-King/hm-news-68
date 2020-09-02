import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入注册登录组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'
import Demo from '../views/Demo.vue'
import MyFollow from '../views/MyFollow.vue'
import MyComment from '../views/MyComment.vue'
import MyStar from '../views/MyStar.vue'
Vue.use(VueRouter)
// 控制台报错
// // 全局的把push的异常给处理了
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/edit', component: Edit, name: 'edit' },
  { path: '/demo', component: Demo, name: 'demo' },
  { path: '/myfollow', component: MyFollow, name: 'myfollow' },
  { path: '/mycomment', component: MyComment, name: 'mycomment' },
  { path: '/mystar', component: MyStar, name: 'mystar' }
]
const router = new VueRouter({
  routes
})
// 配置全局的导航守卫
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  const authUrls = ['/user', '/edit', '/myfollow', '/mycomment', '/mystar']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
  // 只要路由发生改变，跳转之前执行这个函数
  // console.log(to)
  // console.log(from)
  // if (to.name === 'user') {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     next()
  //   } else {
  //     router.push('/login')
  //   }
  // } else {
  //   next()
  // }
})
router.afterEach()

export default router
