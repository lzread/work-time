
const state = {
    dialogVisible: false,
}

const getters = {
    dialogVisible: state => state.dialogVisible,
}

const mutations = {
    SET_DIALOG_VISIBLE: (state, dialogVisible) => {
        state.dialogVisible = dialogVisible
    },
}

const actions = {
    setDialogVisible({ commit }, dialogVisible) {
        commit('SET_DIALOG_VISIBLE', dialogVisible)
    },
}




export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}