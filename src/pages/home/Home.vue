<template>
  <div class="home">
    <div>{{homelists}}</div>
    <div class="info-container" v-for="item in homelist">
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
import {fetchRoundList} from "../../scatter/scatter.js"
import {getScatterEOS} from "../../scatter/scatter.js"

const ERR_OK = 0
export default {
  data () {
    return {
      homelist: [],
      homelists: []
    }},

  created() {
    axios.get('/api/home').then((res) => {
      res = res.data
      if (res.errno === ERR_OK) {
        this.homelist = res.data
      }
    }).catch((error) => {
      console.warn(error)
    });
    fetchRoundList().then(response => {
     this.homelists = response
     console.log(this.homelists)
     })
    //this.$store.dispatch('setScatterEOS');
  },
  components: {
    "info": Info,
    "switch-button": SwitchButton
  },
  methos:{

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
  }
</style>
