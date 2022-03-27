import axios from 'axios'
import { message } from 'antd'

export default function ajax(url,data={},type='GET'){

    return new Promise((resolve,reject) => {
        let promise
        //1.执行异步ajax请求
        if(type==='GET') promise = axios.get(url,{params:data})
        if(type==='POST') promise =  axios.post(url,data)
        //2.如果成功了，调用resolve(value)
        promise.then(response => {
            resolve(response)
        //3.如果失败了，不调用reject(reason)，而是提示信息
        }).catch(error=>{
            message.error('请求出错了：'+error.message)
        })
    })
}