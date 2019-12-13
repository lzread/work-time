import request from '@/utils/request'

/**
 * 获取当前菜单节点权限列表
 * @param {Number} menu_id 菜单ID
 */
export function getPowers(menu_id) {
    return request({
        url: `/power/getPowers/${menu_id}`,
        method: 'get'
    })
}
/**
 * 获取当前菜单节点已分配的权限列表
 * @param {Number} role_id 角色ID
 * @param {Number} menu_id 菜单ID
 */
export function getAssignPowers(data) {
    return request({
        url: '/power/getAssignPowers',
        method: 'get',
        params: data
    })
}
/**
 * 增加角色和权限关联
 * @param {Number} menu_id 菜单ID
 * @param {Object} data 
 */
export function addRolePower(menu_id, data) {
    return request({
        url: `/role_power/addRolePower/${menu_id}`,
        method: 'post',
        data
    })
}
