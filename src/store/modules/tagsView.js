const state = {
  visitedviews: []
}

const getters = {
  visitedviews: state => state.visitedviews
}

const actions = {
  addVisitedViews({
    commit
  }, view) {
    commit('ADD_VISITED_VIEWS', view)
  },
  delVisitedViews({
    commit,
    state
  }, view) {
    return new Promise((resolve) => {
      commit('DEL_VISITED_VIEWS', view);
      resolve([...state.visitedviews]);
    })
  }
}

const mutations = {
  ADD_VISITED_VIEWS: (state, view) => {
    if (state.visitedviews.some(v => v.path == view.path)) return;
    state.visitedviews.push({
      name: view.name,
      path: view.path
    })
    console.log(state.visitedviews);
  },
  DEL_VISITED_VIEWS: (state, view) => {
    for (let [i, v] of state.visitedviews.entries()) {
      if (v.path == view.path) {
        state.visitedviews.splice(i, 1)
        break
      }
    }
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}