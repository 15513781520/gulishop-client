//该文件用于封装为 mock 服务的axios

//引入 axios
import axios from 'axios'

//引入 进度条的 js 和 css
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//使用axios.create 创建并配置一个新的 axios
const service = axios.create({
    baseURL:'/mock',
    timeout:20000
})

//配置请求拦截器，请求拦截器中开启进度条
service.interceptors.request.use((config) => {
    nprogress.start()
    return config
})

//配置响应拦截器，响应拦截器中关闭进度条，并将真正的数据返回和统一处理错误
service.interceptors.response.use((response) => {
    nprogress.done()
    return response.data
},(error) => {
    nprogress.done()
    alert('请求失败：',error.message)
    return new Promise(() => {}) //返回一个 pedding 状态的 promise 中断 promise 链条
})


//对外暴露 mock 的axios对象
export default service