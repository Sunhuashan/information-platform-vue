import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // state 中存放数据
  state: {
    general_username: window.localStorage.getItem('general_username') == null ? '' : JSON.parse(window.localStorage.getItem('general_username' || '[]')),
    username: window.localStorage.getItem('username') == null ? '' : JSON.parse(window.localStorage.getItem('username' || '[]')),
    adminMenus: window.localStorage.getItem('adminMenus') == null ? '' : JSON.parse(window.localStorage.getItem('adminMenus'))
    // adminMenus: []
  },
  // mutations 中存放对数据的操作
  mutations: {
    initAdminMenu (state, menus) {
      state.adminMenus = menus
      window.localStorage.setItem('adminMenus', JSON.stringify(menus))
    },
    login (state, data) {
      state.username = data
      window.localStorage.setItem('username', JSON.stringify(data))
    },
    logout (state) {
      // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
      state.username = ''
      window.localStorage.removeItem('username')
      state.adminMenus = []
      window.localStorage.removeItem('adminMenus')
    },
    general_login (state, data) {
      state.general_username = data
      window.localStorage.setItem('general_username', JSON.stringify(data))
    },
    general_logout (state) {
      state.general_username = ''
      window.localStorage.removeItem('general_username')
    }
  }
})
