import Vue from 'vue'
import Router from 'vue-router'


import Layout from '@/layout'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
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
      path: '', component: Layout, redirect: '/home',
      children: [{
        path: '/home',
        name: '首页',
        component: () => import('@/views/home/index'),
        meta: {}
      }]
    },

    {
      path: '', component: Layout, redirect: '/setting',
      children: [{
        path: '/setting',
        name: '设置',
        component: () => import('@/views/setting/index'),
        meta: {}
      }]
    },

    {
      path: '/auth',
      component: Layout,
      name: '权限管理',
      meta: {},
      children: [
        {
          path: '/auth/index',
          name: '我的权限',
          component: () => import('@/views/auth_manage/index'),
          meta: {}
        },
      ]
    },
    {
      path: '/form',
      component: Layout,
      name: '表单管理',
      meta: {},
      children: [
        {
          path: '/form/index',
          name: '我的表单',
          component: () => import('@/views/form_manage/index'),
          meta: {},
        },
        {
          path: '/form/module',
          name: '模块管理',
          component: () => import('@/views/form_manage/form_module_manage'),
          meta: {},
        }
      ]
    },
    {
      path: '/flow',
      component: Layout,
      name: '流程管理',
      meta: {},
      children: [
        {
          path: '/flow/index',
          name: '我的流程',
          component: () => import('@/views/flow_manage/index'),
          meta: {},
        }
      ]
    },







  ]
})
