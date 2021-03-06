/*
 * @Author: your name
 * @Date: 2021-04-10 21:33:27
 * @LastEditTime: 2021-04-11 22:50:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulishop-client\src\router\routes.js
 */
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'


export default [{
        path: '/home',
        component: Home
    },
    {
        path: '/register',
        component: Register,
        meta:{
            isHidden:true
        }
    },
    {
        path: '/login',
        component: Login,
        meta:{
            isHidden:true
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        props(route) {
            return {
                ...route.params,
                ...route.query
            }
        }
    },
    {
        path:'/detail/:skuId',
        component:Detail
    },
    {
        path:'/addcartsuccess',
        component:AddCartSuccess
    },
    {
        path:'/shopcart',
        component:ShopCart
    },
    {
        path:'/trade',
        component:Trade
    },
    {
        path:'/pay',
        component:Pay
    },
    {
        path:'/paysuccess',
        component:PaySuccess
    },
    {
        path:'/center',
        component:Center
    },
    {
        path: '/',
        redirect: '/home'
    }
]