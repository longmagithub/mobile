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
                // desc: value.desc.replace(/ /g, '').trim(),
                desc: value.desc,
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
const moduleCang = {
  state: config.cangConfig,
  getters: {},
  mutations: {
    setLoading (state, loading) {
      state.isLoading = loading
    },
    setResultList (state, arr) {
      state.resultList = arr
    }
  },
  actions: {
    generateCang (context, params) {
      if (context.state.isLoading) {
        return
      }
      let key = params.key
			if (key === undefined || key === null || key.length === 0) {
        Toast({
          message: '内容不能为空',
          duration: 800
        })
        return
			}
      const pattern = new RegExp('^[\u4e00-\u9fa5]{0,}$')
      if (!pattern.test(key)) {
        Toast({
          message: '请输入汉字',
          duration: 800
        })
        return
      }
      let setting = {
        num: params.num,
        type: params.type,
        yayuntype: params.yayun,
        key: params.key
      }
      Indicator.open()
      context.commit('setLoading', true)
      axios.get(config.apiList.CANG_API, config.axiosConfig.getGETConfig(setting))
      .then(function (response) {
        context.commit('setLoading', false)
        Indicator.close()
        if (response.data.showapi_res_code === 0) {
          if (response.data.showapi_res_body.list.length === 0) {
            Toast({
              message: '生成失败，换内容再试试？',
              duration: 800
            })
            context.commit('setResultList', [])
            return
          } else {
            Toast({
              message: '生成成功！',
              duration: 500
            })
          }
          let resultList = []
          for (let item of response.data.showapi_res_body.list) {
            let arr = item.replace(/[，。]/g, ' ').trim().split(' ')
            resultList.push(arr)
          }
          context.commit('setResultList', resultList)
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
const moduleHistory = {
  state: config.historyConfig,
  getters: {},
  mutations: {
    setCardList (state, list) {
      state.cardList = list
    }
  },
  actions: {
    loadHistory (context) {
      axios.get(config.apiList.HISTORY_API, config.axiosConfig.getGETConfig({}))
        .then(function (response) {
          if (response.data.showapi_res_code === 0) {
            context.commit('setCardList', response.data.showapi_res_body.list)
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
    }
  }
}
const state = {
  tab: 'news'
}
const mutations = {
  setTab (state, index) {
    state.tab = index
  }
}
const actions = {
  setTab (context, index) {
    context.commit('setTab', index)
  }
}
export default new Vuex.Store({
  modules: {
    news: moduleNews,
    cang: moduleCang,
    history: moduleHistory
  },
  state,
  mutations,
  actions
})
