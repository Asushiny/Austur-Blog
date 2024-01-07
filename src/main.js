import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
//导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
//导入自定义暗黑样式
import './assets/dark.css'
//导入element-plus所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//导入路由器
import router from '@/router'
//动态修改title
import VueWechatTitle from 'vue-wechat-title'
//导入aplayer
import 'APlayer/dist/APlayer.min.css';


const app = createApp(App)
app.use(router)
app.use(VueWechatTitle)
app.use(ElementPlus)

app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}