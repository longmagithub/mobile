<template>
    <div id='tabs'>
        <!--TAB 内容-->
        <mt-tab-container v-model='tab'>
            <mt-tab-container-item id='news'>
                <news></news>
            </mt-tab-container-item>
            <mt-tab-container-item id='history'>
                <history></history>
            </mt-tab-container-item>
            <mt-tab-container-item id='cang'>
                <cang></cang>
            </mt-tab-container-item>
            <mt-tab-container-item id='about'>
                <about></about>
            </mt-tab-container-item>
        </mt-tab-container>
        <!-- 底部TAB -->
        <mt-tabbar v-model='tab' fixed>
            <mt-tab-item id='news'>
                <i slot="icon" class="fa fa-lg fa-newspaper-o" aria-hidden="true"></i>
                新闻
            </mt-tab-item>
            <mt-tab-item id='history'>
                <i slot="icon" class="fa fa-lg fa-calendar" aria-hidden="true"></i>
                历史
            </mt-tab-item>
            <mt-tab-item id='cang'>
                <i slot="icon" class="fa fa-lg fa-pencil-square-o" aria-hidden="true"></i>
                藏头诗
            </mt-tab-item>
            <mt-tab-item id='about'>
                <i slot="icon" class="fa fa-lg fa-question-circle-o" aria-hidden="true"></i>
                关于
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import store from '../vuex/store.js'
import news from './news.vue'
import history from './history.vue'
import cang from './cang.vue'
import about from './about.vue'
export default{
  name: 'tabs',
  data () {
    return {
      tab: store.state.tab
    }
  },
  created: function () {
  },
  computed: {
  },
  watch: {
      tab: function (newTab) {
          // console.log(newTab)
          store.dispatch('setTab', newTab)
          if (newTab === 'history' && this.$store.state.history.cardList.length === 0) {
              store.dispatch('loadHistory')
              Toast({
                message: '左右滑动浏览更多',
                position: 'top',
                duration: 1000
              })
          }
      }
  },
  methods: {
  },
  components: {
    news,
    history,
    cang,
    about
  },
  store: store
}
</script>
<style scoped>
#tabs{
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 55px;
}
</style>
