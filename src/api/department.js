import request from '@/utils/request'

/**
 * 创建部门
 * @param {*} data 
 */
export function createDepartments(data) {
    return request({
        url: '/departments/create',
        method: 'post',
        data
    })
}
/**
 * 编辑部门
 * @param {*} data 
 */
export function editDepartments(data) {
    return request({
        url: '/departments/edit',
        method: 'post',
        data
    })
}
/**
 * 获取部门树
 * @param {*} id 部门ID
 */
export function getDepartmentsTreeList() {
    return request({
        url: '/departments/getTreeList',
        method: 'get'
    })
}
/**
 * 删除部门
 * @param {*} id 部门ID
 */
export function deleteDepartments(id) {
    return request({
        url: `/departments/delete/${id}`,
        method: 'get'
    })
}