import Vue from 'vue'
import App from '@/App'
//引入路由器对象
import router from '@/router'
//引入 vuex 的 store 对象
import store from '@/store'
//引入 mock
import '@/mock/mockServer'
//引入 swiper 的css
import 'swiper/css/swiper.min.css'
//引入 api 测试接口请求函数
// import '@/api'

//全局注册组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
import Banner from '@/components/Banner'
Vue.component(Banner.name, Banner)

Vue.config.productionTip = false

new Vue({
	beforeCreate() {
		//安装全局事件总线
		Vue.prototype.$bus = this
	},
	render: h => h(App),
	router, //将router 配置到vm
	store //将 store 配置到vm
}).$mount('#app')