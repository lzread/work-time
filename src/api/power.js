import request from '@/utils/request'

/**
 * 查询权限列表
 */
export function getPowers() {
    return request({
        url: '/power/getPowers',
        method: 'get'
    })
}
/**
 * 新建权限
 * @param {*} data    权限模型
 */
export function addPower(data) {
    return request({
        url: '/power/addPower',
        method: 'post',
        data
    })
}

export function addRolePowerBatch(id, data) {
    return request({
        url: `/role_power/addRolePowerBatch/${id}`,
        method: 'post',
        data
    })
}
/**
 * 更新权限
 * @param {*} data    权限模型
 */
export function updatePower(data) {
    return request({
        url: '/power/updatePower',
        method: 'post',
        data
    })
}
/**
 * 删除权限
 * @param {*} id    权限ID
 */
export function deletePower(id) {
    return request({
        url: `/power/deletePower/${id}`,
        method: 'get'
    })
}

