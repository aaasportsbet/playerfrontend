/*路由配置文件*/

// 引入vue及相关插件 引入自定义单文件组件
import Home from 'pages/home/Home'
import Personal from 'pages/personal/Personal'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

// login
import {login} from '../scatter/player';
import store from '../store/index.js';

// 注册插件
Vue.use(VueRouter)
Vue.use(Vuex)

    // 配置routes
    const routes =
    [
      {path: '/home', name: 'home', component: Home}, {
        path: '/personal',
        name: 'personal',
        component: Personal,
        beforeRouteEnter(to, from, next) {
          // 导航守卫，进入该组件的对应路由时调用
          next(vm => {
            // 通过 `vm` 访问组件实例
            let userisLogin = vm.$store.state.isLogin;
            console.log('should not be show');
            if (userisLogin == false) {
              vm.$router.replace('/home');
            }
          });
        }
      },
      {path: '/', component: Home}
    ]

    // 路由配置
    const router = new VueRouter({mode: 'history', routes})

        export default router

router.beforeEach((to, from, next) => {
  console.log('from ', from.path, ' to ', to.path);

  const isLogin = store.getters.isLogin;
  console.log('is login:', isLogin);
  if (isLogin) {
    next();
  } else {
    login()
        .then(identity => {
          console.log('identity', identity);

          const loginstatus = true;
          const accoutname = identity.name;
          console.log(
              'identity.name:', identity.name, 'accoutname:', accoutname)
          store.dispatch('setislogin', loginstatus);
          store.dispatch('setaccountname', accoutname);
          console.log('scatter02 :', store.state.scatter);
          next();
        })
        .catch(error => {
          console.error(error);
          const loginstatus = false;
          const accoutname = '';
          store.dispatch('setislogin', loginstatus);
          store.dispatch('setaccountname', accoutname);
          console.log('scatter03 :', store.state.scatter);
          next();
        });
  }
});
