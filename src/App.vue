<template>
  <div class="app">
    <v-header :isloginstatus="isLogin" :accountNamestatus="accountName" v-show="!isDetailHeader"></v-header>
    <detail-header :nickname="detailHeaderNickName" v-show="isDetailHeader"></detail-header>
    <router-view class="content"></router-view>
    <slide-bar></slide-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Header from "components/header/Header.vue";
import DetailHeader from "components/detailheader/DetailHeader.vue";
import SlideBar from "components/slidebar/SlideBar.vue";
import { login } from "scatter/player";

export default {
  data() {
    return {
      nickname: "",
      isloginstatus: false,
      accountNamestatus: ""
    };
  },
  created() {
    if (isLogin) {
      this.isloginstatus = true;
      this.accountNamestatus = accountName;
    } else {
      login()
        .then(identity => {
          const loginstatus = true;
          const accoutname = identity.name;
          this.$store.dispatch("setislogin", { loginstatus });
          this.$store.dispatch("setaccountname", { accoutname });
        })
        .catch(error => {
          console.error(error);
          const loginstatus = false;
          const accoutname = "";
          this.$store.dispatch("setislogin", { loginstatus });
          this.$store.dispatch("setaccountname", { accoutname });
        });
    }
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
  top: 268px;
}
</style>
