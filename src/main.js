import Vue from 'vue'
import App from '@/App'
//引入路由器对象
import router from './router'

//全局注册组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
