import request from '@/utils/request'

export function list(query) {
    return request({
        url: '/notice/list',
        method: 'get',
        params: query
    })
}

export function add(data) {
    return request({
        url: '/notice/add',
        method: 'post',
        data
    })
}

export function edit(data) {
    return request({
        url: '/notice/edit',
        method: 'post',
        data
    })
}

export function del(id) {
    return request({
        url: `/notice/del/${id}`,
        method: 'post'
    })
}


