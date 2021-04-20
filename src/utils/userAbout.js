//与用户相关的工具函数

//引入 uuid 用来生成唯一的用户临时身份标识
import {v4 as uuidv4} from 'uuid'

export const getUserTempId = () => {
    //从 locationStorage 中读取userTempId
    let userTempId = localStorage.getItem('USERTEMPID_KEY')
    //如果读取到的值为 null，就创建一个新的，并存储到locationStorage中
    if(!userTempId){
        userTempId = uuidv4()
        localStorage.setItem('USERTEMPID_KEY',userTempId)
    }
    //将临时身份标识作为返回值返回
    return userTempId
}