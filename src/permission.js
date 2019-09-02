import router from './router'
//import store from './store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import defaultSettings from '@/settings'

//import { getToken } from '@/utils/auth' // 验权



router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  document.title = to.meta.title ? to.meta.title + ' ' + defaultSettings.title : defaultSettings.title
})

router.afterEach(() => {
  NProgress.done()
})
