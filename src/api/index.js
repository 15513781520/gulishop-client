/*
 * @Author: your name
 * @Date: 2021-04-12 18:04:27
 * @LastEditTime: 2021-04-12 18:20:53
 * @LastEditors: Please set LastEditors
 * @Description: 请求接口函数
 * @FilePath: \gulishop-client\src\api\index.js
 */

//引入我们配置后的 axios
import axios from './ajax'
//引入 mock 的 axios
import mockAxios from './mockAjax'

//请求三级分类列表
//url: /product/getBaseCategoryList
//method: get
export const reqCategoryList = () => {
    return axios.get('/product/getBaseCategoryList')
}

//mock 模拟请求轮播图数据
//url: /mock/banner
//get
export const reqBannerList = function () {
    return mockAxios.get('/banner')
}

//mock 模拟请求楼层数据
//url: /mock/floor
//get
export const reqFloorList = function () {
    return mockAxios.get('/floor')
}

// 搜索商品
// url：/api/list
// post
export const reqGoodsListInfo = (searchParams) => {
    return axios({
        method: 'post',
        url: '/list',
        data: searchParams
    })
}

//获取商品详情
//url : /api/item/{ skuId }
// get
export const reqGoodsDetailInfo = (skuId) => {
    return axios({
        method: 'get',
        url: `/item/${ skuId }`
    })
}

//添加 / 更新 购物车
// url：/api/cart/addToCart/{ skuId }/{ skuNum }
// post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return axios({
        method: 'post',
        url: `/cart/addToCart/${ skuId }/${ skuNum }`
    })
}

//获取购物车信息
//url：/api/cart/cartList
// get
export const reqShopCartList = () => {
    return axios({
        method:'get',
        url:'/cart/cartList'
    })
}

//修改单个商品选中状态
//url：/api/cart/checkCart/{skuID}/{isChecked}
// get
export const reqChangeOneCheck = (skuId,isChecked) => {
    return axios({
        method:'get',
        url:`/cart/checkCart/${skuId}/${isChecked}`
    })
}

//批量更改购物车选中状态
//url：/api/cart/batchCheckCart/{isChecked}
//参数；isChecked：params参数    skuIds：body参数
//post
export const reqChangeMoreCheck = (isChecked,skuIds) => {
    return axios({
        method:'post',
        url:`/cart/batchCheckCart/${isChecked}`,
        data:skuIds
    })
}

//删除单个购物车商品
//url：/api/cart/deleteCart/{skuId}
// delete
export const reqDeleteOneSku = (skuId) => {
    return axios({
        method:'delete',
        url:`/cart/deleteCart/${skuId}`
    })
}

//删除多个已选中商品
//url：/api/cart/batchDeleteCart
//参数：skuIds： 要删除的购物车商品的id组成的数组，请求体参数
// delete
export const reqDeleteMoreSku = (skuIds) => {
    return axios({
        method:'delete',
        url:'/cart/batchDeleteCart',
        data:skuIds
    })
}

//获取验证码
//url：/api/user/passport/sendCode/{phone}
// get
export const reqGetCode = (phone) => {
    return axios({
        method:'get',
        url:`/user/passport/sendCode/${phone}`
    })
}

//用户注册
//url：/api/user/passport/register
// post
//参数 ：手机号，密码，验证码
export const reqUserRegister = (registerInfo) => {
    return axios({
        method:'post',
        url:'/user/passport/register',
        data:registerInfo
    })
}

//用户登录,登录成功后返回且只会返回一个 token 用与 用户登录后的身份标识
//url：/api/user/passport/login
// post  参数：手机号、密码 请求体参数
export const reqUserLogin = (loginInfo) => {
    return axios({
        method:'post',
        url:'/user/passport/login',
        data:loginInfo
    })
}

//获取用户信息
//url：/api/user/passport/auth/getUserInfo
// get
export const reqGetUserInfo = () => {
    return axios({
        method:'get',
        url:'/user/passport/auth/getUserInfo'
    })
}

//用户退出登录
//url：/api/user/passport/logout
// get
export const reqUserLogout = () => {
    return axios({
        method:'get',
        url:'/user/passport/logout'
    })
}