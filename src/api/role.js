import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/routes/getRoutes',
    method: 'get'
  })
}

export function getRoles(id) {
  return request({
    url: '/jobs/roles/' + id,
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
