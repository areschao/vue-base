import Vue from 'vue'
import Router from 'vue-router'

import AppView from '@/components/app-view'

Vue.use(Router)

const page = name => () => import('@/pages/' + name)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: AppView,
      children: [
        {path: '/', name: '首页', component: page('home')},
        {path: '/user', name: '用户管理', component: page('user/User')},
        {path: '/role', name: '角色管理', component: page('role/Role')},
        {path: '/menu', name: '菜单管理', component: page('menu/Menu')},
        {path: '/dictionary', name: '字典', component: page('dictionary/Dictionary')},
      ],
    },
    {path: '/login', name: 'login', component: page('login')},
    {path: '/401', name: '401', component: page('401')},
    {path: '/500', name: '500', component: page('500')},
    {path: '/404', name: '404', component: page('404')},
    // pages
    {path: '/register', name: 'p-register', component: page('register')},
    {path: '*', redirect: {name: '404'}}
  ]

})
