import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: '/user/getInfo/' + id,
    method: 'get'
  })
}

export function getUsersListByDepartmentId(department_id, query) {
  return request({
    url: '/user/getUsersListByDepartmentId/' + department_id,
    method: 'get',
    params: query
  })
}

