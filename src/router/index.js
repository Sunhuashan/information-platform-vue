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
      path: '/test',
      name: 'Test',
      component: () => import('../components/manager/test.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/home/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/home/Login.vue')
    },
    {
      path: '',
      name: 'Home',
      component: () => import('../components/home/Home.vue'),
      children: [
        {
          path: '/research/result',
          name: 'ResearchRes',
          component: () => import('../components/home/ResearchRes.vue')
        },
        {
          path: '/announcement/result',
          name: 'AnnoRes',
          component: () => import('../components/home/AnnoRes.vue')
        },
        {
          path: '/news/result',
          name: 'NewsRes',
          component: () => import('../components/home/NewsRes.vue')
        },
        {
          path: '/empty',
          name: 'Empty',
          component: () => import('../components/common/Empty.vue')
        },
        {
          path: '/news/detail',
          name: 'NewsDetail',
          component: () => import('../components/home/NewsDetail.vue')
        },
        {
          path: '/index',
          name: 'Index',
          component: () => import('../components/home/Index.vue')
        },
        {
          path: '/news',
          name: 'News',
          component: () => import('../components/home/News.vue')
        },
        {
          path: '/research',
          name: 'Research',
          component: () => import('../components/home/Research.vue')
        },
        {
          path: '/product',
          name: 'Product',
          component: () => import('../components/home/Product.vue')
        },
        {
          path: '/announcement',
          name: 'Anno',
          component: () => import('../components/home/Anno.vue')
        },
        {
          path: '/forum',
          name: 'Forum',
          component: () => import('../components/home/Forum.vue'),
          children: [
            {
              path: '/forum',
              name: 'Posts',
              component: () => import('../components/home/Posts.vue')
            },
            {
              path: '/forum/detail',
              name: 'PostsDetail',
              component: () => import('../components/home/PostsDetail.vue')
            },
            {
              path: '/forum/release',
              name: 'ReleasePost',
              component: () => import('../components/home/ReleasePost.vue')
            },
            {
              path: '/forum/info',
              name: 'Info',
              component: () => import('../components/home/Info.vue')
            }
          ]
        }
      ]
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
