import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Toast, Indicator } from 'mint-ui'
import config from '../assets/config.js'
Vue.use(Vuex)
// Vue.use(MintUI)
const moduleNews = {
  state: config.newsConfig,
  getters: {},
  mutations: {
    selectChannel (state, index) {
      if (index !== state.currentChannel) {
        state.chanList[state.currentChannel].selected = false
        state.chanList[state.currentChannel].type = 'default'
        state.chanList[index].selected = true
        state.chanList[index].type = 'primary'
        state.currentChannel = index
        state.PAGENUM = 1
        state.allLoaded = false
      }
    },
    setChannel (state, chns) {
      state.chanList = chns
    },
    setNewsList (state, array) {
      state.newsList = array
    },
    setPageNum (state, num) {
      state.PAGENUM = num
    },
    setAllLoaded (state, isAllLoaded) {
      state.allLoaded = isAllLoaded
    },
    setLoading (state, loading) {
      state.isLoading = loading
    },
    setShowDetail (state, ifShow) {
      state.showDetail = ifShow
    },
    setSelectedNews (state, index) {
      state.currentNews = index
    }
  },
  actions: {
    selectChannel (context, index) {
      if (index !== context.state.currentChannel) {
        context.commit('selectChannel', index)
        /*
        context.commit('setPageNum', 1)
        let setting = {
          channelId: context.state.chanList[context.state.currentChannel].id,
          page: context.state.PAGENUM,
          maxResult: context.state.PAGESIZE
        }
        axios.get(config.apiList.NEWSLIST_API, config.axiosConfig.getGETConfig(setting))
        .then(function (response) {
        })
        .catch(function (error) {
          Toast({
            message: '连接异常，请检查网络',
            duration: 1000
          })
          console.log(error)
        })
        */
      }
    },
    setChannel (context, chns) {
      context.commit('setChannel', chns)
    },
    setPageNum (context, num) {
      context.commit('setPageNum', num)
    },
    setShowDetail (context, ifShow) {
      if (ifShow) {
        context.commit('setLoading', true)
      } else {
        context.commit('setLoading', false)
      }
      context.commit('setShowDetail', ifShow)
    },
    setSelectedNews (context, index) {
      context.commit('setSelectedNews', index)
    },
    updateChannel (context) {
      axios.get(config.apiList.NEWSCHANNEL_API, config.axiosConfig.getGETConfig({}))
      .then(function (response) {
        if (response.data.showapi_res_code === 0) {
          response = response.data.showapi_res_body.channelList
          let result = [
            {
              'text': '全部',
              'type': 'primary',
              'selected': true,
              'id': null
            }
          ]
          response.forEach(function (value) {
            let aChannel = {
              text: value.name,
              type: 'default',
              selected: false,
              id: value.channelId
            }
            result.push(aChannel)
          })
          // store.dispatch('setChannel', result)
          context.commit('setChannel', result)
        } else {
          Toast({
            message: response.data.showapi_res_error,
            duration: 1000
          })
        }
      })
      .catch(function (error) {
        Toast({
          message: '连接异常，请检查网络',
          duration: 1000
        })
        console.log(error)
      })
    },
    loadNews (context) {
      if (context.state.isLoading) {
        return
      }
      let setting = {
        channelId: context.state.chanList[context.state.currentChannel].id,
        page: context.state.PAGENUM,
        maxResult: context.state.PAGESIZE
      }
      Indicator.open()
      context.commit('setLoading', true)
      axios.get(config.apiList.NEWSLIST_API, config.axiosConfig.getGETConfig(setting))
        .then(function (response) {
          context.commit('setLoading', false)
          Indicator.close()
          if (response.data.showapi_res_code === 0) {
            console.log(response)
            if (response.data.showapi_res_body.pagebean.currentPage >= response.data.showapi_res_body.pagebean.allPages) {
              context.commit('setAllLoaded', true)
            }
            let list = response.data.showapi_res_body.pagebean.contentlist
            let result = []
            list.forEach(function (value) {
              let aNews = {
                title: value.title,
                link: value.link,
                pubDate: value.pubDate,
                source: value.source,
                desc: value.desc.replace(/ /g, '').trim(),
                html: value.html
              }
              result.push(aNews)
            })
            if (context.state.PAGENUM === 1) {
              context.commit('setNewsList', [])
            }
            context.commit('setNewsList', context.state.newsList.concat(result))
            context.commit('setPageNum', context.state.PAGENUM + 1)
          } else {
            Toast({
              message: response.data.showapi_res_error,
              duration: 1000
            })
          }
        })
        .catch(function (error) {
          context.commit('setLoading', false)
          Indicator.close()
          Toast({
            message: '连接异常，请检查网络',
            duration: 1000
          })
          console.log(error)
        })
    }
  }
}
export default new Vuex.Store({
  modules: {
    news: moduleNews
  }
})
