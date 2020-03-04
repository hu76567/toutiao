// 封装请求工具 request.js
// 对于axios 二次封装

import axios from 'axios'
// 写拦截器和其他操作
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 成功时执行 ,第一个参数会有一个config  config是所有axios的请求信息
  // 返回config 返回的配置会作为请求参数 进行请求
  // 再返回之前注入token
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  debugger
  return config
}, function (error) {
  // 失败时执行 axios支持promise 失败了直接reject reject会进入axios的catch中
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 成功时执行 第一个参数是响应体
  // 对数据解构扒皮data.data.=>data.
  return response.data ? response.data : {}
}, function (error) {
//   失败时执行
  // 当请求状态码 不是200/201/204的时候,表示业务执行错了,处理异常
  // error是错误对象里面包含了错误的状态码和响应信息
  // 401 状态码 表示认证失败 用户身份不对
  return error
})
export default axios
