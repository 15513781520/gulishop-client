// 商品详情 Detail 组件的 store 模块

import { reqGoodsDetailInfo } from "@/api"

//初始化 state
const state = {
    goodsDetailInfo:{}
}

//声明 mutations 对象
const mutations = {
    RECEIVE_GOODSDETAILINFO(state,goodsDetailInfo){
        state.goodsDetailInfo = goodsDetailInfo
    }
}

//声明 actions 对象
const actions = {
    async getGoodsDetailInfo({commit},skuId){
        const result = await reqGoodsDetailInfo(skuId)
        if(result.code === 200){
            commit('RECEIVE_GOODSDETAILINFO',result.data)
        }
    }
}

//什么 getters 对象
const getters = {
    categoryView(state){
        return state.goodsDetailInfo.categoryView || {}
    },
    spuSaleAttrList(state){
        return state.goodsDetailInfo.spuSaleAttrList || []
    },
    skuInfo(state){
        return state.goodsDetailInfo.skuInfo || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}