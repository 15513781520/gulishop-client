//保存用户相关的数据

import {getUserTempId} from '@/utils/userAbout'

const state = {
    //调用 获取用户临时标识函数，将 用户的临时标识 保存到state中，方便操作
    userTempId:getUserTempId()
}

const mutations = {}

const actions = {}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}