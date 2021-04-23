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
//引入 api 接口函数暴露形成的对象 
import * as API from '@/api'
//引入 element-ui 中的 messageBox 和 message
import {
	MessageBox,
	Message
} from 'element-ui'

//引入 api 测试接口请求函数
// import '@/api'

//注册 MessageBox 组件和 Messages 组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

//全局注册组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
import Banner from '@/components/Banner'
Vue.component(Banner.name, Banner)
import Pagination from '@/components/Pagination'
Vue.component('Pagination', Pagination)

Vue.config.productionTip = false

new Vue({
	beforeCreate() {
		//安装全局事件总线
		Vue.prototype.$bus = this
		//讲 api 对象添加到 Vue 的原型上
		Vue.prototype.$API = API
	},
	render: h => h(App),
	router, //将router 配置到vm
	store //将 store 配置到vm
}).$mount('#app')