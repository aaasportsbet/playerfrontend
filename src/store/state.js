// 定义初始状态
const state = {
  scatter: null,
  pageIndex: 0,
  pageArray: [
    {headerTitle: '', routename: 'home'},
    {headerTitle: '', routename: 'Personal'},
  ],
  isSlideBarShow: false,
  isDetailHeader: false,
  detailHeaderNickName: '',
  personalInfo: {
    avatar: 'https://i.postimg.cc/RVjjM4zy/img-logo.png',
    nickname: 'AAASports',
    uid: 9001
  },

  isLogin: false,
  accountName: '',
  cancelLogin:0,

  isAudioPlay: false,
  currentPlayerUrl: '',
  isfollow: false,
  followcount: 101,
  isLove: false,
  lovecount: 12,
  currentLanguage: "en",
}

export default state
