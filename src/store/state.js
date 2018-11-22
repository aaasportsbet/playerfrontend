// 定义初始状态
const state = {
  scatter: {eos: null},
  pageIndex: 0,
  pageArray: [
    {headerTitle: "我是广告", routename: "home"},
    {headerTitle: "我是个人页面", routename: "Personal"},
  ],
  isSlideBarShow: false,
  isDetailHeader: false,
  detailHeaderNickName:'',
  personalInfo: {
    avatar:'http://p1.wmpic.me/article/2017/03/06/1488780213_usvFXYIl.jpg',
    nickname:'李白',
    uid: 9001
  },
  isAudioPlay:false,
  currentPlayerUrl:'',
  isfollow: false ,
  followcount:101,
  isLove:false,
  lovecount:12
}

export default state
