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
export const getBannerList = function(){
    return mockAxios.get('/banner')
}

//mock 模拟请求楼层数据
//url: /mock/floor
//get
export const getFloorList = function(){
    return mockAxios.get('/floor')
}