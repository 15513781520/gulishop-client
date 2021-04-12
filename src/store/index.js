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
//引入 home 的store 对象
import home from './home'

//声明使用 vuex
vue.use(Vuex)

//创建 store 对象
const store = new Vuex.Store({
    modules:{
        home
    }
})

//暴露 store 对象
export default store