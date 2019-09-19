import Vue from 'vue'
import Router from 'vue-router'


import Layout from '@/layout'


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
export const asyncRoutes = [
  {
    path: '/company',
    component: Layout,
    name: 'company',
    meta: {
      title: 'company',
      roles: ['admin']
    },
    children: [
      {
        path: '/company/department',
        name: 'department',
        component: () => import('@/views/company/department'),
        meta: {
          title: 'department',
        }
      },
      {
        path: '/forms/position',
        name: 'position',
        component: () => import('@/views/company/position'),
        meta: {
          title: 'position',
        }
      },
      {
        path: '/forms/employee',
        name: 'employee',
        component: () => import('@/views/company/employee'),
        meta: {
          title: 'employee',
        }
      },
    ]
  },

  {
    path: '/workflow',
    component: Layout,
    name: 'workflow',
    meta: {
      title: 'workflow',
      roles: ['admin']
    },
    children: [
      {
        path: '/workflow/list',
        name: 'workflowList',
        component: () => import('@/views/workflow/list'),
        meta: {
          title: 'list',
        }
      },
      {
        path: '/workflow/category',
        name: 'workflowCategory',
        component: () => import('@/views/workflow/category'),
        meta: {
          roles: ['admin'],
          title: 'category',
        },
      },
      {
        path: '/workflow/store',
        name: 'workflowStore',
        component: () => import('@/views/workflow/store'),
        meta: {
          title: 'store',
        }
      },
      {
        path: '/workflow/create',
        name: 'workflowCreate',
        component: () => import('@/views/workflow/create'),
        hidden: true,
        meta: {
          title: 'create',
        }
      },
      {
        path: '/workflow/forms',
        name: 'forms',
        component: () => import('@/views/workflow/forms/index'),
        meta: {
          title: 'forms',
        },
        children: [
          {
            path: '/workflow/forms/create',
            name: 'formCreate',
            component: () => import('@/views/workflow/forms/create'),
            hidden: true,
            meta: {
              title: 'create',
            },
          },
          {
            path: '/workflow/forms/list',
            name: 'formList',
            component: () => import('@/views/workflow/forms/list'),
            meta: {
              title: 'list',
            },
          },
          {
            path: '/workflow/forms/store',
            name: 'formStore',
            component: () => import('@/views/workflow/forms/store'),
            meta: {
              title: 'store',
            },
          },
        ]
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
        path: '/system/permission',
        name: 'permission',
        component: () => import('@/views/system/permission'),
        meta: {
          title: 'permission',
        },
      },
      {
        path: '/system/person',
        name: 'person',
        component: () => import('@/views/system/person'),
        meta: {
          title: 'person',
        },
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

