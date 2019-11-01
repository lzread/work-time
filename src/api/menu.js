import request from '@/utils/request'

/**
 * 查询菜单列表
 */
export function getMenus() {
    return request({
        url: '/menu/getMenus',
        method: 'get'
    })
}
/**
 * 新建菜单
 * @param {*} data    菜单模型
 */
export function addMenu(data) {
    return request({
        url: '/menu/addMenu',
        method: 'post',
        data
    })
}
/**
 * 更新菜单
 * @param {*} data    菜单模型
 */
export function updateMenu(data) {
    return request({
        url: '/menu/updateMenu',
        method: 'post',
        data
    })
}
/**
 * 删除菜单
 * @param {*} id    菜单ID
 */
export function deleteMenu(id) {
    return request({
        url: `/menu/deleteMenu/${id}`,
        method: 'get'
    })
}

