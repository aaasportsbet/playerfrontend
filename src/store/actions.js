// 分发actions，页面的action同意dispatch到此进行逻辑处理

import * as types from './mutation-types.js'

// 首页各个模块跳转
export const  updatePage = ({commit}) => {
  commit(types.UPDATE_NEXT_PAGE)
}
//跳转home页
export const  goHomePage = ({commit}) => {
  commit(types.GO_HOME_PAGE)
}

//设置EOS值
export const  setScatterEOS = ({commit}, eos) => {
    commit(types.SET_SCATTER_EOS, eos)
}
//login
export const  setislogin = ({commit}, lstatus) => {
  commit(types.SET_ISLOGIN, lstatus)
}

//cancellogin
export const  setcancelLogin = ({commit}, cancellstatus) => {
  commit(types.SET_CANCELLOGIN , cancellstatus)
}

export const  setaccountname = ({commit}, acname) => {
  commit(types.SET_ACCOUNTNAME, acname)
}

//end

// 点击用户进入个人页面
export const  goPersonalPages = ({commit},payload) => {
  if(payload.userId){
    commit(types.GO_PERSONAL_PAGES,{
      userId:payload.userId
    })
  }
}

// 切换关注用户
export const  toggleFollowPerson = ({commit}) => {
  commit(types.TOGGLE_FOLLOW_PERSON)
}

// 切换侧边栏显示
export const  toggleSlideBar = ({commit}) => {
  commit(types.TOGGLE_SLIDE_BAR)
}

// 切换header
export const  toggleheader = ({commit},payload) => {
  if(payload){
    commit(types.ADD_DETAIL_HEADER_NICKNAME,{
      nickname:payload.nickname
    })
  } else {
    commit(types.DELEATE_DETAIL_HEADER_NICKNAME)
  }
  commit(types.TOGGLE_HEADER)
}

// 切换音乐播放
export const  togglePlayerStatus = ({commit},payload) => {
  if (payload.currentPlayerUrl) {
    commit(types.TOGGLE_PLAYER_STATUS,{
      currentPlayerUrl:payload.currentPlayerUrl
    })
  }
}

// 点击列表项进入详情页面
export const  goDetailPage = ({commit},payload) => {
  if(payload.id){
    commit(types.GO_DETAIL_PAGES,{
      id:payload.id
    })
  }
}

// 点击列表项进入详情页面
export const  toggleLove = ({commit}) => {
  commit(types.TOGGLE_LOVE)
}

// 切换语言
export const changeLanguage = ({commit}, lan) => {
  commit(types.CHANGE_LANGUAGE, lan);
}
