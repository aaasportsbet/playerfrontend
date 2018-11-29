<template>
  <div class="home">
    <div class="top_sum">
      <div class="ts_join_times">
        <div class="ts_join_times_text">Join Times</div>
        <div class="ts_join_times_num">5</div>
      </div>
      <div class="ts_win">
        <div class="ts_win_text">Win</div>
        <div class="ts_win_num">1</div>
      </div>
      <div class="ts_payout">
        <div class="ts_payout_text">Payout(eos)</div>
        <div class="ts_payout_num">1</div>
      </div>
      <div class="ts_get">
        <div class="ts_get_text">Get(eos)</div>
        <div class="ts_get_num">112</div>
      </div>
    </div>
    <div class="list_staus">
      <div class="list_ongoing">Ongoing</div>
      <div class="list_history">History</div>
    </div>

    <div class="info-container" v-for="item in mehistorylists">
      <info :info="item" class="info"></info>
    </div>
		<switch-button></switch-button>
  </div>
</template>

<script>
import axios from 'axios'

import Info from 'components/info/Info.vue'
import SwitchButton from 'components/switchbutton/SwitchButton.vue'
import { mapGetters, mapActions } from 'vuex'
import { getMeRoundList } from "../../scatter/nba/round";
import { getPlayerIdentity, login, logout } from "../../scatter/player";
import { betRound } from "../../scatter/nba/bet";

const ERR_OK = 0
export default {
  data () {
    return {
      homelist: [],
      meongoinglists : [],
      mehistorylists :[]
    }},

  created() {
    axios.get('/api/home').then((res) => {
      res = res.data
      if (res.errno === ERR_OK) {
        this.homelist = res.data
      }
    }).catch((error) => {
      console.warn(error)
    }),
    getPlayerIdentity().then(identity => {getMeRoundList().then(response => {
      this.meongoinglists = response.ongoingdata;
      this.mehistorylists  = response.historydata;
      console.log("melists :", response);
    });}).catch(error=>{});
  },
  components: {
    "info": Info,
    "switch-button": SwitchButton
  },
  methods:{

  }
}
</script>

<style lang="less">
  .home {
    position: relative;
    background-color: #222222;
    //margin-top: 60px;
    .info-container{
      position: relative;
      //top: 80px;
      margin-top: 80px;
      background-color: #222222;
    }
    .top_sum{
      display: flex;
      justify-content:space-around;
      align-items: center;
      flex-direction: row;
      height: 272px;
      background: linear-gradient(180deg, rgba(208, 147, 42, 1) 0%, rgba(208, 147, 42, 1) 0%, rgba(236, 194, 47, 1) 100%, rgba(236, 194, 47, 1) 100%);
      .ts_join_times{
        display: flex;
        justify-content:space-around;
        align-items: center;
        flex-direction: column;
        .ts_join_times_text{
          font-size: 36px;
          color: #222222;
          font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
        }
        .ts_join_times_num{
          margin-top: 40px;
          font-size: 60px;
          color: #222222;
          font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
          font-weight: bold;
        }
      }
      .ts_win{
        display: flex;
        justify-content:space-around;
        align-items: center;
        flex-direction: column;
        .ts_win_text{
          font-size: 36px;
          color: #222222;
          font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
        }
        .ts_win_num{
          margin-top: 40px;
          font-size: 60px;
          color: #222222;
          font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
          font-weight: bold;
        }
      }
      .ts_payout{
        display: flex;
        justify-content:space-around;
        align-items: center;
        flex-direction: column;
        .ts_payout_text{
          font-size: 36px;
          color: #222222;
          font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
        }
        .ts_payout_num{
          margin-top: 40px;
          font-size: 60px;
          color: #222222;
          font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
          font-weight: bold;
        }
      }
      .ts_get{
        display: flex;
        justify-content:space-around;
        align-items: center;
        flex-direction: column;
        .ts_get_text{
          font-size: 36px;
          color: #222222;
          font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
        }
        .ts_get_num{
          margin-top: 40px;
          font-size: 60px;
          color: #222222;
          font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
          font-weight: bold;
        }
      }
    }
    .list_staus{
      display: flex;
      justify-content:space-between;
      align-items: center;
      flex-direction: row;
      height: 134px;
      text-align: center;
      line-height: 134px;

      .list_ongoing{
        height: 134px;
        width: 540px;
        background-color: rgba(51, 51, 51, 1);
        font-size: 36px;
        color: rgba(255, 255, 255, 0.6);
        font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
      }
      .list_history{
        height: 134px;
        width: 540px;
        background-color: rgba(34, 34, 34, 1);
        font-size: 36px;
        color: #FFFFFF;
        font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
      }
    }
  }
</style>
