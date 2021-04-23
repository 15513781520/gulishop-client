import {reqGetAddressList,reqGetTradeInfo} from '@/api'

const state = {
    tradeInfo: {},
    addressList: [],
}

const mutations = {
    RECEIVE_TRADEINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    },
    RECEIVE_ADDRESSLIST(state, addressList) {
        state.addressList = addressList
    }
}

const actions = {
    //调用 api 发送请求获取订单交易信息
    async getTradeInfo({
        commit
    }) {
        const result = await reqGetTradeInfo();
        if (result.code === 200) {
            commit('RECEIVE_TRADEINFO', result.data)
        }
    },
    //调用 api 发送请求获取用户地址列表
    async getAddressList({
        commit
    }) {
        const result = await reqGetAddressList();
        if (result.code === 200) {
            commit('RECEIVE_ADDRESSLIST', result.data)
        }
    },

}

const getters = {
    //讲商品信息列表计算出来方便操作，防止拿到的是一个空数组，用空数组做修正
    detailList(state) {
        return state.tradeInfo.detailArrayList || []
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}