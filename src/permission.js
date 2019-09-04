import router from './router'
import store from './store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import defaultSettings from '@/settings'

import { getToken } from '@/utils/auth' // 验权

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
      next()
      store.dispatch('user/getInfo')
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
