import axios from 'axios'
import qs from 'qs'
//import env from '@/env'

const http = axios.create({
  //baseURL: env.baseURL, //根据环境变量获取不同环境的地址
  baseURL: '/mi', //根据环境变量获取不同环境的地址
  timeout: 1000 * 15,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  //config.headers.Authorization = this.$cookies.get('mi-session-id'); // 请求头带上token
  if (config.method === 'post' || config.method === 'put') {
    config.data = qs.stringify({
      ...config.data
    })
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  let { meta, data } = response.data;
  if (meta.status !== 200) { 
    if (meta.status === 403) { //没登录
      if (location.hash != '#/index') {
        alert("去登录！")
        window.location.href = '/#/login'
      }
    } else {
      //Vue.prototype.$message.error(meta.msg)
      alert(meta.msg)
      return Promise.reject(meta);
    }
    return Promise.reject(meta);
  }
  return data;
}, error => {
  return Promise.reject(error)
})


export default http