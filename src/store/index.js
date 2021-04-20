//引入 vue 核心库
import vue from 'vue'
//引入 vuex
import Vuex from 'vuex'
//引入 home 的 store 对象
import home from './home'
//引入 search 的 store 对象
import search from './search'
//引入 detail 的 store 对象
import detail from './detail'
//引入 shopcart 的 store 对象
import shopcart from './shopcart'
//引入 user 的 store 对象
import user from './user'

//声明使用 vuex
vue.use(Vuex)

//初始化 state
const state = {}

//创建 mutations 对象
const mutations = {}

//创建 actions 对象
const actions = {}

//创建 store 对象
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules:{
        home,
        search,
        detail,
        shopcart,
        user
    }
})

//暴露 store 对象
export default store