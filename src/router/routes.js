/*
 * @Author: your name
 * @Date: 2021-04-10 21:33:27
 * @LastEditTime: 2021-04-10 22:19:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulishop-client\src\router\routes.js
 */
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Search from '@/pages/Search'


export default [{
        path: '/home',
        component: Home
    },
    {
        path: '/Register',
        component: Register,
        meta:{
            isHidden:true
        }
    },
    {
        path: '/Login',
        component: Login,
        meta:{
            isHidden:true
        }
    },
    {
        name: 'search',
        path: '/Search/:keyword?',
        component: Search,
        props(route) {
            return {
                ...route.params,
                ...route.query
            }
        }
    },
    {
        path: '/',
        redirect: '/home'
    }
]