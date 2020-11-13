import Vue from 'vue'
import Router from 'vue-router'


import Layout from '@/components/Layout'


Vue.use(Router)


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'login',
    hidden: true,
    meta: {
      title: 'login',
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    name: '404',
    hidden: true,
    meta: {
      title: '404',
      
    }
  },
  {
    path: '', component: Layout, redirect: '/',
    children: [{
      path: '/',
      name: 'index',
      component: () => import('@/views/home/index'),
      meta: {
        title: '首页',
      }
    }]
  },
]



const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router