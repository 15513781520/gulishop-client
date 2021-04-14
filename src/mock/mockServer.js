//该文件用于 mock 模拟接口

//引入 mock
import Mock from 'mockjs'

//引入提前准备好的数据
import banner from './banner.json'
import floor from './floor.json'

//调动 Mock 的 mock 方法，并传入两个参数
//prop ： 1. 接口路径  2. 要返回的数据

//轮播图的 mock 
Mock.mock('/mock/banner',{
    code:200,
    data:banner
})

//楼层的 mock
Mock.mock('/mock/floor',{
    code:200,
    data:floor
})