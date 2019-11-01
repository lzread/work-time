import request from '@/utils/request'

/**
 * 查询部门列表
 */
export function getDepts() {
    return request({
        url: '/dept/getDepts',
        method: 'get'
    })
}
/**
 * 新建部门
 * @param {*} data    部门模型
 */
export function addDept(data) {
    return request({
        url: '/dept/addDept',
        method: 'post',
        data
    })
}
/**
 * 更新部门
 * @param {*} data    部门模型
 */
export function updateDept(data) {
    return request({
        url: '/dept/updateDept',
        method: 'post',
        data
    })
}
/**
 * 删除部门
 * @param {*} id    部门ID
 */
export function deleteDept(id) {
    return request({
        url: `/dept/deleteDept/${id}`,
        method: 'get'
    })
}

