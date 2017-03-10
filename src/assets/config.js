  // APP 级别参数
  const SECRET = '3a42073e4999499886ff6f59a137f24e'
  const APPID = 32631

  // AXIOS 参数
  const TIMEOUT = 6000
  // 模块级别参数
  let newsConfig = {
    chanList: [
      {
        'text': '全部',
        'type': 'primary',
        'selected': true,
        'id': null
      }
    ],
    newsList: [
      {
        'title': '漳州足球大数据：拥有足球特色学校91所国家级46所',
        'link': 'http://m.china.com.cn/baidu/doc_1_3_1596740.html',
        'pubDate': '2016-07-14 11:36:05',
        'source': '手机中国',
        'desc': '就在几天前，一场足球盛宴——欧洲杯完美落幕，回首历时近一个月的赛程，足球所带来的热血与激情，伴随着球迷朋友们一起见证了一个个不眠之夜，其魅力自然可见一斑。在漳州，也有一批热爱足球运动的青少年，这些小足球员们“小荷才露尖尖角”，他们挥洒汗水，正义无反顾地向着“足球梦”追逐奔跑。',
        'imageurls': [],
        'html': ''
      },
      {
        'title': '创立“中国杯” 习惯了“买买买”的万达要靠自创IP为中国足球出把力',
        'link': 'http://ytsports.cn/news-10662.html?cid=64',
        'pubDate': '2016-07-14 10:48:04',
        'source': '禹唐体育',
        'desc': '“中国杯”则是万达与国际足联合作的第一项赛事落地，这也标志着万达开始着重加强自己的赛事运营业务。',
        'imageurls': [],
        'html': ''
      },
      {
        'title': '体育产业"十三五"规划:推进中国足球联赛竞彩',
        'link': 'http://sports.qq.com/a/20160714/021723.htm',
        'pubDate': '2016-07-14 10:17:26',
        'source': '国内足球新闻',
        'desc': '《体育产业发展“十三五”规划》指出，积极研究推进发行以中国足球职业联赛为竞猜对象的足球彩票腾讯体育7月14日讯13日，国家体育总局在其官网刊登了《体育产业发展“十三五”规划》，其中明确指出，加强三大球联赛建设、积极研究推进积极研究推进发行以中国足球职业联赛为竞猜对象的足球彩票。',
        'imageurls': [],
        'html': ''
      },
      {
        'title': '阿联酋有意购买俄苏-35战机 或将成为该机第三个海外用户',
        'link': 'http://news.qq.com/a/20170224/043405.htm',
        'pubDate': '2017-02-24 14:38:20',
        'source': '军事新闻',
        'desc': '阿拉伯联合酋长国（阿联酋）有意购买俄罗斯苏-35战机。这是继俄罗斯宣布将和阿联酋以米格-35为基础共同开发第五代战斗机之后，俄罗斯在阿联酋这个传统美国军火市场的又一斩获。',
        'imageurls': [],
        'html': ''
      }
    ],
    currentChannel: 0,
    currentNews: 0,
    PAGENUM: 1,
    PAGESIZE: 10,
    isLoading: false,
    allLoaded: false,
    showDetail: false
  }
  let cangConfig = {
    cangType: [
      {
        label: '五言',
        value: '5'
      }, {
        label: '七言',
        value: '7'
      }
    ],
    num: 5,
    position: 0,
    positionList: [
      {
        text: '藏头',
        typeNum: 1
      },
      {
        text: '藏尾',
        typeNum: 2
      },
      {
        text: '藏中',
        typeNum: 3
      },
      {
        text: '递增',
        typeNum: 4
      },
      {
        text: '递减',
        typeNum: 5
      }
    ],
    yayuntype: 1,
    yayunList: [
      {
        label: '双句一压',
        value: '1'
      },
      {
        label: '双句押韵',
        value: '2'
      },
      {
        label: '一三四押',
        value: '3'
      }
    ],
    key: '',
    isLoading: false,
    resultList: []
  }
  let historyConfig = {
    cardList: []
  }
  // AXIOS 设置
  const axiosConfig = {
    getGETConfig: (params) => {
      if (typeof params !== 'object') {
        return 'params is not an object'
      }
      params.showapi_appid = APPID
      params.showapi_sign = SECRET
      params.needHtml = 1
      params.needAllList = 0
      return {
        method: 'get',
        params: params,
        timeout: TIMEOUT,
        responseType: 'json'
      }
    },
    getPOSTConfig: (data) => {
      if (typeof data !== 'object') {
        return 'data is not an object'
      }
      data.showapi_appid = APPID
      data.showapi_sign = SECRET
      data.needHtml = 1
      data.needAllList = 0
      return {
        method: 'post',
        data: data,
        timeout: TIMEOUT,
        responseType: 'json'
      }
    }
  }
  // API 地址
  const apiList = {
    NEWSCHANNEL_API: 'https://route.showapi.com/109-34',
    NEWSLIST_API: 'https://route.showapi.com/109-35',
    CANG_API: 'https://route.showapi.com/950-1',
    HISTORY_API: 'https://route.showapi.com/119-42'
  }
  export default {
    newsConfig,
    historyConfig,
    cangConfig,
    axiosConfig,
    apiList
  }
