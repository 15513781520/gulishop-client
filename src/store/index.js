/*
 * @Author: your name
 * @Date: 2021-04-12 18:22:49
 * @LastEditTime: 2021-04-12 18:40:12
 * @LastEditors: Please set LastEditors
 * @Description: vuex 核心文件
 * @FilePath: \gulishop-client\src\store\index.js
 */
//引入 vue 核心库
import vue from 'vue'
//引入 vuex
import Vuex from 'vuex'
//引入 home 的 store 对象
import home from './home'
//引入 search 的 store 对象
import search from './search'

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
        search
    }
})

//暴露 store 对象
export default store