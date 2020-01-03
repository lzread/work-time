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
    if(!ele.meta){
      ele.meta = {};
    }
    for (let i = 0; i < serverRouter.length; i++) {
      const element = serverRouter[i]
      if (ele.name === element.name) {

        ele.path = element.path;
        ele.hidden = element.hidden == 'false' ? false : true;
        ele.meta.title = element.title;
        ele.meta.icon = element.icon;
        ele.meta.roles = stringToArray(element.roles);
        ele.meta.permission = matchPermission(serverRouter, element, ele);
      }
    }
    if (ele.children) {
      makePermissionRouters(serverRouter, ele.children)
    }
  })
  return clientAsyncRoutes
}



function matchPermission(serverRouter, element, ele) {
  if (element.type == 0) {
    let res = [];
    serverRouter.map(item => {
      if (element.id == item.parent_id && item.type == 1) {
        res.push({
          name: item.name,
          title: item.title,
          roles: stringToArray(item.roles)
        });
      }
    });
    return res;
  } else {
    return [];
  }
}

function stringToArray(res) {
  if (res) {
    return res.split(",");
  } else {
    return [];
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
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
      let accessedRoutes;
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
