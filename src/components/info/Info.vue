<template>
  <div class="info">
    <div class="count_down" :class="[info.game_count_down_time_display === false ? 'count_down_display_none' : '']" v-if="info.game_count_down_time_display !== false">
      <div class="count_down_top_flex">
        <div class="icon-clock count_down_top_clock"></div>
        <div class="count_down_top">{{ l("Count Down") }}</div>
      </div>
      <div class="count_down_bottom">
        <span v-show="countdownshow">{{ l(message) }}</span>
        <astcountdown
          v-show="!countdownshow"
          class="count_down_time"
          v-on:start_callback="countDownS_cb(1)"
          v-on:end_callback="countDownE_cb(1)"
          :startTime="startTime"
          :endTime="endTime"
          :tipText="''"
          :tipTextEnd="''"
          :endText="''"
          :dayTxt="':'"
          :hourTxt="':'"
          :minutesTxt="':'"
          :secondsTxt="''"
        ></astcountdown>
      </div>
    </div>
    <div
      class="game_win_status"
      :class="[info.game_win_status_display === false ? 'game_win_status_display_none' : '']"
      v-if="info.game_win_status_display === true"
    >
      <div class="game_win_status_win" v-if="info.game_win_status === 'win'">
        <div class="game_win_status_win_text">{{ l("Win") }}</div>
      </div>
      <div class="game_win_status_lose" v-if="info.game_win_status === 'lose'">
        <div class="game_win_status_lose_text">{{ l("Lose") }}</div>
      </div>
    </div>
    <div class="box">
      <div class="vs_play">
        <div class="left_vs_play">
          <span class="left_text_i18n">{{info.game_info_left_i18n_serv_awayteam}}</span>
          <span class="left_text_abbr">({{info.game_info_left_abbr}})</span>
        </div>
        <div class="icon_vs_play">VS</div>
        <div class="right_vs_play">
          <span class="right_text_i18n">{{info.game_info_right_i18n_serv_hometeam}}</span>
          <span class="right_text_abbr">({{info.game_info_right_abbr}})</span>
        </div>
      </div>
      <div class="info_play">
        <div class="detail_play">
          <span
            class="detail_play_top"
          >[{{info.game_contract_type}}&nbsp;{{info.game_round_type_i18n_serv_type}}]</span>
          <span
            class="detail_play_bottom"
          >Match Time: {{info.game_count_down_time_serv_bet_end_time}}</span>
          <span class="detail_play_bottom">{{ l("Join with") }} {{info.game_join_bet_serv_bet_unit}}</span>
        </div>
        <div
          class="joined_info joined_info_detail"
          @click="act_detail('testing')"
          v-if="info.game_joined_status.index === 2"
        >{{ l(Real_game_detail_status) }}</div>

        <div
          class="joined_info"
          :class="[info.game_joined_status.index === 0 ? 'joined_info_f' : '']"
          v-else
        >
          <div class="joined_info_top">{{info.game_joied_num_serv_shares}} {{ l("Joined") }}</div>
          <div
            class="joined_info_bottom"
            v-if="info.game_joined_status.index !== 0"
          >{{info.game_joined_status.value}}</div>
          <div
            class="joined_info_bottom joined_info_bottom_f"
            @click="act_join_A('right')"
            v-else
          >{{ l(Real_game_joined_status) }}</div>
        </div>
      </div>
      <div class="detail_act" v-show="DetailVisible === true" >
        <div class="detail_act_score">
          <div class="detail_act_score_left">{{info.game_info_left_result_score}}</div>
          <div class="detail_act_score_mid">
            <span>{{info.game_info_left_abbr}}</span>
            <span>&nbsp;&nbsp;VS&nbsp;&nbsp;</span>
            <span>{{info.game_info_right_abbr}}</span>
          </div>
          <div class="detail_act_score_right">{{info.game_info_right_result_score}}</div>
        </div>
        <div class="detail_act_players">
          <div class="detail_act_players_lable">{{ l("Player") }}</div>
          <div class="detail_act_players_value">{{info.game_info_result_players}}</div>
        </div>
        <div class="detail_act_bonuspool">
          <div class="detail_act_bonuspool_lable">{{ l("Bonus Pool") }}</div>
          <div class="detail_act_bonuspool_value">{{info.game_info_result_bonuspool}}</div>
        </div>
        <div class="detail_act_winner">
          <div class="detail_act_winner_lable">{{ l("Winner") }}</div>
          <div class="detail_act_winner_value">{{info.game_info_result_winner_num}}</div>
        </div>
        <div  class="detail_act_getuint">
          <div class="detail_act_getuint_lable">{{ l("Get EOS/Pers") }}</div>
          <div class="detail_act_getuint_value">{{info.game_info_result_winner_getuint}}</div>
        </div>
      </div>
      <div class="bet_act" v-show="JoinVisible === true" >

        <div class="bet_act_ChooseWin">
          <div class="bet_act_ChooseWin_label">{{ l("Choose Win Team") }}</div>
          <div class="bet_act_ChooseWin_value">
            <button
              class="bet_act_ChooseWin_value_left"
              :class="[joindata.act_game_winner_team_abbr === info.game_info_left_abbr ? 'bet_act_ChooseWin_value_left_select' : '']"
              @click="act_choose_team(info.game_info_left_id,info.game_info_left_abbr)"
            >{{info.game_info_left_abbr}}</button>
            <button
              class="bet_act_ChooseWin_value_right"
              :class="[joindata.act_game_winner_team_abbr === info.game_info_right_abbr ? 'bet_act_ChooseWin_value_right_select' : '']"
              @click="act_choose_team(info.game_info_right_id,info.game_info_right_abbr)"
            >{{info.game_info_right_abbr}}</button>
          </div>
        </div>
        <div class="bet_act_BI" v-show="info.game_round_type_i18n_serv_type === 'Range'">
          <div class="bet_act_BI_label">{{ l("Bet Range") }}</div>
          <div class="bet_act_BI_value">
            <button class="bet_act_BI_value_num" :class="[joindata.act_game_range === 1 ? 'bet_act_BI_value_num_select' : '']" @click="act_BI_value(1,'1-3')">1-3</button>
            <button class="bet_act_BI_value_num" :class="[joindata.act_game_range === 2 ? 'bet_act_BI_value_num_select' : '']"  @click="act_BI_value(2,'4-7')">4-7</button>
            <button class="bet_act_BI_value_num" :class="[joindata.act_game_range === 3 ? 'bet_act_BI_value_num_select' : '']"  @click="act_BI_value(3,'8-12')">8-12</button>
            <button class="bet_act_BI_value_num" :class="[joindata.act_game_range === 4 ? 'bet_act_BI_value_num_select' : '']"  @click="act_BI_value(4,'13-20')">13-20</button>
            <button class="bet_act_BI_value_num" :class="[joindata.act_game_range === 5 ? 'bet_act_BI_value_num_select' : '']"  @click="act_BI_value(5,'20+')">20+</button>
          </div>
        </div>
        <div class="bet_act_BP" v-show="info.game_round_type_i18n_serv_type === 'PointDiff'">
          <div class="bet_act_BP_label">{{ l("Choose Win Points") }}</div>
          <div class="bet_act_BP_value">
            <button class="bet_act_BP_value_minus" @click="act_minus('joindata.act_game_point')"><i class="el-icon-minus"></i></button>
            <span class="bet_act_BP_value_num">{{joindata.act_game_point}}</span>
            <button class="bet_act_BP_value_plus" @click="act_add('joindata.act_game_point')"><i class="el-icon-plus"></i></button>
          </div>
        </div>
        <div class="bet_act_BM">
          <div class="bet_act_BM_label">{{ l("Bet Multiple") }}</div>
          <div class="bet_act_BM_value">
            <button
              class="bet_act_BM_value_minus"
              @click="act_minus('joindata.act_game_bet_multiple')"
            ><i class="el-icon-minus"></i></button>
            <span class="bet_act_BM_value_num">{{joindata.act_game_bet_multiple}}</span>
            <button
              class="bet_act_BM_value_plus"
              @click="act_add('joindata.act_game_bet_multiple')"
            ><i class="el-icon-plus"></i></button>
          </div>
        </div>
        <div class="bet_act_BP_betinfo">
          <div class="bet_act_BP_beinfo_label">{{ l("Bet Detail") }}</div>
          <div class="bet_act_BP_beinfo_value">
            <span v-show="joindata.act_game_win_welcome === '1'">{{ l("You bet") }} {{joindata.act_game_pay_total}} {{ l("for") }} {{joindata.act_game_winner_team_abbr}} {{ l("Win") }} {{joindata.act_game_win_info}}</span>
            <span v-show="joindata.act_game_win_welcome === '0'">{{ l(joindata.act_game_win_welcome_text) }}</span>
            </div>
          </div>

        <div class="bet_act_BP_confirm">
          <div class="bet_act_BP_confirm_label">{{ l("Confirm to Bet") }}</div>
          <div class="bet_act_BP_confirm_value">
            <label class="bet_act_BP_confirm_err">{{ l(joindata.act_pay_err) }}</label>
            <button class="bet_act_BP_confirm_value_C" @click="act_pay()">{{ l("Pay Now") }}</button>
          </div>
        </div>
      </div>

      <div class="box_bottom" v-show="local_game_joined_latest !== 0">
        <span
          class="box_bottom_l"
          v-if="info.game_round_type_i18n_serv_type === 'WinLose'"
        >{{local_game_joined_latest.team_name}} Win {{local_game_joined_latest.team_score}}</span>

        <span
          class="box_bottom_l"
          v-else
        >{{local_game_joined_latest.team_name}} Win {{local_game_joined_latest.team_score}} Score</span>
            <span class="win_status" style="color:rgba(205, 89, 48, 1)" v-if="local_game_joined_latest.user_win_status === 'win'"><i class="iconfont">&#xe604;</i></span>
            <span class="win_status" style="color:#777777;" v-else-if="local_game_joined_latest.user_win_status === 'lose'"><i class="iconfont">&#xe605;</i></span>
            <span class="win_status" style="color:#ecc22f;" v-else-if="local_game_joined_latest.user_win_status === 'returned'"><i class="iconfont">&#xe72d;</i></span>
            <span class="win_status" style="color:#ecc22f;" v-else-if="local_game_joined_latest.user_win_status === 'wait'"><i class="iconfont">&#xe621;</i></span>
            <span class="win_status" style="color:#ecc22f;" v-else-if="local_game_joined_latest.user_win_status === 'awarded'"><i class="iconfont">&#xe621;</i></span>
            <span class="win_status" style="color:#ecc22f;" v-else><i class="iconfont">&#xe7e1;</i></span>
        <span class="box_bottom_r">{{local_game_joined_latest.share}}</span>
      </div>
      <div style="height:16px;" v-show="local_game_joined_latest === 0"></div>
      <div
        class="bottom_more"
        v-show="local_game_joined_latest !== 0 && Real_game_joined_more_display === true"
        v-clickoutside="handleClose"
      >
        <div class="dropdown_menu" @click="show = !show">
          <span v-show="show">▲&nbsp;{{ l("More") }}</span>
          <span v-show="!show">▼&nbsp;{{ l("More") }}</span>
          </div>
        <div class="dropdown_show" v-show="show">
          <div class="dropdown_list" v-for="item in list_playmore">
            <span class="dropdown_list_l" v-if="info.game_round_type_i18n_serv_type === 'WinLose'">{{item.team_name}} Win {{item.team_score}}</span>
            <span class="dropdown_list_l" v-else>{{item.team_name}} Win {{item.team_score}} Score</span>
            <span class="win_status" style="color:rgba(205, 89, 48, 1)" v-if="item.user_win_status === 'win'"><i class="iconfont">&#xe604;</i></span>
            <span class="win_status" style="color:#777777;" v-else-if="item.user_win_status === 'lose'"><i class="iconfont">&#xe605;</i></span>
            <span class="win_status" style="color:#ecc22f;" v-else-if="item.user_win_status === 'returned'"><i class="iconfont">&#xe72d;</i></span>
            <span class="win_status" style="color:#ecc22f;" v-else-if="item.user_win_status === 'wait'"><i class="iconfont">&#xe621;</i></span>
            <span class="win_status" style="color:#ecc22f;" v-else-if="item.user_win_status === 'awarded'"><i class="iconfont">&#xe621;</i></span>
            <span class="win_status" style="color:#ecc22f;" v-else><i class="iconfont">&#xe7e1;</i></span>
            <span class="dropdown_list_r">{{item.share}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import astcountdown from "../astcountdown/astcountdown";
import { getPlayerIdentity } from "../../scatter/player";
import { getSingleRound } from "../../scatter/nba/round";
import { betRound, calcBetTotal } from "../../scatter/nba/bet";
import { error } from "util";
import applyLang from '../../lang/apply'

export default {
  data() {
    return {
      show: false,
      list_playmore: this.info.game_joined_more,
      startTime: this.info.game_count_down_time_serv_bet_end_time_second,
      endTime: this.info.game_count_down_time_serv_bet_end_time_second,
      message: "Stop Betting",
      countdownshow: false,
      JoinVisible: false,
      DetailVisible: false,
      Real_game_joined_more_display: this.info.game_joined_more_display,
      Real_game_joined_status :this.info.game_joined_status.value,
      Real_game_detail_status :this.info.game_joined_status.value,
      joindata: {
        act_game_bet_multiple: 1,
        act_game_winner_team_id: "",
        act_game_winner_team_abbr: "",
        act_game_range: "",
        act_game_point: 1,
        act_game_pay_total: "",
        act_game_win_info:"",
        act_game_win_welcome:"0",
        act_game_win_welcome_text:"Please Choose Bet Plan",
        act_pay_err:""
      },
      local_game_joined_latest:this.info.game_joined_latest,
      num1: 1
    };
  },
  props: {
    info: {
      type: Object
    }
  },
  computed: {},
  components: {
    astcountdown
  },
  methods: {
    act_join_A(test){
      console.log("act_game_join", test);
      if(this.JoinVisible==true){
        this.JoinVisible=false;
        this.Real_game_joined_status=this.info.game_joined_status.value;
      }
      else{
        this.JoinVisible=true;
        this.Real_game_joined_status="Cancel Join";
      }
    },
    act_detail(test){
      console.log("act_detail", test);
      if(this.DetailVisible==true){
        this.DetailVisible=false;
        this.Real_game_detail_status=this.info.game_joined_status.value;
      }
      else{
        this.DetailVisible=true;
        this.Real_game_detail_status="Close Detail";
      }
    },
    act_pay() {
      console.log("act_game_bet_multiple", this.joindata.act_game_bet_multiple);
      console.log("act_game_range", this.joindata.act_game_range);
      console.log("act_game_winner_team_id", this.joindata.act_game_winner_team_id);
      console.log("act_game_point", this.joindata.act_game_point);
      console.log("act_game_pay_total", this.joindata.act_game_pay_total);
      if(this.joindata.act_game_winner_team_id == '') {
        this.joindata.act_pay_err='Please Choose Win Team';
      }
      else if(this.joindata.act_game_range == '' && this.info.game_round_type_i18n_serv_type == 'Range'){
        this.joindata.act_pay_err='Please Choose Bet Range';
      }
      else{
        this.joindata.act_pay_err='';
          getPlayerIdentity()
            .then(identity => {
              betRound(
                identity,
                this.info.game_server_obj,
                this.joindata.act_game_winner_team_id,
                this.joindata.act_game_range,
                this.joindata.act_game_point,
                this.joindata.act_game_bet_multiple
              )
                .then(response => {
                  console.log(response);
                    if(response.errno== 200){
                      this.JoinVisible=false;
                      this.Real_game_joined_status=this.info.game_joined_status.value;
                      this.$message({
                        message: l('Congratulations, Pay Successfully!'),
                        center: true,
                        type:'success'
                      });
                      let acc_player= this.$store.getters.accountName
                      console.log("acc_player",acc_player)
                      getSingleRound(this.info.game_serv_id,acc_player).then(response =>{
                        if(response.errno== 200){
                          console.log("response.data",response.data)
                          console.log("this.info.game_joined_more",this.info.game_joined_more)
                          console.log("response.data.game_joined_more",response.data.game_joined_more)
                          console.log("this.local_game_joined_latest",this.local_game_joined_latest)
                          console.log("response.data.game_joined_latest",response.data.game_joined_latest)
                          this.list_playmore = response.data.game_joined_more;
                          this.local_game_joined_latest=response.data.game_joined_latest;
                          this.Real_game_joined_more_display=response.data.game_joined_more_display;
                        }
                        else{
                          this.$message.error(response.error);
                        };
                      });
                    }
                    else if(response.errno== 401){
                      this.$message.error(l('Sorry, You are not login, Please Login!Error:'),response.error);


                    }
                    else if(response.errno== 400){
                      this.$message.error(l('Sorry, Network latency, Please try again later!Error:'),response.error);

                    }
                    else{
                      this.$message.error(l('Sorry, Network error, Please try again later!Error:'),response.error);
                    }


                })
                .catch(error => {
                  console.error(error);
                });
            })
            .catch(error => {
              console.error(error); // player not login
            });
      }
    },
    act_BI_value(info_act_game_range,info_act_game_info) {
      this.joindata.act_pay_err='';
      this.joindata.act_game_win_welcome='1';
      console.log(this.joindata.act_game_win_welcome);
      this.joindata.act_game_range = info_act_game_range;
      this.joindata.act_game_pay_total = calcBetTotal(this.info.game_server_obj.bet_unit, this.joindata.act_game_bet_multiple,false,2);
      this.joindata.act_game_win_info =info_act_game_info + ' Score';
      console.log(info_act_game_range);
      console.log("this.joindata.act_game_point",this.joindata.act_game_point);
    },
    act_choose_team(info_choose_team_id,info_choose_team_abbr) {
      this.joindata.act_pay_err='';
      this.joindata.act_game_win_welcome='1';
      this.joindata.act_game_winner_team_id = info_choose_team_id;
      this.joindata.act_game_winner_team_abbr = info_choose_team_abbr;
      this.joindata.act_game_pay_total = calcBetTotal(this.info.game_server_obj.bet_unit, this.joindata.act_game_bet_multiple,false,2);

      if(this.info.game_round_type_i18n_serv_type == 'WinLose' || (this.info.game_round_type_i18n_serv_type  == 'Range' && this.joindata.act_game_range === '')){
        this.joindata.act_game_win_info=''
      }
      else if(this.info.game_round_type_i18n_serv_type  == 'Range'){
        let info_act_game_info='';
        if(this.joindata.act_game_range == 1){
             info_act_game_info='1-3';
        }
        if(this.joindata.act_game_range == 2){
             info_act_game_info='4-7';
        }
        if(this.joindata.act_game_range  == 3){
             info_act_game_info='8-12';
        }
        if(this.joindata.act_game_range  == 4){
             info_act_game_info='13-20';
        }
        if(this.joindata.act_game_range  == 5){
             info_act_game_info='20+';
        }
        console.log("ct_this.joindata.act_game_range ",this.joindata.act_game_range );
        this.joindata.act_game_win_info = info_act_game_info  + ' Score';
      }
      else{
        this.joindata.act_game_win_info = this.joindata.act_game_point  + ' Score';
      }


      console.log(this.joindata.act_game_winner_team_id ,this.joindata.act_game_winner_team_abbr);
    },
    act_add(info_bet_addtype) {
      this.joindata.act_game_win_welcome='1';
      if (info_bet_addtype == "joindata.act_game_bet_multiple") {
        if(this.joindata.act_game_bet_multiple > 98){
          this.joindata.act_game_bet_multiple = 99;
          this.joindata.act_game_pay_total = calcBetTotal(this.info.game_server_obj.bet_unit, this.joindata.act_game_bet_multiple,false,2);
          console.log(this.joindata.act_game_bet_multiple);
        }
        else{
        this.joindata.act_game_bet_multiple++;
        this.joindata.act_game_pay_total = calcBetTotal(this.info.game_server_obj.bet_unit, this.joindata.act_game_bet_multiple,false,2);
        console.log(this.joindata.act_game_bet_multiple);
        }
      }
      if (info_bet_addtype == "joindata.act_game_point") {
        if(this.joindata.act_game_point > 98){
          this.joindata.act_game_point = 99;
          this.joindata.act_game_pay_total = calcBetTotal(this.info.game_server_obj.bet_unit, this.joindata.act_game_bet_multiple,false,2);
          this.joindata.act_game_win_info = this.joindata.act_game_point  + ' Score';
          console.log(this.joindata.act_game_point);
        }
        else{
        this.joindata.act_game_point++;
        this.joindata.act_game_pay_total = calcBetTotal(this.info.game_server_obj.bet_unit, this.joindata.act_game_bet_multiple,false,2);
        this.joindata.act_game_win_info = this.joindata.act_game_point  + ' Score';
        console.log(this.joindata.act_game_point);
        }
      }
    },
    act_minus(info_bet_minustype) {
      this.joindata.act_game_win_welcome='1';
      if (info_bet_minustype == "joindata.act_game_bet_multiple" ) {
        if(this.joindata.act_game_bet_multiple < 2){
          console.log(this.joindata.act_game_bet_multiple);
          this.joindata.act_game_bet_multiple = 1;
          this.joindata.act_game_pay_total = calcBetTotal(this.info.game_server_obj.bet_unit, this.joindata.act_game_bet_multiple,false,2);
        }
        else{
          this.joindata.act_game_bet_multiple--;
          this.joindata.act_game_pay_total = calcBetTotal(this.info.game_server_obj.bet_unit, this.joindata.act_game_bet_multiple,false,2);
          console.log(this.joindata.act_game_bet_multiple);
        }

      }
      if (info_bet_minustype == "joindata.act_game_point") {
         if(this.joindata.act_game_point < 2){
          console.log(this.joindata.act_game_point);
          this.joindata.act_game_point= 1;
          this.joindata.act_game_pay_total = calcBetTotal(this.info.game_server_obj.bet_unit, this.joindata.act_game_bet_multiple,false,2);
          this.joindata.act_game_win_info = this.joindata.act_game_point  + ' Score';
        }
        else{
          this.joindata.act_game_point--;
          this.joindata.act_game_win_info = this.joindata.act_game_point  + ' Score';
          this.joindata.act_game_pay_total = calcBetTotal(this.info.game_server_obj.bet_unit, this.joindata.act_game_bet_multiple,false,2);
          console.log(this.joindata.act_game_point);
        }
      }
    },
    goDetailPage: function(info) {
      this.$store.dispatch("goDetailPage", { id: info.id });
      this.$store.dispatch("toggleheader", { nickname: info.nickname });
    },
    handleClose() {
      this.show = false;
    },
    countDownS_cb: function(x) {
      this.countdownshow=true;
      console.log(x);
    },
    countDownE_cb: function(x) {
      this.countdownshow=true;
      console.log(x);
    },
    l(val) {
      return applyLang( this.$store.state.currentLanguage, val );
    }
  },
  directives: {
    clickoutside: {
      bind: function(el, binding, vnode) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }
        el._vueClickOutside_ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      unbind: function(el, binding) {
        document.removeEventListener("click", el._vueClickOutside_);
        delete el._vueClickOutside_;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@baseBackgroundColor: #333333;
@baseBorderColor: #777777;
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
      font-size:50px;font-style:normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;}
[v-cloak] {
  display: none;
}
.info {
  position: relative;
  width: 1080px;
  background-color: #222222;
  .count_down {
    position: absolute;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    width: 200px;
    height: 113px;
    left: 40px;
    top: -20px;
    margin-left: 40px;
    background: url(../../assets/image/img_top_flag.png) no-repeat 0px 0px;
    background-size: 200px 113px;
    text-align: center;
    &.count_down_display_none {
      display: none;
    }

    .count_down_top_flex {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;

      .count_down_top {
        height: 25px;
        font-size: 25px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        color: #777777;
        line-height: 25px;
        padding-left: 5px;
        margin-top: 10px;
      }
      .count_down_top_clock {
        margin-top: 10px;
        height: 25px;
        width: 25px;
        font-size: 20px;
        color: #ffffff;
        line-height: 25px;
        margin-top: 10px;
      }
    }
    .count_down_bottom {
      width: 90%;
      font-size: 28px;
      font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
      font-weight: bold;
      color: gray;
      line-height: 50px;
      //font-style: normal;
      .count_down_time {
        font-size: 28px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        font-weight: bold;
        color: #ecc22f;
        line-height: 50px;
        font-style: normal;
      }
      //background-color: #FFFFFE;
    }
  }
  .game_win_status {
    position: absolute;
    top: 0px;
    left: 40px;
    width: 150px;
    height: 150px;
    font-size: 36px;
    color: #ffffff;
    font-family: "\5FAE\8F6F\96C5\9ED1", Arial, Helvetica, Tahoma, Verdana,
      STHeiTi, simsun, sans-serif;
    &.game_win_status_display_none {
      display: none;
    }
    .game_win_status_win {
      background: url(../../assets/image/img_win.png) no-repeat 0px 0px;
      background-size: 150px 150px;
      width: 150px;
      height: 150px;
      .game_win_status_win_text {
        transform: rotate(315deg);
        font-weight: bolder;
        text-align: bottom;
      }
    }
    .game_win_status_lose {
      background: url(../../assets/image/img_lose.png) no-repeat 0px 0px;
      background-size: 150px 150px;
      width: 150px;
      height: 150px;
      .game_win_status_lose_text {
        transform: rotate(315deg);
        font-weight: bolder;
        text-align: bottom;
      }
    }
  }
  .box {
    width: 1000px;
    //height: 570px;
    background: inherit;
    background-color: rgba(39, 39, 39, 1);
    box-sizing: border-box;
    border-width: 2px;
    border-style: solid;
    border-color: rgba(119, 119, 119, 1);
    border-radius: 4px;
    box-shadow: none;
    margin-left: 40px;
    //margin-top: 40px;

    .vs_play {
      font-size: 36px;
      font-weight: 400;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      .left_vs_play {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-width: 0px;
        width: 420px;
        height: 200px;
        background: inherit;
        background-color: rgba(34, 34, 34, 1);
        border: none;
        border-radius: 4px;
        box-shadow: none;
        margin-top: 60px;
        color: #fffffe;
        .left_text_i18n {
          font-size: 36px;
          font-weight: bold;
          text-align: center;
          font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        }
        .left_text_abbr {
          margin-top: 30px;
          font-size: 36px;
          font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
          color: rgba(119, 119, 119, 0.4);
        }
      }
      .icon_vs_play {
        width: 80px;
        height: 80px;
        background: inherit;
        background-color: rgba(255, 255, 255, 0);
        border: none;
        border-radius: 0px;
        color: #ecc22f;
        font-size: 36px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        font-weight: bold;
        margin-top: 120px;
        text-align: center;
      }
      .right_vs_play {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-width: 0px;
        width: 420px;
        height: 200px;
        background: inherit;
        background-color: rgba(34, 34, 34, 1);
        border: none;
        border-radius: 4px;
        box-shadow: none;
        margin-top: 60px;
        color: #fffffe;
        .right_text_i18n {
          font-size: 36px;
          font-weight: bold;
          text-align: center;
          font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        }
        .right_text_abbr {
          margin-top: 30px;
          font-size: 36px;
          font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
          color: rgba(119, 119, 119, 0.4);
        }
      }
    }
    .info_play {
      font-size: 36px;
      font-weight: 400;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      margin-top: 40px;
      margin-left: 40px;

      .detail_play {
        display: flex;
        justify-content: space-between;
        align-items: left;
        flex-direction: column;
        height: 140px;
        .detail_play_top {
          font-size: 30px;
          font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
          color: #ffffff;
        }
        .detail_play_bottom {
          font-size: 30px;
          font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
          color: #777777;
        }
      }
      .joined_info {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 140px;
        width: 280px;
        margin-right: 40px;
        border-color: rgba(119, 119, 119, 1);
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        overflow: hidden;
        &.joined_info_detail {
          border-color: #ecc22f;
          background-color: #ecc22f;
          font-size: 30px;
          font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
          color: #2b2b2b;
          font-weight: bold;
        }
        .joined_info_top {
          background-color: rgba(43, 43, 43, 1);
          font-size: 25px;
          font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
          color: #ecc22f;
          height: 70px;
          width: 280px;
          text-align: center;
          line-height: 70px;
        }
        .joined_info_bottom {
          background-color: rgba(119, 119, 119, 1);
          font-size: 30px;
          font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
          color: #2b2b2b;
          font-weight: bold;
          height: 70px;
          width: 280px;
          text-align: center;
          line-height: 70px;
          &.joined_info_bottom_f {
            background-color: #ecc22f;
          }
        }
        &.joined_info_f {
          border-color: #ecc22f;
        }
      }
    }
    .detail_act{
      display: flex;
      justify-content: space-around;
      align-items: stretch;
      flex-direction: column;
      .detail_act_score{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        font-size: 36px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        color: #ffffff;
        margin-top: 40px;
        border-width: 1px 0px 0px 0px;
        border-style: solid;
        border-color: rgba(119, 119, 119, 1);
        height: 100px;
        .detail_act_score_left{
          margin-left: 40px;
        }
        .detail_act_score_mid{

        }
        .detail_act_score_right{
          margin-right: 40px;
        }
      }
      .detail_act_players{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        font-size: 36px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        color: #ffffff;
        border-width: 1px 0px 0px 0px;
        border-style: solid;
        border-color: rgba(119, 119, 119, 1);
        height: 100px;
        .detail_act_players_lable{
          margin-left: 40px;
        }
        .detail_act_players_value{
          margin-right: 40px;
        }
      }
      .detail_act_bonuspool{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        font-size: 36px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        color: #ffffff;
        border-width: 1px 0px 0px 0px;
        border-style: solid;
        border-color: rgba(119, 119, 119, 1);
        height: 100px;
        .detail_act_bonuspool_lable{
          margin-left: 40px;
        }
        .detail_act_bonuspool_value{
          margin-right: 40px;
        }
      }
      .detail_act_winner{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        font-size: 36px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        color: #ffffff;
        border-width: 1px 0px 0px 0px;
        border-style: solid;
        border-color: rgba(119, 119, 119, 1);
        height: 100px;
        .detail_act_winner_lable{
          margin-left: 40px;
        }
        .detail_act_winner_value{
          margin-right: 40px;
        }

      }
      .detail_act_getuint{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        font-size: 36px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        color: #ffffff;
        border-width: 1px 0px 0px 0px;
        border-style: solid;
        border-color: rgba(119, 119, 119, 1);
        height: 100px;
        .detail_act_getuint_lable{
          margin-left: 40px;
          margin-top: 45px;
        }
        .detail_act_getuint_value{
          margin-right: 40px;
          margin-top: 45px;
        }
      }

    }
    .bet_act {
      display: flex;
      justify-content: space-around;
      align-items: stretch;
      flex-direction: column;

      .bet_act_BM {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        font-size: 30px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        color: #ffffff;

        border-width: 1px 0px 0px 0px;
        border-style: solid;
        border-color: rgba(119, 119, 119, 1);
        height: 100px;
        .bet_act_BM_label {
          margin-left: 40px;
        }
        .bet_act_BM_value {
          margin-right: 40px;
          .bet_act_BM_value_plus {
            border-color: #ecc22f;
            background-color: #272727;
            color: #fff;
            border-radius: 4px;
            border-width: 2px;
            border-style: solid;
            font-size: 36px;
            font-weight: bolder;
            text-align: center;
            height: 60px;
            width: 60px;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC",
              "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
              sans-serif;
          }
          .bet_act_BM_value_num {
            margin-left: 15px;
            margin-right: 15px;
            color: #fffffe;
            font-size: 36px;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC",
              "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
              sans-serif;
            //font-weight: bold;
          }
          .bet_act_BM_value_minus {
            border-color: #ecc22f;
            background-color: #272727;
            color: #fff;
            border-radius: 4px;
            border-width: 2px;
            border-style: solid;
            font-size: 36px;
            font-weight: bolder;
            text-align: center;
            height: 60px;
            width: 60px;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC",
              "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
              sans-serif;
          }
        }
      }
      .bet_act_ChooseWin {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        font-size: 30px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        color: #ffffff;
        margin-top: 40px;
        border-width: 1px 0px 0px 0px;
        border-style: solid;
        border-color: rgba(119, 119, 119, 1);
        height: 100px;
        .bet_act_ChooseWin_label {
          margin-left: 40px;
        }
        .bet_act_ChooseWin_value {
          margin-right: 40px;

          .bet_act_ChooseWin_value_left {
            border-color: #ecc22f;
            background-color: #272727;
            color: #fff;
            font-size: 30px;
            //font-weight: bold;
            width: 120px;
            height: 60px;
            text-align: center;
            align-items: center;
            text-align: center;
            vertical-align: middle;
            border-radius: 4px;
            border-width: 2px;
            border-style: solid;
            font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
            &.bet_act_ChooseWin_value_left_select{
              background-color:  #ecc22f;
              color: #2b2b2b;
            }
          }
          .bet_act_ChooseWin_value_right {
            border-color: #ecc22f;
            background-color: #272727;
            color: #fff;
            font-size: 30px;
            //font-weight: bold;
            width: 120px;
            height: 60px;
            text-align: center;
            align-items: center;
            text-align: center;
            vertical-align: middle;
            text-align: center;
            margin-left: 15px;
            border-radius: 4px;
            border-width: 2px;
            border-style: solid;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC",
              "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
              sans-serif;
            &.bet_act_ChooseWin_value_right_select{
            background-color:  #ecc22f;
            color: #2b2b2b;
            }
          }
        }
      }
      .bet_act_BI {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        font-size: 30px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        color: #ffffff;
        border-width: 1px 0px 0px 0px;
        border-style: solid;
        border-color: rgba(119, 119, 119, 1);
        height: 100px;
        .bet_act_BI_label {
          margin-left: 40px;
        }
        .bet_act_BI_value {
          margin-right: 40px;
          .bet_act_BI_value_num {
            border-color: #ecc22f;
            background-color: #272727;
            color: #fff;
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            align-items: center;
            text-align: center;
            vertical-align: middle;
            text-align: center;
            margin-left: 10px;
            width: 120px;
            height: 60px;
            border-radius: 4px;
            border-width: 2px;
            border-style: solid;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC",
              "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
              sans-serif;
            &.bet_act_BI_value_num_select{
            background-color:  #ecc22f;
            color: #2b2b2b;
            }
          }
        }
      }
      .bet_act_BP {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        font-size: 30px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        color: #ffffff;
        border-width: 1px 0px 0px 0px;
        border-style: solid;
        border-color: rgba(119, 119, 119, 1);
        height: 100px;
        .bet_act_BP_label {
          margin-left: 40px;
        }
        .bet_act_BP_value {
          margin-right: 40px;
          .bet_act_BP_value_plus {
            border-color: #ecc22f;
            background-color: #272727;
            color: #fff;
            border-radius: 4px;
            border-width: 2px;
            border-style: solid;
            font-size: 36px;
            font-weight: bolder;
            text-align: center;
            height: 60px;
            width: 60px;
            font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;

          }
          .bet_act_BP_value_num {
            margin-left: 15px;
            margin-right: 15px;
            color: #fffffe;
            font-size: 36px;
            font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
            //font-weight: bold;
          }
          .bet_act_BP_value_minus {
            border-color: #ecc22f;
            background-color: #272727;
            color: #fff;
            border-radius: 4px;
            border-width: 2px;
            border-style: solid;
            font-size: 36px;
            font-weight: bolder;
            text-align: center;
            height: 60px;
            width: 60px;
            font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
          }
        }
      }
      .bet_act_BP_betinfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        font-size: 30px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        color: #ffffff;
        border-width: 1px 0px 0px 0px;
        border-style: solid;
        border-color: rgba(119, 119, 119, 1);
        height: 100px;
        .bet_act_BP_beinfo_label {
          margin-left: 40px;
        }
        .bet_act_BP_beinfo_value {
          margin-right: 40px;
        }
      }
      .bet_act_BP_confirm {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        font-size: 30px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        color: #ffffff;
        border-width: 1px 0px 0px 0px;
        border-style: solid;
        border-color: rgba(119, 119, 119, 1);
        height: 100px;
        .bet_act_BP_confirm_label {
          margin-top: 45px;
          //display: flex;
          //align-self: center;
          margin-left: 40px;
        }
        .bet_act_BP_confirm_value {
          margin-top: 45px;
          margin-right: 40px;
          //display: flex;
          //align-self: flex-end;
          .bet_act_BP_confirm_err{
            margin-right: 15px;
            color: #ecc22f;
          }
          .bet_act_BP_confirm_value_C {
            color: #2b2b2b;
            background-color: #ecc22f;
            border-color: #ecc22f;
            border-radius: 4px;
            border-width: 2px;
            border-style: solid;
            font-size: 36px;
            font-weight: 450;
            text-align: center;
            height: 60px;
            width:180px;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC",
              "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
              sans-serif;
          }
        }
      }
    }
    .box_bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      font-size: 30px;
      font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
      color: #ffffff;
      margin-top: 40px;
      border-width: 1px 0px 0px 0px;
      border-style: solid;
      border-color: rgba(119, 119, 119, 1);
      height: 86px;
      .win_status{
       color: #777777;
      }
      .box_bottom_l {
        margin-left: 40px;
        width: 40%;
      }
      .box_bottom_r {
        margin-right: 40px;
        width: 40%;
        text-align: right;
      }
    }
    .bottom_more {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      font-size: 30px;
      font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
      color: #ffffff;
      border-width: 1px 0px 0px 0px;
      border-style: solid;
      border-color: rgba(119, 119, 119, 1);
      .dropdown_menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        font-size: 36px;
        font-family: "Microsoft YaHei", "微软雅黑","Helvetica Neue", Helvetica, "PingFang SC","Hiragino Sans GB",Arial,sans-serif;
        color: #ffffff;
        height: 80px;
        user-select: none;
        line-height: 80px;
      }
      .dropdown_show {
        width: 100%;
        .dropdown_list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          height: 80px;
          border-width: 1px 0px 0px 0px;
          border-style: solid;
          border-color: rgba(119, 119, 119, 1);
          .dropdown_list_l {
            margin-left: 40px;
            width: 40%;
          }
          .dropdown_list_r {
            margin-right: 40px;
            width: 40%;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
