<template>
  <div class="home">
    <div class="info-container" v-for="item in homelists">
      <info :info="item" class="info"></info>
    </div>
    <div style="height:16px;"></div>
		<switch-button></switch-button>
  </div>
</template>

<script>
import axios from "axios";

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
      homelist: [],
      homelists: []
    };
  },

  created() {
    axios
      .get("/api/home")
      .then(res => {
        res = res.data;
        if (res.errno === ERR_OK) {
          this.homelist = res.data;
          console.log("homelist :", res.data);
        }
      })
      .catch(error => {
        console.warn(error);
      });
    if(this.$store.getters.isLogin == true){
    getHomeRoundList().then(response => {
      this.homelists = response.data;
      console.log("homelists :", response.data);
      console.log("scatter01 :",this.$store.state.scatter);
    })
    .catch(error => {console.log("home-created-error",error)});
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
