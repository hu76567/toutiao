import request from '@/utils/request'

// 专门处理页面请求

// 可以导出若干个方法
export function getMaterial (params) {
//  请求调用返回结果
  return request({
    url: '/user/images',
    params: params
  })
}
