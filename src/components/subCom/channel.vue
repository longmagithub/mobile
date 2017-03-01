<template>
    <div id='channel' >
        <mt-button size='small' v-bind:type='chan.type' 
        v-for='(chan, index) in chanList' 
        v-on:click='selectChannel(index)'>
          {{chan.text}}
        </mt-button>
    </div>
</template>
<script>
// import axios from 'axios'
import store from '../../vuex/store.js'
// import config from '../../assets/config.js'
export default {
  name: 'channel',
  data () {
    return {
    }
  },
  created: function () {
    this.updateChannel()
  },
  methods: {
    selectChannel: function (index) {
      if (this.$store.state.news.isLoading) {
        return
      }
      if (index !== this.$store.state.news.currentChannel) {
        window.scrollTo(0, 0)
        store.dispatch('selectChannel', index)
        store.dispatch('loadNews')
      }
    },
    updateChannel: function () {
      store.dispatch('updateChannel')
    }
  },
  computed: {
    chanList: function () {
      return this.$store.state.news.chanList
    },
    ifShow: function () {
      return this.$store.state.news.showDetail
    }
  },
  components: {
  },
  store: store
}
</script>
<style scoped>
#channel {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
    /* 增加该属性，可以增加弹性 */
    -webkit-overflow-scrolling: touch;
    padding: 5px 4px;
    background-color: white;
    position: fixed;
    top: 40px;
}
#channel>button{
    flex-shrink: 0;
}
</style>
