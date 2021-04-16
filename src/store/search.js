// search 组件的 store 模块

import { reqGoodsListInfo } from "@/api"

//声明一个 state 对象用来保存数据
const state = {
    //商品列表详情，默认是一个 空对象
    goodsListInfo:{}
}

//声明一个 mutations 对象用来保存直接修改 state 中数据的方法
const mutations = {
    //直接修改 商品列表详情 的方法
    RECEIVE_GOODSLISTINFO(state,goodsListInfo){
        state.goodsListInfo = goodsListInfo
    }
}

//声明一个 actions 对象用来保存提交修改到 mutations 的方法
const actions = {
    //提交修改商品列表详情的方法
    async getGoodsListInfo({commit},searchParams){
        const result = await reqGoodsListInfo(searchParams)
        if(result.code === 200){
            commit('RECEIVE_GOODSLISTINFO',result.data)
        }
    }
}

// 声明一个 getters 对象用来简化数据操作
// 为啥要或空数组，因为我们要保证vue当中获取到的不是undefined,如果是undefined，很有可能报错
const getters = {
    goodsList(state){
        return state.goodsListInfo.goodsList || []
    },
    attrsList(state){
        return state.goodsListInfo.attrsList || []
    },
    trademarkList(state){
        return state.goodsListInfo.trademarkList || []
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}