import request from '@/utils/request'

/**
 * 查询职务列表
 */
export function getJobs() {
    return request({
        url: '/job/getJobs',
        method: 'get'
    })
}
/**
 * 新建职务
 * @param {*} data    职务模型
 */
export function addJob(data) {
    return request({
        url: '/job/addJob',
        method: 'post',
        data
    })
}
/**
 * 更新职务
 * @param {*} data    职务模型
 */
export function updateJob(data) {
    return request({
        url: '/job/updateJob',
        method: 'post',
        data
    })
}
/**
 * 删除职务
 * @param {*} id    职务ID
 */
export function deleteJob(id) {
    return request({
        url: `/job/deleteJob/${id}`,
        method: 'get'
    })
}

