import Vue from 'vue'
import 'babel-polyfill' //使低版本浏览器也支持es6语法
import ElementUI from 'element-ui'
import Axios from 'axios'
import NProgress from 'nprogress' //加载进度条 bower install --save nprogress  npm install --save nprogress
import api from './api/index.js'

import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css' //导入eleumentui的 css库
import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css' //导入图标库
import '@/assets/css/main.css' //导入全局css
import '@/assets/css/scrollbar.css' //导入滚动条css
import '@/assets/css/reset.css' //重写一些样式
import 'nprogress/nprogress.css' //进度条样式
import 'animate.css' //动画

import  VueQuillEditor from 'vue-quill-editor'//富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

/**
 * 以下是作者自己写的标签库
 */
import DropdownPlugin from './m/dropdown'
import NavbarPlugin from './m/navbar'
import * as Config from './utils/config'

Vue.use(ElementUI)
Vue.use(DropdownPlugin)
Vue.use(NavbarPlugin)
Vue.use(VueQuillEditor)
//路由白名单
let whiteList = ['/login', '/401']
//每次路由之前都会走此方法，用来判断是否存在用户登录
router.beforeEach((to, from, next) => {
  NProgress.start()
  let user = sessionStorage.getItem("currentUser")
  let menus = sessionStorage.getItem("menus")

  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    if (!user && to.name !== '404') {
      next({path: "/401"})
      NProgress.done()
    } else {
      // console.log(menus.toString())
      // for (let i = 0; i < JSON.parse(menus).length; i++) {
      //   for (let j = 0; j <JSON.parse(menus[i].submenu).length ; j++) {
      //     if (menus[i].submenu[j].name === to.name) {
      //       next()
      //       break
      //     } else {
      //       continue
      //     }
      //   }
      //   app.$notify.error({
      //     title: '系统错误',
      //     message: '权限不足 '
      //   })
      //   next({path: "/"})
      //   NProgress.done()
      next()
      }
    }
})

router.afterEach(transition => {
  NProgress.done()
})

window.APP_INFO = process.env.APP_INFO

Axios.defaults.withCredentials = true; // 每次请求携带cookie信息 ：目的为了保持session一致
Vue.prototype.$api = api
Vue.prototype.$config = Config
Vue.config.productionTip = false //阻止vue在启东时产生提示

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

window.app = app

