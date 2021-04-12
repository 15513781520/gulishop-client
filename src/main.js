import Vue from 'vue'
import App from '@/App'
//引入路由器对象
import router from '@/router'
//引入 vuex 的 store 对象
import store from '@/store'

//全局注册组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,  //将router 配置到vm
  store   //将 store 配置到vm
}).$mount('#app')
