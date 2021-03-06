import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import md5 from 'js-md5'
import '@/assets/icon/iconfont.css'
import qs from 'qs'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import html2canvas from 'html2canvas'
import cookie from 'vue-cookie'
import domtoimage from 'dom-to-image';
import wx from "weixin-js-sdk";

Vue.prototype.wx=wx
Vue.prototype.$cookie = cookie;
Vue.use(ElementUI);
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs
Vue.prototype.html2canvas = html2canvas
Vue.prototype.domtoimage = domtoimage
Vue.config.productionTip = false
Vue.prototype.$md5 = md5



// 全局函数
// 获取cookie
Vue.prototype.getCookie = function (cname) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  // console.log("获取cookie,现在循环")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    // console.log(c)
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

// 设置cookie
Vue.prototype.setCookie=function (cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

//清楚cookie
Vue.prototype.clearCookie=function (cname) {
  this.setCookie(cname, "", -1);
},

//格式化时间戳
Vue.prototype.formatTime=function renderTime(date) {
  var dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
}



axios.defaults.baseURL = "https://www.mocking.space"

new Vue({
  router,
  store,
  vuetify,
  data() {
    return {

    }
  },
  render: h => h(App)
}).$mount('#app')
