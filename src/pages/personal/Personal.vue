<template>
  <div class="home">
    <div class="top_sum">
      <div class="ts_join_times">
        <div class="ts_join_times_text">Join Times</div>
        <div class="ts_join_times_num">{{mesum.game_join_times_serv_times}}</div>
      </div>
      <div class="ts_win">
        <div class="ts_win_text">Win Times</div>
        <div class="ts_win_num">{{mesum.game_join_win_times_serv_win_times}}</div>
      </div>
      <div class="ts_payout">
        <div class="ts_payout_text">Payout(EOS)</div>
        <div class="ts_payout_num">{{mesum.game_payout_serv_payout}}</div>
      </div>
      <div class="ts_get">
        <div class="ts_get_text">Get(EOS)</div>
        <div class="ts_get_num">{{mesum.game_get_serv_get}}</div>
      </div>
    </div>
    <div class="list_staus">
      <div
        :class="[this.display_O_H === true ? 'list_ongoing' : 'list_history']"
        @click="ListChangeTab('ongoing')"
      >Ongoing</div>
      <div
        :class="[this.display_O_H === false ? 'list_ongoing' : 'list_history']"
        @click="ListChangeTab('history')"
      >History</div>
    </div>

    <div class="info-container" v-for="item in meongoinglists" v-show="display_O_H === false">
      <info :info="item" class="info"></info>
    </div>
    <div class="info-container" v-for="item in mehistorylists" v-show="display_O_H === true">
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
import { getMeRoundList } from "../../scatter/nba/round";
import { getPlayerIdentity, login, logout } from "../../scatter/player";
import { betRound } from "../../scatter/nba/bet";

const ERR_OK = 0;
export default {
  data() {
    return {
      display_O_H: false,
      homelist: [],
      meongoinglists: [],
      mehistorylists: [],
      mesum:{
      game_join_times_serv_times: 0,
      game_join_win_times_serv_win_times: 0,
      game_payout_serv_payout: 0,
      game_get_serv_get: 0,
      }
    };
  },

  created() {
    axios
      .get("/api/home")
      .then(res => {
        res = res.data;
        if (res.errno === ERR_OK) {
          this.homelist = res.data;
        }
      })
      .catch(error => {
        console.warn(error);
      });
    if (this.$store.getters.isLogin == true) {
      getPlayerIdentity()
        .then(identity => {
          getMeRoundList(identity.name).then(response => {
            this.meongoinglists = response.ongoingdata;
            this.mehistorylists = response.historydata;
            this.mesum=response.me_sum;
            console.log("melists :", response);
            console.log("this.meongoinglists :", this.meongoinglists);
          });
        })
        .catch(error => {
          console.log("me-created-error", error);
        });
    }
  },
  components: {
    info: Info,
    "switch-button": SwitchButton
  },
  methods: {
    ListChangeTab(OHstatus) {
      if (OHstatus == "ongoing") {
        this.display_O_H = false;
        console.log(this.display_O_H);
      }
      if (OHstatus == "history") {
        this.display_O_H = true;
        console.log(this.display_O_H);
      }
    }
  }
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
  .top_sum {
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    flex-direction: row;
    height: 272px;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(208, 147, 42, 1) 0%,
      rgba(208, 147, 42, 1) 0%,
      rgba(236, 194, 47, 1) 100%,
      rgba(236, 194, 47, 1) 100%
    );
    .ts_join_times {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .ts_join_times_text {
        font-size: 36px;
        color: #222222;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
      }
      .ts_join_times_num {
        margin-top: 40px;
        font-size: 60px;
        color: #222222;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        font-weight: bold;
      }
    }
    .ts_win {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .ts_win_text {
        font-size: 36px;
        color: #222222;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
      }
      .ts_win_num {
        margin-top: 40px;
        font-size: 60px;
        color: #222222;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        font-weight: bold;
      }
    }
    .ts_payout {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .ts_payout_text {
        font-size: 36px;
        color: #222222;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
      }
      .ts_payout_num {
        margin-top: 40px;
        font-size: 60px;
        color: #222222;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        font-weight: bold;
      }
    }
    .ts_get {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .ts_get_text {
        font-size: 36px;
        color: #222222;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
      }
      .ts_get_num {
        margin-top: 40px;
        font-size: 60px;
        color: #222222;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        font-weight: bold;
      }
    }
  }
  .list_staus {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 134px;
    text-align: center;
    line-height: 134px;

    .list_ongoing {
      height: 134px;
      width: 540px;
      background-color: rgba(51, 51, 51, 1);
      font-size: 36px;
      color: rgba(255, 255, 255, 0.6);
      font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
    }
    .list_history {
      height: 134px;
      width: 540px;
      background-color: rgba(34, 34, 34, 1);
      font-size: 36px;
      color: #ffffff;
      font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
    }
  }
}
</style>
