//购物车的 store 模块

import { reqAddOrUpdateShopCart, reqChangeMoreCheck, reqChangeOneCheck, reqDeleteMoreSku, reqDeleteOneSku, reqShopCartList } from "@/api"

const state = {
    //初始化 购物车列表
    shopCartList:[]
}

const mutations = {
    RECEIVE_SHOPCARTLIST(state,shopCartList){
        state.shopCartList = shopCartList
    }
}

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
    },
    //发送请求获取购物车列表，通知 mutation 更新数据
    async getShopCartList({commit}){
        const result = await reqShopCartList()
        if(result.code === 200){
            commit('RECEIVE_SHOPCARTLIST',result.data)
        }
    },
    //发送请求修改单个商品选中状态
    async changeOneCheck({commit},{skuId,isChecked}){
        const result = await reqChangeOneCheck(skuId,isChecked)
        if(result.code === 200){
            return '成功'
        }else{
            return Promise.reject(new Error('失败'))
        }
    },
    //发送请求批量修改多个商品选中状态 和 全选全不选复选框同步
    async changeMoreCheck({commit},{isChecked,skuIds}){
        const result = await reqChangeMoreCheck(isChecked,skuIds)
        if(result.code === 200){
            return '成功'
        }else{
            return Promise.reject(new Error('失败'))
        }
    },
    //删除单个商品，需要被删除商品的 id 作为参数
    async deleteOneSku({commit},skuId){
        const result = await reqDeleteOneSku(skuId)
        if(result.code === 200){
            return '成功'
        }else{
            return Promise.reject(new Error('失败'))
        }
    },
    //删除多个已选中商品，需要被删除商品们的 id 组成的数组作为参数
    async deleteMoreSku({commit},skuIds){
        const result = await reqDeleteMoreSku(skuIds)
        if(result.code === 200){
            return '成功'
        }else{
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