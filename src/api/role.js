import request from '@/utils/request'

export function getRoles() {
    return request({
        url: '/role/getRoles',
        method: 'get'
    })
}

export function getRoleNameExist(role_code) {
    return request({
        url: `/role/getRoleNameExist/${role_code}`,
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

export function updateRole(data) {
    return request({
        url: '/role/updateRole',
        method: 'post',
        data
    })
}

export function deleteRole(id) {
    return request({
        url: `/role/deleteRole/${id}`,
        method: 'post'
    })
}

export function getRoleMenu(role_id) {
    return request({
        url: `/role/getRoleMenu/${role_id}`,
        method: 'get'
    })
}

export function addRoleMenuBatch(role_id, data) {
    return request({
        url: `/role/addRoleMenuBatch/${role_id}`,
        method: 'post',
        data
    })
}

