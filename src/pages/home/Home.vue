<template>
  <div class="home">
    <div class="info-container" v-for="item in homelists">
      <info :info="item" :type="true" class="info"></info>
    </div>
    <div style="height:16px;"></div>
		<switch-button></switch-button>
  </div>
</template>

<script>
import Info from "components/info/Info.vue";
import SwitchButton from "components/switchbutton/SwitchButton.vue";
import { mapGetters, mapActions } from "vuex";
import { getHomeRoundList } from "../../scatter/nba/round";
import { getPlayerIdentity, login, logout } from "../../scatter/player";
import { betRound } from "../../scatter/nba/bet";

const ERR_OK = 0;
export default {
  data() {
    return {
      //homelist: [],
      homelists: [],
    };
  },

  created() {
    // 用于界面刷新
    if (this.$store.state.routerRefreshing === true) {
      this.$store.dispatch('routerRefreshing', false)
      this.$store.dispatch('updatePage')
      return
    }

    // 从Scatter加载正式数据
    console.info( "切换到 HOME" )
    let acc_player=this.$store.getters.accountName;
    let acc_isLogin= this.$store.getters.isLogin;
    if(acc_isLogin){
      getHomeRoundList(acc_player).then(response => {
      this.homelists = response.data;
      console.log("homelists :", response.data);
      console.log("scatter01 login status is true:",this.$store.state.scatter);
      })
      .catch(error => {console.log("home-created-error-login-status-is-true",error)});
    }
    if(!acc_isLogin){
      getHomeRoundList(acc_player).then(response => {
      this.homelists = response.data;
      console.log("homelists :", response.data);
      console.log("scatter01 login status is false:",this.$store.state.scatter);
      })
      .catch(error => {console.log("home-created-error-login-status-is-false",error)});
    }
  },
  components: {
    info: Info,
    "switch-button": SwitchButton
  },
  methods: {}
};
</script>

<style lang="less">
.home {
  position: relative;
  background-color: #222222;
  //margin-top: 60px;
  .info-container {
    position: relative;
    //top: 80px;
    margin-top: 80px;
    background-color: #222222;
  }
}
</style>
