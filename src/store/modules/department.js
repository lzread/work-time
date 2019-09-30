

const state = {
  dialogVisible: false,
  currentNode: {},        //当前节点
  currentParentNode: {},  //当前父级节点
}

const getters = {
  dialogVisible: state => state.dialogVisible,
  currentNode: state => state.currentNode,
  currentParentNode: state => state.currentParentNode
}

const mutations = {
  SET_DIALOG_VISIBLE: (state, dialogVisible) => {
    state.dialogVisible = dialogVisible
  },
  SET_CURRENT_NODE: (state, currentNode) => {
    state.currentNode = currentNode
  },
  SET_CURRENT_PARENT_NODE: (state, currentParentNode) => {
    state.currentParentNode = currentParentNode
  },
}

const actions = {

  setDialogVisible({ commit }, dialogVisible) {
    commit('SET_DIALOG_VISIBLE', dialogVisible)
  },

  setCurrentNode({ commit }, currentNode) {
    commit('SET_CURRENT_NODE', currentNode)
  },

  setCurrentParentNode({ commit }, currentParentNode) {
    commit('SET_CURRENT_PARENT_NODE', currentParentNode)
  },



}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
