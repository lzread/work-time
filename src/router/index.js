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
    path: '/flow',
    component: Layout,
    name: 'flow',
    meta: {
      roles: ['admin', 'editor'],
      title: 'flow',
    },
    children: [
      {
        path: '/flow/list',
        name: 'flowList',
        component: () => import('@/views/flow/list'),
        meta: {
          roles: ['admin', 'editor'],
          title: 'list',
        }
      },
      {
        path: '/flow/settings/index',
        name: 'flowSettings',
        component: () => import('@/views/flow/settings/index'),
        meta: {
          roles: ['admin', 'editor'],
          title: 'flow settings',
        },
        children: [
          {
            path: '/flow/settings/category',
            name: 'flowCategory',
            component: () => import('@/views/flow/settings/category'),
            meta: {
              roles: ['editor'],
              title: 'flow category',
            },
          },
          {
            path: '/flow/settings/template',
            name: 'flowTemplate',
            component: () => import('@/views/flow/settings/template'),
            meta: {
              roles: ['admin'],
              title: 'flow template',
            }
          },
        ],
      },
      {
        path: '/flow/forms',
        name: 'forms',
        component: () => import('@/views/flow/forms/index'),
        meta: {
          roles: [],
          title: 'forms',

        },
        children: [
          {
            path: '/flow/forms/create',
            name: 'formCreate',
            component: () => import('@/views/flow/forms/create'),
            hidden: true,
            meta: {
              roles: [],
              title: 'form create',
            },
          },
          {
            path: '/flow/forms/list',
            name: 'formList',
            component: () => import('@/views/flow/forms/list'),
            meta: {
              roles: [],
              title: 'list',
            },
          },
          {
            path: '/flow/forms/store',
            name: 'formStore',
            component: () => import('@/views/flow/forms/store'),
            meta: {
              roles: [],
              title: 'store',
            },
          },
        ]
      },
      {
        path: '/flow/store',
        name: 'flowStore',
        component: () => import('@/views/flow/store'),
        meta: {
          roles: [],
          title: 'flow store',
        }
      },
    ]
  },

  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: {
      roles: [],
      title: 'system',
    },
    children: [
      {
        path: '/system/companyInfo',
        name: 'companyInfo',
        component: () => import('@/views/system/companyInfo'),
        meta: {
          roles: [],
          title: 'company info',
        }
      },
      {
        path: '/system/organization',
        name: 'organization',
        component: () => import('@/views/system/organization'),
        meta: {
          roles: [],
          title: 'organization',
        }
      },
      {
        path: '/system/permission',
        name: 'permission',
        component: () => import('@/views/system/permission'),
        meta: {
          roles: [],
          title: 'permission',
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