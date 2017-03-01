<template>
    <div id='tabs'>
        <!--TAB 内容-->
        <mt-tab-container v-model='tab'>
            <mt-tab-container-item id='news'>
                <news></news>
            </mt-tab-container-item>
            <mt-tab-container-item id='talk'>
                talk tab content
            </mt-tab-container-item>
            <mt-tab-container-item id='cang'>
                cang tab content
            </mt-tab-container-item>
            <mt-tab-container-item id='about'>
                about
            </mt-tab-container-item>
        </mt-tab-container>
        <!-- 底部TAB -->
        <mt-tabbar v-model='tab' fixed>
            <mt-tab-item id='news'>
                <i slot="icon" class="fa fa-newspaper-o" aria-hidden="true"></i>
                新闻
            </mt-tab-item>
            <mt-tab-item id='talk'>
                <i slot="icon" class="fa fa-smile-o" aria-hidden="true"></i>
                不得姐
            </mt-tab-item>
            <mt-tab-item id='cang'>
                <i slot="icon" class="fa fa-pencil-square-o" aria-hidden="true"></i>
                藏头诗
            </mt-tab-item>
            <mt-tab-item id='about'>
                <i slot="icon" class="fa fa-question-circle-o" aria-hidden="true"></i>
                关于
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
import store from '../vuex/store.js'
import news from './news.vue'
export default{
  name: 'tabs',
  data () {
    return {
      tab: 'news'
    }
  },
  created: function () {
  },
  computed: {
  },
  methods: {
  },
  components: {
    news
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
