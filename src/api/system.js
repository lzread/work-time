import request from '@/utils/request'

/**
 * 部门列表
 */
export function getDepartment(query) {
    return request({
        url: '/system/getDepartment',
        method: 'get',
        params: query
    })
}
/**
 * 职务列表
 */
export function getPosition(query) {
    return request({
        url: '/system/getPosition',
        method: 'get',
        params: query
    })
}
/**
 * 员工列表
 */
export function getEmployeeByDepartmentId(query) {
    return request({
        url: '/system/getEmployeeByDepartmentId',
        method: 'get',
        params: query
    })
}


