<template>
    
            <mt-popup
            v-model="ifShow"
            modal='false'
            closeOnClickModal=false
            position="right">
                <div id='newsDetail'>
                <!--
                    <div id='header' class='bottom_line top_line'>
                        <p class='openWin' v-on:click='goSource'>查看原文</p>
                        <p v-on:click='closeShow'><i class="fa fa-times" aria-hidden="true"></i>关闭</p>
                    </div>
                    -->
                    <mt-header fixed title="新闻详情" id='detail-header'>
                        <p class='openWin' slot="left" v-on:click='goSource'>查看原文</p>
                        <p v-on:click='closeShow' slot="right"><i class="fa fa-times" aria-hidden="true"></i>关闭</p>
                    
                    </mt-header>
                    <span id='content-top'></span>
                    <div id='content' v-html='selectedNews.html || "暂无内容"'>
                    </div>
                    <!--
                    <div id='header' class='bottom_line top_line'>
                        <p class='openWin' v-on:click='goSource'>查看原文</p>
                        <p v-on:click='closeShow'><i class="fa fa-times" aria-hidden="true"></i>关闭</p>
                    </div>
                    -->
                </div>
            </mt-popup>
    
</template>
<script>
import { Header } from 'mint-ui'
import Vue from 'vue'
import store from '../../vuex/store.js'
Vue.component(Header.name, Header)
export default {
  name: 'newsDetail',
  data () {
    return {}
  },
  created: function () {},
  computed: {
    selectedNews: function () {
      let emptyNews = {
        title: '',
        link: '',
        html: '',
        desc: '',
        source: ''
      }
      return this.$store.state.news.newsList[this.$store.state.news.currentNews] || emptyNews
    },
    ifShow: function () {
      return this.$store.state.news.showDetail
    }
  },
  methods: {
    goSource: function () {
      window.open(this.selectedNews.link)
    },
    closeShow: () => {
      document.getElementById('content-top').scrollIntoView(true)
      document.getElementById('content').scrollTop = 0
      store.dispatch('setShowDetail', false)
    }
  },
  store: store
}

</script>
<style scoped>
#newsDetail{
    box-sizing:border-box;
    width: 100vw;
    height: 100%;
    background-color: #F8F8F8;
    z-index:2;
    overflow-y: scroll;
    /* 增加该属性，可以增加弹性 */
    -webkit-overflow-scrolling: touch;
}
#header{
    box-sizing:border-box;
    position: relative;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ecf6fb;
    padding: 0 15px;
    z-index: 2;
    font-size: .8rem;
}
.header {
    background-color: #ecf6fb;
    z-index: 2;
    font-size: .8rem;
}
#content{
    position: relative;
    top: 0;
    box-sizing:border-box;
    width: 90%;
    height: calc( 100vh - 90px );
    margin-left: 5%;    
    margin-top: 55px;
    margin-bottom: 20px;
    background-color: white;
    padding: 5px 15px;
    border: 1px solid #DDDDDD;
    overflow-y: scroll;
    /* 增加该属性，可以增加弹性 */
    -webkit-overflow-scrolling: touch;
}
#content>p>img {
    width: 100%;
}
.openWin{
    font-size: .8rem;
}
/* Animation */

</style>
