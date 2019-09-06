import request from '@/utils/request'

const api = {
    getCategory(data) {
        return request({
            url: '/workflow/getCategory',
            method: 'get',
            params: { data }
        })
    }

}

export default api;
