import axios from 'axios'
import env from '@/env'

const http = axios.create({
    //baseURL: env.baseURL, //根据环境变量获取不同环境的地址
    baseURL: '/api', //根据环境变量获取不同环境的地址
    timeout: 1000 * 15,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    //config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
    return config
  }, error => {
    return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    let res=response.data;
    if (res.status==0) { //访问成功
     return res.data;
    }else if(res.status==10){//未登录
      window.location.href = '/#/login';
    }else{
        alert(res.msg)
    }
  }, error => {
    return Promise.reject(error)
})


export default http