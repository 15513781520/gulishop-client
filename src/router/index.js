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
//引入 vuex 的 store 对象
import store from '@/store'

//多次点击同一个 push/replace 方法但是参数没有变化会报警告
//我们需要重写 push/replace 方法解决
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (option, resolved, rejected) {
    if (resolved === undefined && rejected === undefined) {
        return originPush.call(this, option).catch(() => {})
    } else {
        return originPush.call(this, option, resolved, rejected)
    }
}
VueRouter.prototype.replace = function (option, resolved, rejected) {
    if (resolved === undefined && rejected === undefined) {
        return originReplace.call(this, option).catch(() => {})
    } else {
        return originReplace.call(this, option, resolved, rejected)
    }
}

//声明使用路由插件
Vue.use(VueRouter)

//创建一个路由器对象
const router = new VueRouter({
    mode: 'history',
    //路由滚动行为配置
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    },
    //注册路由
    routes
})

//为路由器添加 全局前置路由导航守卫
//token校验，检测 token 是否过期，根据 token 获取用户信息
router.beforeEach(async (to,from,next) => {
    //从 state的user模块中 解构 token 和 userInfo
    const {token,userInfo} = store.state.user
    //判断token 是否存在，存在代表用户登录过
    if(token){
        //判断 路由跳转的目的地路径 是不是 /login ，
        if(to.path === '/login'){
            //是的话代表用户重复登录，强制跳转到首页
            next('/')
        }else{
            //目的地路径不是 /login 代表庸碌
            //判断用户信息是否存在，userInfo 初始化是一个空对象，所以不能直接判断
            //使用 Object.keys 将 userInfo 所有的属性组成一个数组，通过判断该数组的长度来判断对象是否有内容
            if(Object.keys(userInfo).length > 0){
                //用户信息存在代表用户登录过且已获取到了用户信息，无条件放行
                next()
            }else{
                //用户信息不存在代表用户登录过但是没有获取到用户信息，需要 根据 token 发送请求获取用户信息
                try {
                    await store.dispatch('getUserInfo')
                    //获取用户信息成功后放行
                    next()
                } catch (error) {
                    //获取用户信息失败后表示 token 已过期
                    //token 过期清空 state 中的 token 和 用户信息，并强制跳转到登录页
                    await store.dispatch('resetToken')
                    next('/login')
                }
            }
        }
    }else{
        //声明一个包含 需要用户登录后才有权限访问的页面路径数组
        const pathArr = ['/trade','/pay','/paysuccess','/center']
        //判断用户要访问的是不是需要权限的
        if(!pathArr.includes(to.path)){
            //如果 token 不存在，代表用户没有登录，且访问的不是需要权限的页面，无条件放行
            next()
        }else{
            //如果访问的是有权限的页面，强制跳转到登录页让用户登录
            store.dispatch('saveBeforeLoginPath',to.path)
            next('/login')
        }
    }
})

//暴露一个路由器对象
export default router