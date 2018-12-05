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
    avatar: 'http://q1.qlogo.cn/g?b=qq&k=WLzM03viaN3tUFTEhfN41IQ&s=40&t=1531929600',
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
  lovecount: 12
}

export default state
