//购物车的 store 模块

import { reqAddOrUpdateShopCart } from "@/api"

const state = {}

const mutations = {}

const actions = {
    //添加或更新购物车的 action 方法
    //async函数返回一个 promise 对象，这个 promise 的状态和结果值 会受到函数内部返回值的影响
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //声明一个变量用来保存请求成功的结果值
        const result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code === 200){
            //如果请求成功，返回 一个非 promise 的基本值
            return '成功'
        }else{
            //如果请求失败返回一个失败的 promise
            return Promise.reject(new Error('失败'))
        }
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}