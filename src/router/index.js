import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index' // 首页
import Record from '@/views/record' // 记录德育事件页面
import Select from '@/views/select' // 添加页面
import Rule from '@/views/rule' // 选择德育细则页面
import Inquire from '@/views/inquire' // 德育查询页面
import Search from '@/views/search' // 搜索页面
import Statistics from '@/views/statistics' // 统计页面
import Revocation from '@/views/revocation' // 可以撤回页面

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/record',
      name: 'Record',
      component: Record
    },
    {
      path: '/select',
      name: 'Select',
      component: Select
    },
    {
      path: '/rule',
      name: 'Rule',
      component: Rule
    },
    {
      path: '/inquire',
      name: 'Inquire',
      component: Inquire
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
    },
    {
      path: '/revocation',
      name: 'Revocation',
      component: Revocation
    }
  ]
})
