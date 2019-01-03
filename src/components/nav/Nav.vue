<template>
  <div class="top_nav">
    <div class="nav_HS" @click="goHomePage" tabindex="1">
     <span class="nav_text" :class="[$route.name === 'home' ? 'curpage_color' : '']">{{ l("Hot Sports") }}</span>
    </div>
    <div class="nav_S" tabindex="2">
      <div class="nav_text" :class="[$route.name === 'schedule' ? 'curpage_color' : '']">{{ l("Rules") }}</div>
    </div>
    <div class="nav_M" @click="goPersonalPages(9)" tabindex="3">
      <div class="nav_text" :class="[$route.name === 'personal' ? 'curpage_color' : '']">{{ l("Me") }}</div>
    </div>
  </div>
</template>

<script>
import VueRouter from '../../router/routes.js'
import applyLang from '../../lang/apply'

import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    toggleSlideBar () {
      this.$store.dispatch('toggleSlideBar')
    },
    goPersonalPages (uid) {
      if (this.$route.name !== 'personal'){
        console.log(this.$route.name)
        if (uid) {
          this.$store.dispatch('goPersonalPages',{userId:uid});
          console.log('nav-click-me :', this.$store.state.cancelLogin);
        }
      }
    },
    l(val) {
      return applyLang( this.$store.state.currentLanguage, val );
    },
    goHomePage(){
      if (this.$route.name !== 'home'){
      this.$store.dispatch('goHomePage')
      console.log('nav-click-home :', this.$store.state.cancelLogin);
      //console.log(this.$route.path)
      //console.log(this.$route.name)
    }
    }
  }
}
</script>

<style lang="less">
  @nav-height:134px;
  @nav-font-size:36px;
  @nav-div-width: 280px;
  @nav-div-height: 80px;
  @nav-div-bgColor:rgba(34, 34, 34, 0.5);
  @nav-div-radius:4px;
  @nav-div-top:15px;

  .top_nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: @nav-height;
    background: rgba(51, 51, 51, 1);
    text-align: center;
    margin-top:0px;
    //top:134px;
    //left: 0;
    //float:left;
    outline: none;

    .nav_HS {
      font-size: @nav-font-size;
      width: @nav-div-width;
      height:@nav-div-height;
      background-color:@nav-div-bgColor;
      border-radius:@nav-div-radius;
      margin-top:@nav-div-top;
      margin-left:40px;
      float:left;
    }
    .nav_S {
      font-size: @nav-font-size;
      width: @nav-div-width;
      height:@nav-div-height;
      background-color:@nav-div-bgColor;
      border-radius:@nav-div-radius;
      margin-top:@nav-div-top;
      //margin-left:80px;
      float:left;
    }
    .nav_M {
      font-size: @nav-font-size;
      width: @nav-div-width;
      height:@nav-div-height;
      background-color:@nav-div-bgColor;
      border-radius:@nav-div-radius;
      margin-top:@nav-div-top;
      //margin-left:80px;
      margin-right: 40px;
      float:left;
    }
    .nav_text{
      color:rgba(255, 255, 255, 0.6);
      width: @nav-div-width;
      height:@nav-div-height;
      //margin-top: 15px;
      line-height:@nav-div-height;
      font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
      &.curpage_color{
      color:#ECC22F;
      }
    }

  }
</style>
