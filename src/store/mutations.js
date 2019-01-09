import VueRouter from '../router/routes.js'

import * as types from './mutation-types.js'
import { TabbarItem } from 'vant';
import { satisfies } from 'semver';

export default {
  [types.UPDATE_NEXT_PAGE](state) {
    // if (state.pageIndex < state.pageArray.length - 1) {
    //   state.pageIndex++
    // } else {
    //   state.pageIndex = 0
    // }
    // VueRouter.push({path: '/' + state.pageArray[(state.pageIndex + 1) % 2].routename})
    // console.info( state.pageIndex )
    state.pageIndex = (state.pageIndex + 1) % 2
    VueRouter.push({path: '/' + state.pageArray[state.pageIndex].routename})
  },

  [types.GO_HOME_PAGE](state) {
    state.pageIndex = 0
    VueRouter.push({name: 'home'})
    // name: 'personal', params: { userId: userId }
  },

  [types.GO_PERSONAL_PAGES](state, {userId}) {
    state.pageIndex = 1
    VueRouter.push({name: 'personal', params: {userId: userId}})
    // name: 'personal', params: { userId: userId }
  },

  [types.TOGGLE_FOLLOW_PERSON](state) {
    // 正常的逻辑应该是将是否关注提交到数据库，更改数据库的字段并返回前端，现在是mock环境，只能在state中加了一个临时变量
    if (state.isfollow) {
      state.followcount--
    } else {
      state.followcount++
    }
    state.isfollow = !state.isfollow
  },

  [types.TOGGLE_SLIDE_BAR](state) {
    state.isSlideBarShow = !state.isSlideBarShow
  },
  // EOS
  [types.SET_SCATTER_EOS](state, eos) {
    state.scatter = eos;
  },

  [types.TOGGLE_HEADER](state) {
    state.isDetailHeader = !state.isDetailHeader
  },

  [types.ADD_DETAIL_HEADER_NICKNAME](state, {nickname}) {
    state.detailHeaderNickName = nickname
  },
  // login
  [types.SET_ISLOGIN](state, loginstatus) {
    state.isLogin = loginstatus
  },
  // scattercancellogin
  [types.SET_CANCELLOGIN](state, cancelloginstatus) {
    state.cancelLogin = cancelloginstatus
  },
  [types.SET_ACCOUNTNAME](state, accountname) {
    state.accountName = accountname
  },
  // end
  [types.DELEATE_DETAIL_HEADER_NICKNAME](state) {
    state.detailHeaderNickName = ''
  },

  [types.TOGGLE_PLAYER_STATUS](state, {currentPlayerUrl}) {
    if (!state.isAudioPlay) {
      state.currentPlayerUrl = currentPlayerUrl
      state.isAudioPlay = true
    } else {
      state.currentPlayerUrl = currentPlayerUrl
    }
  },

  [types.GO_DETAIL_PAGES](state, {id}) {
    VueRouter.push({name: 'detail', params: {id: id}})
  },

  [types.TOGGLE_LOVE](state) {
    if (state.isLove) {
      state.lovecount--
    } else {
      state.lovecount++
    }
    state.isLove = !state.isLove
  },

  [types.CHANGE_LANGUAGE](state, lan) {
    if ( lan == "en" || lan == "zhcn" ) {
      state.currentLanguage = lan;
    } else {
      console.info( "error language of " + lan );
    }
  },

  [types.ROUTER_REFRESHING](state, refresh) {
    state.routerRefreshing = refresh
  }
}
