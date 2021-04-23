//保存用户相关的数据

import { reqGetCode,reqGetUserInfo,reqUserLogin,reqUserLogout,reqUserRegister } from '@/api'
import {getUserTempId} from '@/utils/userAbout'

const state = {
    //调用 获取用户临时标识函数，将 用户的临时标识 保存到state中，方便操作
    userTempId:getUserTempId(),
    code:'',
    //初始化 token , 自动登录，用户登录后将 token 存储到 localStorage 中，
    //state 初始化时 先向 localStorage 中读取
    token:localStorage.getItem('TOKEN_KEY'),
    //初始化 用户信息
    userInfo:{},
    beforeLoginPath:""
}

const mutations = {
    RECEIVE_CODE(state,code){
        state.code = code
    },
    RECEIVE_TOKEN(state,token){
        state.token = token
    },
    RECEIVE_USERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    RESET_TOKEN(state){
        state.token = ''
        state.userInfo = {}
    },
    RECEIVE_BEFORELOGINPATH(state,beforeLoginPath){
        state.beforeLoginPath = beforeLoginPath
    }
}

const actions = {
    //获取验证码，需要手机号作为参数
    async getCode({commit},phone){
        const result = await reqGetCode(phone)
        if(result.code === 200){
            commit('RECEIVE_CODE',result.data)
            return result.data
        }else{
            return Promise.reject(new Error('失败'))
        }
    },
    //用户注册
    async userRegister({commit},registerInfo){
        const result = await reqUserRegister(registerInfo)
        if(result.code === 200){
            return '成功'
        }else{
            return Promise.reject(new Error('失败'))
        }
    },
    //用户登录,获取 token
    async userLogin({commit},loginInfo){
        const result = await reqUserLogin(loginInfo)
        if(result.code === 200){
            //登录成功，通知 mutation 修改 state 中的 token
            commit('RECEIVE_TOKEN',result.data.token)
            //将 返回的 token 在localStorage中存储一份
            localStorage.setItem('TOKEN_KEY',result.data.token)
            return '成功'
        }else{
            return Promise.reject(new Error('失败'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        const result = await reqGetUserInfo()
        if(result.code === 200){
            //请求成功后通知 mutation 更新 userInfo
            commit('RECEIVE_USERINFO',result.data)
            return '成功'
        }else{
            return Promise.reject(new Error('失败'))
        }
    },
    //清空 token
    async resetToken({commit}){
        //通知 mutation 清空 state 中的 token
        commit('RESET_TOKEN')
        //将 localStorage 中的 token 移除
        localStorage.removeItem('TOKEN_KEY')
    },
    //退出登录
    async userLogout({dispatch}){
        const result = await reqUserLogout()
        if(result.code === 200){
            //请求后 通过dispatch 通知 mutation 清空state中的token和用户信息
            dispatch('resetToken')
            return '成功'
        }else{
            return Promise.reject(new Error('失败'))
        }
    },
    async saveBeforeLoginPath({commit},path){
        commit('RECEIVE_BEFORELOGINPATH',path)
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}