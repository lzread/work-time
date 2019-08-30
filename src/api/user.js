import request from '@/utils/request'

export function login(query) {
    return request({
        url: '/Service/login',
        method: 'get',
        params: query
    })
}