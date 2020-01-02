import Vue from 'vue'
import Router from 'vue-router'


import Layout from '@/components/Layout'


Vue.use(Router)

/*
  hidden: true                  //当设置 true 的时候该路由不会再侧边栏出现 (默认 false)
  name: 'router-name'           //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
  meta: {
    roles: ['admin', 'editor']  //设置该路由进入的权限，支持多个权限叠加
    title: 'title'              //设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'            //设置该路由的图标
    noCache: true               //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  }
*/

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
    meta: {
      title: 'workflow',
    },
    children: [
      {
        path: '/workflow/list',
        name: 'workflowList',
        component: () => import('@/views/workflow/list'),
        meta: {
          title: 'list'
        }
      },
      {
        path: '/workflow/settings/index',
        name: 'workflowSettings',
        component: () => import('@/views/workflow/settings/index'),
        meta: {
          title: 'workflow settings',
        },
        children: [
          {
            path: '/workflow/settings/category',
            name: 'workflowCategory',
            component: () => import('@/views/workflow/settings/category'),
            meta: {
              title: 'workflow category',
            },
          },
          {
            path: '/workflow/settings/template',
            name: 'workflowTemplate',
            component: () => import('@/views/workflow/settings/template'),
            meta: {
              title: 'workflow template',
            }
          },
        ],
      },
      {
        path: '/workflow/forms',
        name: 'workflowForms',
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
              title: 'form create',
            },
          },
          {
            path: '/workflow/forms/list',
            name: 'workflowFormList',
            component: () => import('@/views/workflow/forms/list'),
            meta: {
              title: 'form list',
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
      {
        path: '/workflow/store',
        name: 'workflowStore',
        component: () => import('@/views/workflow/store'),
        meta: {
          title: 'workflow store',
        }
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
        meta: {
          title: 'roles',
        }
      },
      {
        path: '/system/menus',
        name: 'menus',
        component: () => import('@/views/system/menus'),
        meta: {
          title: 'menus',
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