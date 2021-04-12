/*
 * @Author: your name
 * @Date: 2021-04-12 17:49:26
 * @LastEditTime: 2021-04-12 19:12:01
 * @LastEditors: Please set LastEditors
 * @Description: axios配置文件
 * @FilePath: \gulishop-client\src\api\ajax.js
 */
//引入 axios
import axios from 'axios'
//引入 nprogress 进度条工具
import Nprogress from 'nprogress'
//引入 nprogress 样式表
import 'nprogress/nprogress.css'

//使用 axios 创建并配置一个新的 axios 实例对象 
const service = axios.create({
    baseURL:'/api', //配置基础路径,地址不写默认请求本地服务器
    timeout:20000, //配置超时时间
})

//设置请求拦截器，在请求拦截器中开启进度条 请求拦截器失败的回调一般不写，因为没有意义
service.interceptors.request.use((config) => { 
    //开启进度条
    Nprogress.start()
    //将 config 返回
    return config
})

//设置响应拦截器  响应拦截器 成功和失败 的回调都要写
service.interceptors.response.use((response) => {
    //关闭进度条
    Nprogress.done()
    //将请求回来的的数据返回
    return response.data
},(error) => {
    //关闭进度条
    Nprogress.done()
    //统一处理错误
    console.log('请求失败：' + error.message);
    return new Promise(() => {})
})

//对外暴露 service
export default service