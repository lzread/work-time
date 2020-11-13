import request from '@/utils/request'
/**
 * 获取角色菜单
 */
export function getMenus() {
    return request({
        url: '/menu/getMenus',
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