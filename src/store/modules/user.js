import * as types from '../mutation-types'
import * as api from '@/api/user.js';
import { Message, Loading } from 'element-ui';
import cookie from "@/vendor/cookie.js";

const state = {
    user_info: "",
}

const getters = {
    
}

const actions = {
    login({ commit }, data) {

        return new Promise((resolve, reject) => {
            api.login(data).then(response => {
                const data = response.data;
                resolve(data);
                console.log(data);
                cookie.set('Token', '00000001000200030004');
                cookie.set('UserInfo',JSON.stringify(data.userInfo));
            }).catch(error => {
                reject(error)
            });
        })

    },
}

const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}