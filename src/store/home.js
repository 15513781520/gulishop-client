/*
 * @Author: your name
 * @Date: 2021-04-12 18:36:18
 * @LastEditTime: 2021-04-12 18:40:46
 * @LastEditors: Please set LastEditors
 * @Description: home 组件的 store
 * @FilePath: \gulishop-client\src\store\home.js
 */

//引入reqCategoryList接口请求函数
import {reqCategoryList} from '@/api'


//初始化 state
const state = {
    categoryList:[]
}
//创建 mutations 对象
const mutations = {
    RECEIVE_CATEGORYLIST(state,categoryList){
        //将收到的 三级分类 数据保存到state
        state.categoryList = categoryList
    }
}
//创建 actions 对象
const actions = {
    async getCategoryList({commit}){
        //调用接口请求函数发送请求获取数据
        const result = await reqCategoryList()
        commit('RECEIVE_CATEGORYLIST',result.data)
    }
}

export default {
    state,
    mutations,
    actions
}