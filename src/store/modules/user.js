import { login, getInfo } from '@/api/user'
import { getMenus } from '@/api/menu'
import router, { resetRouter } from '@/router'
import Cookies from 'js-cookie'

const state = {
  id: Cookies.get('id'),
  token: Cookies.get('token'),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  serverRouter: [],
  powers: []
}

const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_SERVER_ROUTER: (state, serverRouter) => {
    state.serverRouter = serverRouter
  },
  SET_POWERS: (state, powers) => {
    state.powers = powers
  },
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_ID', data.id)
        commit('SET_TOKEN', data.token)

        Cookies.set('token', data.token)
        Cookies.set('id', data.id)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {

      getInfo(state.id).then(response => {
        const { data } = response

        if (!data) {
          reject('验证失败，请重新登录。')
        }

        const { roles, powers, name, avatar, introduction } = data
        console.log(roles);
        if (!roles || roles.length <= 0) {
          reject('您还未必分配角色，请联系管理员!')
        }


        commit('SET_ROLES', roles)
        commit('SET_POWERS', powers)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取菜单
  getMenus({ commit }) {
    return new Promise((resolve, reject) => {
      getMenus().then(response => {
        const { data } = response
        console.log(data);
        commit('SET_SERVER_ROUTER', data);
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户退出登录
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      Cookies.remove('token')
      Cookies.remove('id')
      resetRouter()
      resolve()
    })
  },

  // 删除 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      Cookies.remove('token')
      Cookies.remove('id')
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      Cookies.set('token', token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
