import Vue from 'vue'
import App from '@/App'
//引入路由器对象
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
