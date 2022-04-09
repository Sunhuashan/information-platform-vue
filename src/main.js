// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 引入mavon编辑器和对应css
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 引入饿了么ui和对应css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios

Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 登录后访问“/admin”时请求菜单
  if (store.state.username && to.path.startsWith('/admin')) {
    initAdminMenu(router, store)
  }
  // 在每个路由跳转前使用钩子函数判断是否放行
  if (to.meta.requireAuth) {
    if (store.state.username) {
      next()
    } else {
      next({
        path: 'manager_login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

const initAdminMenu = (router, store) => {
  if (store.state.adminMenus.length > 0) {
    return
  }
  axios
    .post('/admin/manager_menu', {
      managerUsername: store.state.username
    })
    .then(resp => {
      if (resp.data.code === 200) {
        var fmtRoutes = formatRoutes(resp.data.data)

        // 添加动态路由
        fmtRoutes.forEach(fmt => {
          router.addRoute(fmt)
        })
        // router.addRoutes(fmtRoutes)
        store.commit('initAdminMenu', fmtRoutes)
      }
    })
}
// 格式化获取的菜单数据
const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.menuPath,
      conponent: resolve => {
        require(['./components/manager/' + route.menuComponent + '.vue'], resolve)
      },
      name: route.menuName,
      nameZh: route.menuNameZh,
      iconCls: route.menuIconClass,
      meta: {
        requireAuth: true
      },
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // element配置
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
