import request from '@/utils/request'

export function getArticles (params) {
  return request({
    url: '/articles',
    params
  })
}
