import request from '@/utils/request'

/**
 * 登录
 * @param {Object} data 登录信息
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
 * @param {Number} id 用户ID
 */
export function getInfo(id) {
  return request({
    url: `/user/getInfo/${id}`,
    method: 'get'
  })
}

/**
 * 增加用户角色关联
 * @param {Object} data 
 */
export function addUserRole(data) {
  return request({
    url: '/user/addUserRole',
    method: 'post',
    data
  })
}


export function getUsers() {
  return request({
    url: `/user/getUsers`,
    method: 'get'
  })
}

export function getUserByRoleId(role_id) {
  return request({
    url: `/user/getUserByRoleId/${role_id}`,
    method: 'get'
  })
}




