import request from '@/utils/request'

/**
 * 根据角色ID查询关联的菜单ID列表
 * @param {*} role_id    角色ID
 */
export function getRoleIdByMenuId(role_id) {
    return request({
        url: `/role_menu/getRoleIdByMenuId/${role_id}`,
        method: 'get'
    })
}

/**
 * 新建 '角色' 关联 '菜单'
 * @param {*} id    角色ID
 * @param {*} data  角色ID 菜单ID
 */
export function addRoleMenu(id, data) {
    return request({
        url: `/role_menu/addRoleMenu/${id}`,
        method: 'post',
        data
    })
}
