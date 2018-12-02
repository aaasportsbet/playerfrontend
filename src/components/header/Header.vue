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
        <div class="login_me_uid"  v-show="this.me_set_login === true">{{me_set_uid}}</div>
         <div class="login_me_set" v-if="this.me_set_login === true" @click="act_me_set()">Logout</div>
         <div class="login_me_set" v-if="this.me_set_login === false" @click="act_me_set()">Login</div>
      </div>
    </header>
    <topnav></topnav>
  </div>
</template>

<script>
import VueRouter from "../../router/routes.js";
import { mapGetters, mapActions } from "vuex";
import Nav from "../nav/Nav.vue";
import store from '../../store/index.js';
import { login, logout, getPlayerIdentity } from "../../scatter/player";
export default {
  data() {
    return {
        me_set_display_info: "",
    }

  },
  components: {
    topnav: Nav
  },
  computed: mapGetters({
    headertitle: "headerTitle",
    me_set_login:"isLogin",
    me_set_uid: "accountName",
  }),
  methods: {
    toggleSlideBar() {
      this.$store.dispatch("toggleSlideBar");
    },
    act_me_set() {
      if(this.me_set_login == true){
        console.log("this.me_set_login",this.me_set_login)
        logout().then( () =>{
          const loginstatus = false;
          const accoutname ="";
          store.dispatch("setislogin", loginstatus );
          store.dispatch("setaccountname", accoutname);
          console.log("isLogin:",this.$store.state.isLogin);
          console.log("accountName:",this.$store.state.accountName);
          console.log("logoutscatter-state:",this.$store.state.scatter);
          console.log("logoutscatter-getters:",this.$store.getters.scatterEOS);
        })
        .catch(error =>{
          console.log("meseterrlogout:",error)
        }

        )};
      if(this.me_set_login == false){
        console.log("this.me_set_login",this.me_set_login);
        login().then( identity =>{
        const loginstatus = true;
        const accoutname = identity.name;
        console.log("identity.name:",identity.name,"accoutname:",accoutname)
        store.dispatch("setislogin", loginstatus );
        store.dispatch("setaccountname", accoutname);
        console.log("isLogin:",this.$store.state.isLogin);
        console.log("accountName:",this.$store.state.accountName);
        console.log("loginscatter-state:",this.$store.state.scatter);
        console.log("loginscatter-getters:",this.$store.getters.scatterEOS);
        })
        .catch(error =>{
          console.log("meseterrlogin:",error)
        })
        };
      }
    }
}
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    font-size: @icon-font-size;
    .login_me_uid{
      margin-right: 40px;
      color: #fffffe;
      font-size: 25px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      border-color:rgba(119, 119, 119, 1);
      background-color: rgba(119, 119, 119, 1);
      border-radius: 4px;
      border-width: 2px;
      border-style: solid;
      height: 50px;
      line-height: 50px;
      text-align: center;
      padding-right: 10px;
      padding-left: 10px;
    }
    .login_me_set {
      margin-right: 40px;
      color: #fffffe;
      font-size: 25px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      background-color: #ecc22f;
      font-size: 30px;
      font-family: "MicrosoftYaHei", "Microsoft YaHei";
      color: #2b2b2b;
      font-weight: bold;
      height: 50px;
      width: 140px;
      text-align: center;
      line-height: 50px;
      border-color: #ecc22f;
      border-radius: 4px;
      border-width: 2px;
      border-style: solid;
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
