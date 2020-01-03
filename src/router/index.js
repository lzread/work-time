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
        title: 'index',
      }
    }]
  },
]

export const asyncRoutes = [
  {
    path: '/workflow',
    component: Layout,
    name: 'workflow',
    children: [
      {
        path: '/workflow/list',
        name: 'workflowList',
        component: () => import('@/views/workflow/list'),
      },
      {
        path: '/workflow/settings/index',
        name: 'workflowSettings',
        component: () => import('@/views/workflow/settings/index'),
        children: [
          {
            path: '/workflow/settings/category',
            name: 'workflowCategory',
            component: () => import('@/views/workflow/settings/category'),
          },
          {
            path: '/workflow/settings/template',
            name: 'workflowTemplate',
            component: () => import('@/views/workflow/settings/template'),
          },
        ],
      },
      {
        path: '/workflow/forms',
        name: 'workflowForms',
        component: () => import('@/views/workflow/forms/index'),
        children: [
          {
            path: '/workflow/forms/create',
            name: 'formCreate',
            component: () => import('@/views/workflow/forms/create'),
          },
          {
            path: '/workflow/forms/list',
            name: 'workflowFormList',
            component: () => import('@/views/workflow/forms/list'),
          },
          {
            path: '/workflow/forms/store',
            name: 'formStore',
            component: () => import('@/views/workflow/forms/store'),
          },
        ]
      },
      {
        path: '/workflow/store',
        name: 'workflowStore',
        component: () => import('@/views/workflow/store'),
      },
    ]
  },

  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: {
      title: 'system',
    },
    children: [
      {
        path: '/system/roles',
        name: 'roles',
        component: () => import('@/views/system/roles'),
      },
      {
        path: '/system/menus',
        name: 'menus',
        component: () => import('@/views/system/menus'),
      },

    ]
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