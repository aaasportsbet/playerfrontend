<template>
<div class="info">
  <div class="count_down">
    <div class="count_down_top_flex">
      <div class="icon-clock count_down_top_clock"></div>
      <div class="count_down_top">Count Down</div>
    </div>
    <div class="count_down_bottom">{{info.play_count_down_time}}</div>
  </div>
  <div class="box">
    <div class="vs_play">
      <div class="left_vs_play">
        <span class="left_text_en">{{info.play_info_left_en}}</span>
        <span class="left_text_cn">({{info.play_info_left_cn}})</span>
      </div>
      <div class="icon_vs_play">VS</div>
      <div class="right_vs_play">
        <span class="right_text_en">{{info.play_info_right_en}}</span>
        <span class="right_text_cn">({{info.play_info_right_cn}})</span>
      </div>
    </div>
    <div class="info_play" >
      <div class="detail_play">
        <span class="detail_play_top">[{{info.play_contract_type}}]</span>
        <span class="detail_play_bottom">Match Time: {{info.play_match_time}}</span>
        <span class="detail_play_bottom">Join with {{info.play_join_ad}}</span>
      </div>
      <div class="joined_info" :class="[info.joined === 'false' ? 'joined_info_f' : '']">
        <div class="joined_info_top">{{info.play_join_num}} Joined</div>
        <div class="joined_info_bottom" v-if="info.joined === 'true'">
          You Joined
        </div>
        <div class="joined_info_bottom joined_info_bottom_f" v-else>
          Join Now
        </div>
      </div>
    </div>
    <div class="box_bottom">
       <span class="box_bottom_l">{{info.play_join_news}}</span>
       <span class="box_bottom_r">{{info.play_join_news_num}}</span>
    </div>
  </div>
  <div class="bottom_more">
    <el-row>
      <el-col :span="24" >
        <el-menu default-active="2" @open="handleOpen" @close="handleClose" >
          <el-submenu index="1" >
            <template slot="title">
              <span>更多</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <div class="box_bottom">
                   <span class="box_bottom_l">{{info.play_join_news}}</span>
                   <span class="box_bottom_r">{{info.play_join_news_num}}</span>
                </div>
              </el-menu-item>
              <el-menu-item index="1-2"><div class="box_bottom">
       <span class="box_bottom_l">{{info.play_join_news}}</span>
       <span class="box_bottom_r">{{info.play_join_news_num}}</span>
    </div></el-menu-item>
            </el-menu-item-group>
            </el-submenu>
            </el-menu>
      </el-col>
    </el-row>
  </div>

</div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  },
  computed:{

  },
  components: {
  },
  methods: {
    goDetailPage: function (info) {
        this.$store.dispatch('goDetailPage',{id:info.id})
        this.$store.dispatch('toggleheader',{nickname:info.nickname})
    }
  }
}
</script>

<style lang="less">
@baseBackgroundColor:#333333;
@baseBorderColor:#777777;

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
      font-size: 36px;
      font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
      font-weight: bold;
      color: #ECC22F;
      line-height: 60px;
      //background-color: #FFFFFE;
       }

  }
  .box {
      width: 1000px;
      height: 570px;
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
              .left_text_en{
                    font-size: 40px;
                    font-weight: bold;
                    font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
              }
              .left_text_cn{
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
              .right_text_en{
                    font-size: 40px;
                    font-weight: bold;
                    font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
              }
              .right_text_cn{
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

    }
    .bottom_more{
      width: 1000px;
      height: auto;
      background: inherit;
      background-color: rgba(39, 39, 39, 1);
      box-sizing: border-box;
      border-width: 0 2px 2px 2px;
      border-style: solid;
      border-color: rgba(119, 119, 119, 1);
      border-radius: 4px;
      box-shadow: none;
      margin-left: 40px;
      .bottom_more_menu{
        background-color:  rgba(39, 39, 39, 1);;
        text-color:#FFFFFF;
        active-text-color:"#ffd04b";
        height: 80px;
      }
      .bottom_more_text{
        height: 40px;
      }

    }

}
</style>
