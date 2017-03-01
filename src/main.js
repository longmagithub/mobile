// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import Fastclick from 'fastclick'
import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(MintUI)
 // Vue.use()
 // create router instance
 // const router = new

 /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
Fastclick.attach(document.body)
