import api from '@/api/workflow'

const state = {
    category: []
}

const getters = {
    category: state => state.category
}

const actions = {
    getCategory({ commit }, userid) {
        return new Promise((resolve, reject) => {
            api.getCategory({ uid: userid }).then(response => {
                const { data } = response
                commit('GET_CATEGORY', data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })

    },
}

const mutations = {
    GET_CATEGORY: (state, data) => {
        state.category = data;
    },
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}