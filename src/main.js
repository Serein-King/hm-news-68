import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
// 全局的把 vant组件都导入好了
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.use(Vant)
// 自动按需引入组件 (推荐)
// import { Button } from 'vant'
// Vue.use(Button)
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
