<template>
  <div class="app">
    <v-header v-show="!isDetailHeader"></v-header>
    <detail-header :nickname="detailHeaderNickName" v-show="isDetailHeader"></detail-header>
    <router-view class="content" :key="activeDate" />
    <slide-bar></slide-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Header from "components/header/Header.vue";
import DetailHeader from "components/detailheader/DetailHeader.vue";
import SlideBar from "components/slidebar/SlideBar.vue";


export default {
  data() {
    return {
      nickname: ""
    };
  },

  created() {
    this.activeDate = (new Date()).toString();
  },
  computed: mapGetters({
    isDetailHeader: "isDetailHeader",
    detailHeaderNickName: "detailHeaderNickName",
    isLogin: "isLogin",
    accountName: "accountName"
  }),
  components: {
    "v-header": Header,
    "slide-bar": SlideBar,
    "detail-header": DetailHeader
  }
};
</script>

<style lang="less">
.app {
  height: 100%;
  background-color: #222222;
}
.content {
  //margin-top: 268px;
  //z-index: -2;
  display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
  top: 268px;
}
</style>
