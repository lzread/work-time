import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'

import Layout from '@/views/home'

import Auth_MyForm from '@/views/auth_manage/index'

import Form_MyForm from '@/views/form_manage/index'
import Form_FormModuleManage from '@/views/form_manage/form_module_manage'

import Flow_MyFlow from '@/views/flow_manage/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '登录',
      component: Login,
      hidden:true,
      meta: {
        title: '登录',
      },
    },

    {
      path: '/home',
      name: '我的桌面',
      component: Layout,
      meta: {
        title: '我的桌面',
        icon: ''
      },
    },







    {
      path: '/auth',
      component: Layout,
      name: '权限管理',
      meta: {

      },
      children: [
        {
          path: '/auth/index',
          name: '我的权限',
          component: Auth_MyForm,
          meta: {

          }
        },
      ]
    },





    {
      path: '/form',
      component: Layout,
      name: '表单管理',
      meta: {

      },
      children: [
        {
          path: '/form/index',
          name: '我的表单',
          component: Form_MyForm,
          meta: {

          },
        },
        {
          path: '/form/form_module_manage',
          name: '模块管理',
          component: Form_FormModuleManage,
          meta: {
          },
        }
      ]
    },




    {
      path: '/flow',
      component: Layout,
      name: '流程管理',
      meta: {

      },
      children: [
        {
          path: '/flow/index',
          name: '我的流程',
          component: Flow_MyFlow,
          meta: {

          },
        }
      ]
    },







  ]
})
