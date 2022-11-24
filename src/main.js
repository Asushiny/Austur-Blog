import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入公共css
import '@/assets/css/base.css'
//引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
//引入自己写的http模块
import http from './http/index.js'
Vue.prototype.$http = http
//引入jwt
import jwt from 'jsonwebtoken'
Vue.prototype.$jwt = jwt
//Nprogress——页面加载的虚假进度条
import NProgress from "nprogress"
import 'nprogress/nprogress.css' //这个样式必须引入

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
