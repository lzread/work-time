

const state = {
  dialogVisible: false,
  currentNode: {},
}

const getters = {
  dialogVisible: state => state.dialogVisible,
  currentNode: state => state.currentNode,
}

const mutations = {
  SET_DIALOG_VISIBLE: (state, dialogVisible) => {
    state.dialogVisible = dialogVisible
  },
  SET_CURRENT_NODE: (state, currentNode) => {
    state.currentNode = currentNode
  },
}

const actions = {

  setDialogVisible({ commit }, dialogVisible) {
    commit('SET_DIALOG_VISIBLE', dialogVisible)
  },

  setCurrentNode({ commit }, currentNode) {
    commit('SET_CURRENT_NODE', currentNode)
  },



}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
