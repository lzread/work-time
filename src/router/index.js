import Vue from 'vue'
import Router from 'vue-router'


import Layout from '@/layout'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: () => import('@/views/login/index'),
      hidden: true,
    },

    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404'),
      hidden: true
    },

    {
      path: '', component: Layout, redirect: '/',
      children: [{
        path: '/',
        name: '首页',
        component: () => import('@/views/home/index'),
        meta: {}
      }]
    },
    {
      path: '/workflow',
      component: Layout,
      name: '工作流程',
      meta: {},
      children: [
        {
          path: '/workflow/my_flow',
          name: '我的流程',
          component: () => import('@/views/workflow/my_flow'),
          meta: {}
        },
        {
          path: '/workflow/flow_manage',
          name: '流程管理',
          component: () => import('@/views/workflow/flow_manage'),
          meta: {}
        },
        {
          path: '/workflow/form_store',
          name: '表单商店',
          component: () => import('@/views/workflow/form_store'),
          meta: {}
        },
        {
          path: '/workflow/my_form',
          name: '我的表单',
          component: () => import('@/views/workflow/my_form'),
          meta: {}
        },
        {
          path: '/workflow/form_manage',
          name: '表单管理',
          component: () => import('@/views/workflow/form_manage'),
          meta: {}
        },

        {
          path: '/workflow/category_manage',
          name: '分类管理',
          component: () => import('@/views/workflow/category_manage'),
          meta: {}
        },

        {
          path: '/workflow/employee_manage',
          name: '员工管理',
          component: () => import('@/views/workflow/employee_manage'),
          meta: {}
        },
        {
          path: '/workflow/department_manage',
          name: '部门管理',
          component: () => import('@/views/workflow/department_manage'),
          meta: {}
        },

        {
          path: '/workflow/template_store',
          name: '模板商店',
          component: () => import('@/views/workflow/template_store'),
          meta: {}
        },
        {
          path: '/workflow/my_template',
          name: '我的模板',
          component: () => import('@/views/workflow/my_template'),
          meta: {}
        },
        {
          path: '/workflow/template_manage',
          name: '模板管理',
          component: () => import('@/views/workflow/template_manage'),
          meta: {}
        },
      ]
    },
    {
      path: '/system',
      component: Layout,
      name: '系统管理',
      meta: {},
      children: [
        {
          path: '/system/user_manage',
          name: '用户管理',
          component: () => import('@/views/system/user_manage'),
          meta: {}
        },
        {
          path: '/system/menu_manage',
          name: '菜单管理',
          component: () => import('@/views/system/menu_manage'),
          meta: {}
        },
        {
          path: '/system/auth_manage',
          name: '权限管理',
          component: () => import('@/views/system/auth_manage'),
          meta: {}
        },
      ]
    },








  ]
})
