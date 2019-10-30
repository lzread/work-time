import request from '@/utils/request'

export function getServerRouter() {
  return request({
    url: '/roles_menus/getMenus',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/role/getRoles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role/addRole',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/updateRole/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/deleteRole/${id}`,
    method: 'delete'
  })
}
