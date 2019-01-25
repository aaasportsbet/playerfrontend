// 项目入口，配置全局vue
import Vue from 'vue'
import VueRouter from './router/routes.js'
import Store from './store/index.js'
import './store/rem.js'
import './scatter/scatter.js'

import './assets/less/index.less'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ECharts from 'vue-echarts'

Vue.use(ElementUI)
Vue.component('v-chart', ECharts)


new Vue({
	router:VueRouter,
	store:Store,
	template:'<App/>',
	components: {App}
}).$mount('#app')

// 默认进入商品模块
 VueRouter.push({ path: '/home' })


