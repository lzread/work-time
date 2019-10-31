import request from '@/utils/request'

/**
 * 登录
 * @param {*} data 登录信息
 */
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}



/**
 * 获取用户信息
 * @param {*} id 用户ID
 */
export function getInfo(id) {
  return request({
    url: `/user/getInfo/${id}`,
    method: 'get'
  })
}





