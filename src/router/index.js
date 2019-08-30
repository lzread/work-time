import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'

import Home from '@/views/home'

import Disktop from '@/views/disktop/index'

import Auth from '@/views/auth_manage/index'

import Form from '@/views/form_manage/index'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      name: 'home',
      children: [
        {
          path: '/disktop/index',
          name: '我的桌面',
          component: Disktop
        },
        {
          path: '/auth/index',
          name: '权限管理',
          component: Auth
        },
        {
          path: '/form/index',
          name: '表单管理',
          component: Form
        },
      ]
    }

  ]
})
