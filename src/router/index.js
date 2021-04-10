/*
 * @Author: your name
 * @Date: 2021-04-10 13:03:29
 * @LastEditTime: 2021-04-10 22:05:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulishop-client\src\router\index.js
 */

//引入 vue 核心库
import Vue from 'vue'
//引入 vue-router
import VueRouter from 'vue-router'
//引入路由
import routes from './routes'

//多次点击同一个 push/replace 方法但是参数没有变化会报警告
//我们需要重写 push/replace 方法解决
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function(option,resolved,rejected){
    if(resolved === undefined && rejected === undefined){
        return originPush.call(this,option).catch(() => {})
    }else{
        return originPush.call(this,option,resolved,rejected)
    }
}

//声明使用路由插件
Vue.use(VueRouter)

//创建并暴露一个路由器对象
export default new VueRouter({
    mode:'history',
    //注册路由
    routes
})