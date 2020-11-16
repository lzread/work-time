import {
  constantRoutes
} from '@/router'
import routerComponentsMap from '@/router/map.js'

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

function makePermissionRouters(serverRouter) {
  let obj = [];
  let map = [];
  serverRouter.forEach(item => {
    map[item.id] = item;
  });
  serverRouter.forEach(item => {
    if (routerComponentsMap[item.name]) {
      item.component = routerComponentsMap[item.name];
      let parent = map[item.parent_id];
      item.meta = {};
      item.meta.roles = stringToArray(item.roles);
      item.meta.permission = matchPermission(serverRouter, item);
      item.meta.title = item.title;
      item.hidden = item.hidden == 'false' ? false : true;
      delete item.roles;
      delete item.title;

      if (parent) {
        if (!Array.isArray(parent.children)) {
          parent.children = [];
        }
        parent.children.push(item);
      } else {
        obj.push(item);
      }
    }
  });
  return obj;
}

function matchPermission(serverRouter, element) {
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

export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = {
      ...route
    }

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
  /**
   * 生成路由
   * @param { Array } roles 角色
   * @param { Array } serverRouter 菜单
   */
  generateRoutes({ commit }, { roles, serverRouter }) {
    return new Promise(resolve => {

      console.log(roles)
      console.log(serverRouter)

      let accessedRoutes;

      const routes = makePermissionRouters(serverRouter);

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