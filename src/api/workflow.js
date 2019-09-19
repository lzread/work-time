import request from '@/utils/request'

/**
 * 流程分类
 */
export function getCategory(query) {
    return request({
        url: '/workflow/getCategory',
        method: 'get',
        params: query
    })
}
/**
 * 创建流程分类
 * @param {*} data 分类数据
 */
export function createCategory(data) {
    console.log(data);
    return request({
        url: '/workflow/createCategory',
        method: 'post',
        data: data
    })
}
/**
 * 编辑流程分类
 * @param {*} id 流程分类ID
 * @param {*} data 分类数据
 */
export function updateCategory(id, data) {
    return request({
        url: '/workflow/updateCategory',
        method: 'post',
        params: { id },
        data: data
    })
}
/**
 * 删除流程分类
 * @param {*} id 流程分类ID
 */
export function deleteCategory(id) {
    return request({
        url: '/workflow/deleteCategory',
        method: 'post',
        params: { id },
    })
}


