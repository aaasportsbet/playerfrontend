<template>
<div class="info">
  <div class="count_down" :class="[$route.name === 'personal' ? 'count_down_display_none' : '']">
    <div class="count_down_top_flex">
      <div class="icon-clock count_down_top_clock"></div>
      <div class="count_down_top">Count Down</div>
    </div>
    <div class="count_down_bottom">
      {{message}}
      <count-down class="count_down_time" v-on:start_callback="countDownS_cb(1)" v-on:end_callback="countDownE_cb(1)" :startTime="startTime" :endTime="endTime"   :tipText="'距离开始'" :tipTextEnd="'距离结束'" :endText="'已经结束'" :dayTxt="':'" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"  ></count-down>
    </div>
  </div>
  <div class="game_win_status" :class="[$route.name === 'home' ? 'game_win_status_display_none' : '']">
    <div class="game_win_status_win" v-if="info.game_win_status === 'win'">
      <div class="game_win_status_win_text">Win</div>
    </div>
    <div class="game_win_status_lose" v-if="info.game_win_status === 'lose'">
      <div class="game_win_status_lose_text">Lose</div>
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
    <div class="info_play" >
      <div class="detail_play">
        <span class="detail_play_top">[{{info.game_contract_type}}&nbsp;{{info.game_round_type_i18n_serv_type}}]</span>
        <span class="detail_play_bottom">Match Time: {{info.game_count_down_time_serv_bet_end_time}}</span>
        <span class="detail_play_bottom">Join with {{info.game_join_bet_serv_bet_unit}}</span>
      </div>
      <div class="joined_info joined_info_detail" v-if="info.game_joined_status.index === 'View Detail'">
          {{info.game_joined_status.value}}
      </div>

      <div class="joined_info" :class="[info.game_joined_status.index === 0 ? 'joined_info_f' : '']" v-else>
        <div class="joined_info_top">{{info.game_joied_num_serv_shares}} Joined</div>
        <div class="joined_info_bottom" v-if="info.game_joined_status.index !== 0">
          {{info.game_joined_status.value}}
        </div>
        <div @click="dialogVisible = true" class="joined_info_bottom joined_info_bottom_f" v-else>
          {{info.game_joined_status.value}}
        </div>

          <el-dialog
            title="Join Info"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>这是投注信息</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">Cancle</el-button>
              <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
            </span>
          </el-dialog>
      </div>
    </div>
    <div class="box_bottom" v-show="info.game_joined_latest !== 0">
       <span class="box_bottom_l">{{info.game_joined_latest.team_name}} Win {{info.game_joined_latest.team_score}} Score </span>
       <span class="box_bottom_r">{{info.game_joined_latest.share}}</span>
    </div>
    <div style="height:16px;" v-show="info.game_joined_latest === 0"></div>
    <div class="bottom_more" v-show="info.game_joined_latest !== 0 && info.game_joined_more_display === true" v-clickoutside="handleClose">
       <div class="el-icon-caret-bottom dropdown_menu" @click="show = !show">&nbsp;More</div>
                <div class="dropdown_show"  v-show = "show">
                    <div class="dropdown_list" v-for="item in list_playmore">
                      <span class="dropdown_list_l">{{item.team_name}} Win {{item.team_score}} Score </span>
                      <span class="dropdown_list_r">{{item.share}}</span>
                    </div>
                </div>
    </div>
  </div>


</div>
</template>

<script>
import CountDown from 'vue2-countdown'
export default {
  data() {
        return {
            show:false,
            list_playmore:  this.info.game_joined_more,
            startTime:( new Date() ).getTime()+(100*100),
            endTime:( new Date() ).getTime()+(100*100),
            message:'',
            dialogVisible: false
        }
    },
  props: {
    info: {
      type: Object
    }
  },
  computed:{

  },
  components: {
    CountDown
  },
  methods: {
    goDetailPage: function (info) {
        this.$store.dispatch('goDetailPage',{id:info.id})
        this.$store.dispatch('toggleheader',{nickname:info.nickname})
    },
    handleClose(){
        this.show = false;
      },
      handleCloseJoin(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    countDownS_cb: function (x) {
        this.message = 'Stop Betting'
        console.log(x)
      },
    countDownE_cb: function (x) {
        this.message = 'Stop Betting'
        console.log(x)
      }

  },
     directives:{
        clickoutside:{
            bind:function(el,binding,vnode){
                function documentHandler(e){
                    if(el.contains(e.target)){
                        return false;
                    }
                    if(binding.expression){
                        binding.value(e)
                    }
                }
                el._vueClickOutside_ = documentHandler;
                document.addEventListener('click',documentHandler);
            },
            unbind:function(el,binding){
                document.removeEventListener('click',el._vueClickOutside_);
                delete el._vueClickOutside_;
            }
        }
    }
}
</script>

<style lang="less">
@baseBackgroundColor:#333333;
@baseBorderColor:#777777;
[v-cloak] {
        display: none;
    }
.info {
    position: relative;
    width: 1080px;
    background-color: #222222;
  .count_down{
    position:absolute;
    display: flex;
    justify-content:start;
    align-items: center;
    flex-direction: column;
    width: 200px;
    height: 113px;
    left:40px;
    top:-20px;
    margin-left: 40px;
    background: url(../../assets/image/img_top_flag.png) no-repeat 0px 0px;
    background-size: 200px 113px;
    text-align: center;
    &.count_down_display_none {
      display: none;
    }

    .count_down_top_flex{
      display: flex;
      justify-content:center;
      align-items: center;
      flex-direction: row;

      .count_down_top{
        height: 25px;
        font-size: 25px;
        font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
        color: #777777;
        line-height: 25px;
        padding-left: 5px;
        margin-top: 10px;
      }
      .count_down_top_clock{
        margin-top: 10px;
        height: 25px;
        width: 25px;
        font-size: 20px;
        color: #FFFFFF;
        line-height: 25px;
        margin-top: 10px;

      }

    }
      .count_down_bottom{
        width: 90%;
      font-size: 28px;
      font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
      font-weight: bold;
      color: gray;
      line-height: 50px;
      //font-style: normal;
      .count_down_time{
        font-size: 28px;
        font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
        font-weight: bold;
        color: #ECC22F;
        line-height: 50px;
        font-style: normal;
      }
      //background-color: #FFFFFE;
       }

  }
  .game_win_status{
    position:absolute;
    top:0px;
    left:40px;
    width: 150px;
    height: 150px;
    font-size: 36px;
    color: #FFFFFF;
    font-family: "\5FAE\8F6F\96C5\9ED1",Arial,Helvetica,Tahoma,Verdana,STHeiTi,simsun,sans-serif;
    &.game_win_status_display_none{
      display: none;
    }
    .game_win_status_win{
        background: url(../../assets/image/img_win.png) no-repeat 0px 0px;
        background-size: 150px 150px;
        width: 150px;
        height: 150px;
        .game_win_status_win_text{
          transform: rotate(315deg);
          font-weight: bolder;
          text-align: bottom;
          }
    }
    .game_win_status_lose{
        background: url(../../assets/image/img_lose.png) no-repeat 0px 0px;
        background-size: 150px 150px;
        width: 150px;
        height: 150px;
        .game_win_status_lose_text{
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
          .left_vs_play{
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
              color: #FFFFFE;
              .left_text_i18n{
                    font-size: 40px;
                    font-weight: bold;
                    font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
              }
              .left_text_abbr{
                margin-top: 30px;
                font-size: 36px;
                font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
                color: rgba(119, 119, 119, 0.4);
              }
          }
          .icon_vs_play{
            width: 80px;
            height: 80px;
            background: inherit;
            background-color: rgba(255, 255, 255, 0);
            border: none;
            border-radius: 0px;
            color:#ECC22F;
            font-size: 36px;
            font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
            font-weight: bold;
            margin-top: 120px;
            text-align: center;
          }
          .right_vs_play{
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
              color: #FFFFFE;
              .right_text_i18n{
                    font-size: 40px;
                    font-weight: bold;
                    font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
              }
              .right_text_abbr{
                margin-top: 30px;
                font-size: 36px;
                font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
                color: rgba(119, 119, 119, 0.4);
              }
          }
        }
        .info_play{
          font-size: 36px;
          font-weight: 400;
          display: flex;
          justify-content:space-between;
          align-items: center;
          flex-direction: row;
          margin-top: 40px;
          margin-left: 40px;

          .detail_play{
            display: flex;
            justify-content:space-between;
            align-items: left;
            flex-direction: column;
            height: 140px;
            .detail_play_top{
              font-size: 30px;
              font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
              color:#FFFFFF;
            }
            .detail_play_bottom{
              font-size: 30px;
              font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
              color:#777777;
            }

          }
          .joined_info{
            display: flex;
            justify-content:center;
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
            &.joined_info_detail{
              border-color: #ECC22F;
              background-color:#ECC22F;
              font-size: 30px;
              font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
              color:#2B2B2B;
              font-weight: bold;
            }
            .joined_info_top{
              background-color: rgba(43, 43, 43, 1);
              font-size: 25px;
              font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
              color:#ECC22F;
              height: 70px;
              width: 280px;
              text-align: center;
              line-height: 70px;
            }
            .joined_info_bottom{
              background-color:rgba(119, 119, 119, 1);
              font-size: 30px;
              font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
              color:#2B2B2B;
              font-weight: bold;
              height: 70px;
              width: 280px;
              text-align: center;
              line-height: 70px;
              &.joined_info_bottom_f{
               background-color:#ECC22F;
              }
            }
            &.joined_info_f{
              border-color: #ECC22F;

            }
          }
        }
       .box_bottom{
          display: flex;
          justify-content:space-between;
          align-items: center;
          flex-direction: row;
          font-size: 30px;
          font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
          color:#FFFFFF;
          margin-top: 40px;
          border-width: 1px 0px 0px 0px;
          border-style: solid;
          border-color: rgba(119, 119, 119, 1);
          height: 86px;

          .box_bottom_l{
            margin-left: 40px;

          }
          .box_bottom_r{
            margin-right: 40px;

          }
        }
        .bottom_more{
          position: relative;
          display: flex;
          justify-content:space-between;
          align-items: center;
          flex-direction: column;
          font-size: 30px;
          font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
          color:#FFFFFF;
          border-width: 1px 0px 0px 0px;
          border-style: solid;
          border-color: rgba(119, 119, 119, 1);
          .dropdown_menu{
            display: flex;
            justify-content:space-between;
            align-items: center;
            flex-direction: row;
            font-size: 36px;
            font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
            color:#FFFFFF;
            height: 80px;
            user-select: none;
            line-height: 80px;
          }
          .dropdown_show{
            width: 100%;
            .dropdown_list{
              display: flex;
              justify-content:space-between;
              align-items: center;
              flex-direction: row;
              height: 80px;
              border-width: 1px 0px 0px 0px;
              border-style: solid;
              border-color: rgba(119, 119, 119, 1);
              .dropdown_list_l{
                margin-left: 40px;
              }
              .dropdown_list_r{
                margin-right: 40px;
              }
            }
          }
        }

    }


}
</style>
