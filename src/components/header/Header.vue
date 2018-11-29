<template>
  <div class="top_header">
    <header class="heade">
      <div class="menu" @click="toggleSlideBar">
        <div class="img_logo"></div>
      </div>
      <div class="title">
        <span>{{headertitle}}</span>
      </div>
      <div class="me_set">
        <div class="login_me_set" @click="act_me_set()">{{me_set_display_info}}</div>
      </div>
    </header>
    <topnav></topnav>
  </div>
</template>

<script>
import VueRouter from "../../router/routes.js";
import { mapGetters, mapActions } from "vuex";
import Nav from "../nav/Nav.vue";
import { login, logout, getPlayerIdentity } from "../../scatter/player";
export default {
  data() {
    try {
      const account = getPlayerIdentity();
      return {
        me_set_display_info: account.name + "  Log out",
        me_set_uid: account.name
      };
    } catch (error) {
      return {
        me_set_display_info: "Login",
        me_set_uid: ""
      };
    }
  },
  components: {
    topnav: Nav
  },
  computed: mapGetters({
    headertitle: "headerTitle"
  }),
  methods: {
    toggleSlideBar() {
      this.$store.dispatch("toggleSlideBar");
    },
    act_me_set() {
      getPlayerIdentity()
        .then(account => {
          logout();
          this.me_set_display_info = "Login";
          this.me_set_uid = "";
        })
        .catch(error => {
          login()
            .then(account => {
              console.log(account);
              this.me_set_uid = account.name;
              this.me_set_display_info = this.me_set_uid + "  Log out";
            })
            .catch(error => {
              this.me_set_display_info = "Login";
              this.me_set_uid = "";
            });
        });

      // if (this.$store.state.scatter.identity.name != "") {
      //   this.me_set_uid = this.$store.state.scatter.identity.name;
      //   console.log(this.$store.state.scatter.identity.name);
      //   this.me_set_display_info = this.me_set_uid + "  Log out";
      // } else {
      //   this.me_set_display_info = "Login";
      // }
    }

    //feather.replace({ class: 'foo bar', 'stroke-width': 1 }),
  }
};
</script>

<style lang="less">
@header-height: 134px;
@icon-font-size: 22px;
@title-font-size: 18px;
@baseBorderColor: #3b3b3b;
.top_header {
  position: fixed;
  width: 1080px;
  z-index: 10;
  top: 0px;
  margin-top: 0px;
  height: 268px;
}
.heade {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: @header-height;
  background: rgba(51, 51, 51, 1);
  text-align: center;
  line-height: @header-height;
  top: 0;
  left: 0;
  .menu {
    flex: 0 0 @header-height;
    font-size: @icon-font-size;
    .img_logo {
      background: url(../../assets/image/img_logo.png) no-repeat 0px 0px;
      margin-left: 40px;
      margin-top: 40px;
      background-size: 348px 75px;
      width: 348px;
      height: 75px;
    }
  }
  .title {
    //flex: 0;
    color: white;
    align-items: center;
    font-size: @title-font-size;
  }
  .me_set {
    //flex: 0 0 @header-height;
    font-size: @icon-font-size;
    .login_me_set {
      margin-right: 40px;
      color: #fffffe;
      font-size: 25px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      .img_login_me_set {
        filter: hue-rotate(220deg) saturate(5);
        //width: 40px;
        //height: 40px;
        -webkit-filter: hue-rotate(40deg) saturate(0.5) brightness(390%)
          saturate(4);
        //
      }
    }
  }
}
</style>
