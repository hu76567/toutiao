/**
 * 封装 axios
 */

import axios from 'axios'
import router from '@/router'
import JsonBig from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 基地址

// 对axios的返回的数据进行自定义处理  json-big 替代=> json
axios.defaults.transformResponse = [
  function (data) {
    // 判断是否为空,不为空则进行数值处理
    const res = data ? JsonBig.parse(data) : {}
    return res
  }
]

// 请求拦截器  接收两个函数
axios.interceptors.request.use(
  function (config) {
    // 在返回之前注入token
    const token = localStorage.getItem('user-token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    // 失败时执行 axios支持promise 失败了直接reject reject会进入axios的catch中
    return Promise.reject(error)
  }
)

// 响应拦截器  接收两个函数
axios.interceptors.response.use(
  function (response) {
    // 成功时执行 第一个参数响应体
    // 对数据解构data.data.=>data.
    return response.data ? response.data : {}
  },
  function (error) {
    // 失败时执行
    // 更换token 粗暴的方式 =>返回登录页,清除token
    if (error.response.status === 401) {
      //   当前token错误的话,清除token
      localStorage.removeItem('user-token')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
export default axios
