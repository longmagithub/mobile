<template>
        <mt-loadmore :top-method='refreshNews'         
        ref="loadmore">
            <div id='newsList' class='top_line'>
                <div v-for='(item, index) in list' 
                    v-on:click='selectNews(index)' 
                    class="list_item bottom_line">
                    <div class='title'>{{item.title}}</div>
                    <div class="desc">
                        {{item.desc}}   
                    </div>
                    <div class="source_date">
                        <span>{{item.pubDate}}</span>
                        <span>{{item.source}}</span>
                    </div>
                </div>
                <mugen-scroll :handler="loadMoreNews" :should-handle="shouldLoadMore">
                    加载中...
                </mugen-scroll>
            </div>
        </mt-loadmore> 
    
</template>
<script>
// import axios from 'axios'
import Vue from 'vue'
import { Loadmore, Popup } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore, Popup.name, Popup)
import MugenScroll from 'vue-mugen-scroll'
import store from '../../vuex/store.js'
export default {
  name: 'newsList',
  data () {
    return {
    }
  },
  created: function () {
    // this.loadNews()
  },
  computed: {
    list: function () {
      return this.$store.state.news.newsList
    },
    shouldLoadMore: function () {
      return !this.$store.state.news.allLoaded
    },
    selectedNews: function () {
      return this.$store.state.news.newsList[this.$store.state.news.currentNews] || null
    },
    ifShow: function () {
      return this.$store.state.news.showDetail
    }
  },
  methods: {
    loadNews: function () {
      store.dispatch('loadNews')
    },
    refreshNews: function () {
      if (this.$store.state.news.isLoading) {
        return
      }
      store.dispatch('setPageNum', 1)
      this.loadNews()
      this.$refs.loadmore.onTopLoaded()
    },
    loadMoreNews: function () {
      if (this.$store.state.news.isLoading) {
        return
      }
      this.loadNews()
      // this.$refs.loadmore.onBottomLoaded()
    },
    selectNews: function (index) {
      store.dispatch('setSelectedNews', index)
      store.dispatch('setShowDetail', true)
    }
  },
  components: {MugenScroll},
  store: store
}
</script>
<style scoped>
#newsList{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    /* 增加该属性，可以增加弹性 */
    -webkit-overflow-scrolling: touch;
}
.mint-loadmore{
    margin-top: 43px;
    margin-bottom: 55px;
}
.mugen-scroll{
    text-align: center;
    padding: 5px 0;
}
.list_item{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 8px 22px;
}
.title{
    font-size: 1.2rem;
    line-height: 1.4;
    text-overflow:ellipsis; 
    white-space:nowrap; 
    overflow:hidden; 
}
.desc{
    font-size: .8rem;
    line-height: 1.6;
    color: grey;    
    text-overflow:ellipsis; 
    white-space:nowrap; 
    overflow:hidden; 
}
.source_date{
    display: flex;
    justify-content: space-between;
    font-size: .6rem;
    color: grey;    
}
/* Modal */

</style>
