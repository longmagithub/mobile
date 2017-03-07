<template>
  <div id = 'history'>
    <mt-header fixed title="历史上的今天">
    </mt-header>

    <mt-swipe :show-indicators="false" :auto="0" >
      <mt-swipe-item>
        <div class='swipe-items-wrap'>
          <div class='card'>
            <p>世乒赛中国男女乒双双夺冠</p>
            <span>2016-3-6<span>
            <img src='http://img.lssdjt.com/201603/08092053630.jpg'></img>
          </div>
        </div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div class='swipe-items-wrap'>
          <h2>222222</h2>
        </div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div class='swipe-items-wrap'>
          <h2>333333</h2>
        </div>
      </mt-swipe-item>
    </mt-swipe>
    ?????
  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui'
import Vue from 'vue'
import store from '../vuex/store.js'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
  name: 'history',
  data () {
    return {

    }
  },
  computed: {
    cardList: function () {
      this.$store.state.history.cardList
    }
  },
  store: store
}
</script>
<style scoped>
#history{
  width: 100%;
  height: calc(100vh - 40px - 55px);
}
.swipe-items-wrap{
  box-sizing:border-box;
  height: calc(100vh - 40px - 55px);
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card{
  
  box-sizing:border-box;
  width: 80%;
  padding: 10px;
  border: 1px solid lightgray;
}
.card>p {
  font-size: 1.4rem;
}
</style>
