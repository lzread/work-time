import { asyncRoutes, constantRoutes } from '@/router'


/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}



function makePermissionRouters(serverRouter, clientAsyncRoutes) {
  clientAsyncRoutes.map(ele => {
    if (!ele.name || (!ele.meta && !ele.meta.roles)) return
    for (let i = 0; i < serverRouter.length; i++) {
      const element = serverRouter[i]
      if (ele.name === element.name) {
        ele.meta.roles = element.roles
      }
    }
    if (ele.children) {
      makePermissionRouters(serverRouter, ele.children)
    }
  })
  return clientAsyncRoutes
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  console.log(roles);
  routes.forEach(route => {
    const tmp = { ...route }

    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  selectIds: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  },
  SET_SELECT_IDS: (state, selectIds) => {
    state.selectIds = selectIds;
  }
}

const actions = {
  generateRoutes({ commit }, { roles, serverRouter }) {
    return new Promise(resolve => {
      let accessedRoutes

      const routes = makePermissionRouters(serverRouter, asyncRoutes);

      if (roles.includes('admin')) {
        accessedRoutes = routes || []
      } else {
        accessedRoutes = filterAsyncRoutes(routes, roles)
      }



      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  setSelectIds({ commit }, selectIds) {
    commit('SET_SELECT_IDS', selectIds)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
