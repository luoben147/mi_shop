import axios from 'axios'
import qs from 'qs'
//import env from '@/env'

const http = axios.create({
  //baseURL: env.baseURL, //根据环境变量获取不同环境的地址
  baseURL: '/api', //根据环境变量获取不同环境的地址
  timeout: 1000 * 15,
  withCredentials: true
})


/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  let res = response.data;
  if (res.status == 0) {
    return res.data;
  } else if (res.status == 10) {
    window.location.href = '/#/login';
    return Promise.reject(res);
  } else {
    return Promise.reject(res);
  }
}, error => {
  return Promise.reject(error)
})


export default http