import request from '@/utils/request'

/**
 * 查询角色列表
 */
export function getRoles() {
    return request({
        url: '/role/getRoles',
        method: 'get',
    })
}

/**
 * 新建角色
 * @param {*} data 角色数据模型
 */
export function addRole(data) {
    return request({
        url: '/role/addRole',
        method: 'post',
        data
    })
}

/**
 * 更新角色
 * @param {*} data 角色数据模型
 */
export function updateRole(data) {
    return request({
        url: '/role/updateRole',
        method: 'post',
        data
    })
}

/**
 * 删除角色
 * @param {*} id 角色ID
 */
export function deleteRole(id) {
    return request({
        url: `/role/deleteRole/${id}`,
        method: 'get',
    })
}


