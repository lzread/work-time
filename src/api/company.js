import request from '@/utils/request'

/**
 * 部门列表
 */
export function getDepartment(query) {
    return request({
        url: '/workflow/getDepartment',
        method: 'get',
        params: query
    })
}
/**
 * 职务列表
 */
export function getPosition(query) {
    return request({
        url: '/workflow/getPosition',
        method: 'get',
        params: query
    })
}
/**
 * 员工列表
 */
export function getEmployee(query) {
    return request({
        url: '/workflow/getEmployee',
        method: 'get',
        params: query
    })
}


