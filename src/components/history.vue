<template>
  <div id = 'history'>
    <mt-header fixed title="历史上的今天">
    </mt-header>

    <mt-swipe :show-indicators="false" :auto="0" >
      <mt-swipe-item v-for='item in cardList'>
        <div class='swipe-items-wrap'>
          <div class='card'>
            <p>{{item.title}}</p>
            <span>{{item.year}}-{{item.month}}-{{item.day}}</span><br>
            <img v-if='item.img' :src='item.img'></img>
            <img v-if='!item.img' src='../assets/img/history.jpg'></img>
          </div>
        </div>
      </mt-swipe-item>      
    </mt-swipe>

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
      return this.$store.state.history.cardList
    }
  },
  method: {
  },
  store: store
}
</script>
<style scoped>
#history{
  width: 100%;
  height: calc(100vh - 40px - 55px);
  padding-bottom: 0;
  background: url('../assets/img/wall-bg.jpg');
  background-size: 100% 100%;
}
.swipe-items-wrap{
  box-sizing:border-box;
  min-height: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card{  
  box-sizing:border-box;
  width: 85%;
  padding: 10px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #ccc;
  position: relative;
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  background-color: #f8f8f8
}
.card>p {
  font-size: 1.4rem;
}
.card>img{
  margin: auto;
}
.card:before, 
.card:after{
	content:"";
  position:absolute; 
  z-index:-1;
  box-shadow:0 0 20px rgba(0,0,0,0.8);
  top:10px;
  bottom:10px;
  left:0;
  right:0;
  border-radius:100px / 10px;
} 
.card:after{
	right:10px; 
  left:auto;
  -webkit-transform:skew(8deg) rotate(3deg); 
  -moz-transform:skew(8deg) rotate(3deg);     
  -ms-transform:skew(8deg) rotate(3deg);     
   -o-transform:skew(8deg) rotate(3deg); 
  transform:skew(8deg) rotate(3deg);
}
</style>
