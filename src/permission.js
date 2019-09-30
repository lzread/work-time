import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import defaultSettings from '@/settings'
import { getToken } from '@/utils/auth'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = to.meta.title ? to.meta.title + ' ' + defaultSettings.title : defaultSettings.title
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        store.dispatch('user/getInfo').then(res => {
          next()
          const roles = [res.jobId];
          store.dispatch('permission/generateRoutes', roles).then(accessRoutes => {
            //router.addRoutes(accessRoutes)
            console.log(accessRoutes);
            next({ ...to, replace: true })
          })
        }).catch((error) => {
          console.log(error);
          store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        })
      }

    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
