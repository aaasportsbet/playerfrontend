<template lang="html">
  <div class="slidebar" v-if="isSlideBarShow">
    <el-row class="container">
      <el-col :span="14" class="left" @click="toggleSlideBar">
        <div class="useravatar">
          <div class="avatar">
            <img :src="personalInfo.avatar" alt="" @error="setErrorAvatar" ref="sliderbaravatar">
          </div>
          <div class="name">
            {{personalInfo.nickname}}
          </div>
        </div>
        <el-menu class="el-menu-vertical-demo" @select="handleSelect">
          <el-menu-item index="1"><i class="iconfont">&#xe735;</i><div class="navtext">{{ l("Me") }}</div></el-menu-item>
          <el-menu-item index="2"><i class="iconfont">&#xe726;</i><div class="navtext">{{ l("NBA") }}</div></el-menu-item>
          <el-menu-item index="3"><i class="iconfont">&#xe6b6;</i><div class="navtext">{{ l("World Cup") }}</div></el-menu-item>
          <el-menu-item index="4"><i class="iconfont">&#xe726;</i><div class="navtext">{{ l("CBA") }}</div></el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="10" class="right" ><div @click="toggleSlideBar" class="rightEvent"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import applyLang from '../../lang/apply'

export default {
  computed: {
    ...mapState({
      personalInfo: 'personalInfo'
    }),
    ...mapGetters({
	    isSlideBarShow: 'isSlideBarShow',
	  }),
  },
  methods: {
    toggleSlideBar () {
      this.$store.dispatch('toggleSlideBar')
    },
    handleSelect (data) {
      let index = parseInt(data)
      switch (index) {
        case 1:
          if (this.personalInfo.uid && this.personalInfo.nickname){
            this.$store.dispatch('goPersonalPages',{userId:this.personalInfo.uid})
            //this.$store.dispatch('toggleheader',{nickname:this.personalInfo.nickname})
            this.$store.dispatch('toggleSlideBar')
          }
          break;
        default:

      }
    },
    setErrorAvatar () {
      this.$nextTick(function () {
        let errorImgUrl = require('../../assets/image/img_error_avatar.png')
        this.$refs.sliderbaravatar.src = errorImgUrl
     })
    },
    l(val) {
      return applyLang( this.$store.state.currentLanguage, val );
    }
  }
}
</script>

<style lang="less">
   @font-face {
      font-family: 'iconfont';  /* project id 954268 */
      src: url('//at.alicdn.com/t/font_954268_beyg4imydd4.eot');
      src: url('//at.alicdn.com/t/font_954268_beyg4imydd4.eot?#iefix') format('embedded-opentype'),
      url('//at.alicdn.com/t/font_954268_beyg4imydd4.woff') format('woff'),
      url('//at.alicdn.com/t/font_954268_beyg4imydd4.ttf') format('truetype'),
      url('//at.alicdn.com/t/font_954268_beyg4imydd4.svg#iconfont') format('svg');
    }
  .iconfont{
      font-family:"iconfont" !important;
      font-size:60px;font-style:normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;}
  .slidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
    animation: slidetoright .5s;
    -moz-animation: slidetoright .5s;	/* Firefox */
    -webkit-animation: slidetoright .5s;	/* Safari 和 Chrome */
    -o-animation: slidetoright .5s;

    .container{
      height: 100%;

      .left{
        height: 100%;
        background-color: #252525;

        .useravatar{
          display: flex;
          vertical-align: middle;
          align-items: center;
          flex-direction: column;
          margin: 20% 0 10% 0;

          img{
            border-radius:50%;
            width: 100px;
            height: 100px;
            margin: 0 auto;
            border: 2px solid #404040;
          }

          .name {
            font-size: 36px;
            color: #fff;
            margin: 5% 0;
          }
        }

        .el-menu{
          background-color: #252525;

          .el-menu-item{
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #404040;
            color: #707070;

            i {
              flex: 0 0 5% ;
            }
            .navtext {
              flex: 0 0 50%;
              text-align: center;
            }
          }
          .el-menu-item:hover {
            background-color: #252525;
            color: #fff;
          }
        }
      }

      .right{
        opacity: 0.6;
        height: 100%;
        background-color: #808080;
        z-index: 100;

        .rightEvent {
          height: 100%;
        }
      }
    }
  }

  @keyframes slidetoright{
    from {width: 0%;}
    to {width: 100%;}
  }

  @-moz-keyframes slidetoright{
    from {width: 0%;}
    to {width: 100%;}
  }

  @-webkit-keyframes slidetoright {
    from {width: 0%;}
    to {width: 100%;}
  }

  @-o-keyframes slidetoright{
    from {width: 0%;}
    to {width: 100%;}
  }

</style>
