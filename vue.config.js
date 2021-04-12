/*
 * @Author: your name
 * @Date: 2021-04-10 09:56:47
 * @LastEditTime: 2021-04-12 18:17:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulishop-clientt\vue.config.js
 */
module.exports = {
    lintOnSave:false,
    devServer:{
        //配置代理
        proxy:{
            "/api":{//转发标识
                target:'http://39.98.123.211',//目标服务器地址
                // pathRewrite: { '^/api': '' },//重写路径，将路径的转发标识符去除
            }
        }
    }
}