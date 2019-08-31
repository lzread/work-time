import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'

import Home from '@/views/home'
import Disktop from '@/views/disktop/index'

import Auth_MyForm from '@/views/auth_manage/index'

import Form_MyForm from '@/views/form_manage/index'
import Form_FormModuleManage from '@/views/form_manage/form_module_manage'

import Flow_MyFlow from '@/views/flow_manage/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        menuShow: false,
      },
    },



    {
      path: '/disktop/index',
      component: Home,
      name: 'disktop',
      meta: {
        menuShow: true,
        menuName: '我的桌面',
      }
    },




    {
      path: '/auth',
      component: Home,
      name: 'Auth',
      meta: {
        menuShow: true,
        menuName: '权限管理',
      },
      children: [
        {
          path: '/auth/index',
          name: 'myauth',
          component: Auth_MyForm,
          meta: {
            menuShow: true,
            menuName: '我的权限',
          }
        },
      ]
    },





    {
      path: '/form',
      component: Home,
      name: 'Form',
      meta: {
        menuShow: true,
        menuName: '表单管理',
      },
      children: [
        {
          path: '/form/index',
          name: 'myform',
          component: Form_MyForm,
          meta: {
            menuShow: true,
            menuName: '我的表单',
          },
        },
        {
          path: '/form/form_module_manage',
          name: 'form_module_manage',
          component: Form_FormModuleManage,
          meta: {
            menuShow: true,
            menuName: '模块管理',
          },
        }
      ]
    },




    {
      path: '/flow',
      component: Home,
      name: 'Flow',
      meta: {
        menuShow: true,
        menuName: '流程管理',
      },
      children: [
        {
          path: '/flow/index',
          name: 'myflow',
          component: Flow_MyFlow,
          meta: {
            menuShow: true,
            menuName: '我的流程',
          },
        }
      ]
    },







  ]
})
