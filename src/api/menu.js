import request from '@/utils/request'
/**
 * 获取角色菜单
 * @param {Number} user_id 用户ID
 */
export function getMenus(user_id) {
    return request({
        url: `/menu/getMenus/${user_id}`,
        method: 'get'
    })
}
/**
 * 获取所有菜单
 */
export function getAllMenus() {
    return request({
        url: '/menu/getAllMenus',
        method: 'get'
    })
}