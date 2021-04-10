/*
 * @Author: your name
 * @Date: 2021-04-10 13:03:29
 * @LastEditTime: 2021-04-10 13:59:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulishop-client\src\router\index.js
 */

//引入 vue 核心库
import Vue from 'vue'
//引入 vue-router
import VueRouter from 'vue-router'

//引入路由组件
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Search from '@/pages/Search'

//声明使用路由插件
Vue.use(VueRouter)

//创建并暴露一个路由器对象
export default new VueRouter({
    mode:'history',
    //注册路由
    routes:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/Register',
            component:Register
        },
        {
            path:'/Login',
            component:Login
        },
        {
            path:'/Search',
            component:Search
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
})