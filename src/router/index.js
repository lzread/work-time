import Vue from 'vue'
import Router from 'vue-router'


import Layout from '@/layout'


Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'SideBar.navItemLoginText',
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    name: '404',
    hidden: true
  },
  {
    path: '', component: Layout, redirect: '/',
    children: [{
      path: '/',
      name: 'SideBar.navItemIndexText',
      component: () => import('@/views/home/index'),
      meta: {}
    }]
  },
]
export const asyncRoutes = [
  {
    path: '/workflow',
    component: Layout,
    name: 'SideBar.navItemWorkFlowText',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: '/workflow/my_flow',
        name: 'SideBar.navItemMyWorkFlowText',
        component: () => import('@/views/workflow/my_flow'),
        meta: {}
      },
      {
        path: '/workflow/flow_manage',
        name: 'SideBar.navItemFlowManageText',
        component: () => import('@/views/workflow/flow_manage'),
        meta: {
          roles: ['admin']
        },
      },
      {
        path: '/workflow/form_store',
        name: 'SideBar.navItemFormStoreText',
        component: () => import('@/views/workflow/form_store'),
        meta: {}
      },
      {
        path: '/workflow/my_form',
        name: 'SideBar.navItemMyFormText',
        component: () => import('@/views/workflow/my_form'),
        meta: {}
      },
      {
        path: '/workflow/form_manage',
        name: 'SideBar.navItemFormManageText',
        component: () => import('@/views/workflow/form_manage'),
        meta: {
          roles: ['admin']
        },
      },

      {
        path: '/workflow/category_manage',
        name: 'SideBar.navItemCategoryManageText',
        component: () => import('@/views/workflow/category_manage'),
        meta: {
          roles: ['admin']
        },
      },

      {
        path: '/workflow/employee_manage',
        name: 'SideBar.navItemEmployeeManageText',
        component: () => import('@/views/workflow/employee_manage'),
        meta: {
          roles: ['admin']
        },
      },
      {
        path: '/workflow/department_manage',
        name: 'SideBar.navItemDepartmentManageText',
        component: () => import('@/views/workflow/department_manage'),
        meta: {
          roles: ['admin']
        },
      },

      {
        path: '/workflow/template_store',
        name: 'SideBar.navItemTemplateStoreText',
        component: () => import('@/views/workflow/template_store'),
        meta: {}
      },
      {
        path: '/workflow/my_template',
        name: 'SideBar.navItemMyTemplateText',
        component: () => import('@/views/workflow/my_template'),
        meta: {}
      },
      {
        path: '/workflow/template_manage',
        name: 'SideBar.navItemTemplateManageText',
        component: () => import('@/views/workflow/template_manage'),
        meta: {
          roles: ['admin']
        },
      },
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'SideBar.navItemSystemManageText',
    meta: {
      
    },
    children: [
      {
        path: '/system/user_settings',
        name: 'SideBar.navItemUserSettingsText',
        component: () => import('@/views/system/user_settings'),
        meta: {}
      },
      {
        path: '/system/user_password',
        name: 'SideBar.navItemPasswordModifyText',
        component: () => import('@/views/system/user_password'),
        meta: {}
      },
      {
        path: '/system/user_manage',
        name: 'SideBar.navItemUserManageText',
        component: () => import('@/views/system/user_manage'),
        meta: {
          roles: ['admin']
        }
      },
      {
        path: '/system/auth_manage',
        name: 'SideBar.navItemAuthManageText',
        component: () => import('@/views/system/auth_manage'),
        meta: {
          roles: ['admin']
        }
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

