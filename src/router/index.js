import Vue from 'vue'
import Router from 'vue-router'

import Manager from '../components/manager/user/Manager.vue'
import User from '../components/manager/user/User.vue'
import News from '../components/manager/resource/News.vue'
import Announcement from '@/components/manager/resource/Announcement'
import Product from '@/components/manager/resource/Product'
import Publicity from '@/components/manager/resource/Publicity'
import Research from '@/components/manager/resource/Research'
import ManagerIndex from '../components/manager/Index.vue'
import ManagerLogin from '../components/manager/Login.vue'
import CheckNews from '../components/manager/check/News.vue'
import CheckAnno from '../components/manager/check/Announcement.vue'
import CheckPublicity from '../components/manager/check/Publicity.vue'
import CheckProduct from '../components/manager/check/Product.vue'
import CheckResearch from '../components/manager/check/Research.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/home/Login.vue')
    },
    {
      path: '/admin',
      name: 'ManagerIndex',
      component: ManagerIndex,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/admin/user/manager',
          name: 'Manager',
          component: Manager,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/user/user',
          name: 'User',
          component: User,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/resource/announcement',
          name: 'Announcement',
          component: Announcement,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/resource/news',
          name: 'News',
          component: News,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/resource/edit_news',
          name: 'EditNews',
          component: () => import('../components/manager/resource/EditNews.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/resource/product',
          name: 'Product',
          component: Product,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/resource/publicity',
          name: 'Publicity',
          component: Publicity,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/resource/research',
          name: 'Research',
          component: Research,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/check/anno',
          name: 'CheckAnno',
          component: CheckAnno,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/check/news',
          name: 'CheckNews',
          component: CheckNews,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/check/product',
          name: 'CheckProduct',
          component: CheckProduct,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/check/publicity',
          name: 'CheckPublicity',
          component: CheckPublicity,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/check/research',
          name: 'CheckResearch',
          component: CheckResearch,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/manager_login',
      name: 'ManagerLogin',
      component: ManagerLogin
    }
  ]
})
