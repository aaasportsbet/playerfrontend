/*路由配置文件*/

// 引入vue及相关插件
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

// 引入自定义单文件组件
import Home from 'pages/home/Home'
import Personal from 'pages/personal/Personal'


// 注册插件
Vue.use(VueRouter)
Vue.use(Vuex)

// 配置routes
const routes = [
  {
    path: '/home',
    name: 'home',
    component:Home
  },
  {
    path: '/personal',
    name: 'personal',
    component:Personal
  },
  {
    path: '/',
    component:Home
  }
]

// 路由配置
 const router = new VueRouter({
	mode:"history",
	routes
})

 export default router
