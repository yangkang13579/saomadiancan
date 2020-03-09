// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import md5 from 'js-md5'
import Axios from 'axios'
import { request } from './components/js/utils'
import GetRequest from './components/js/common'
import BScroll from 'better-scroll'
import store from './store'

import {
  Toast,
  NumberKeyboard,
  Swipe,
  SwipeItem,
  Button,
  Rate,
  NoticeBar,
  Collapse,
  CollapseItem,
  Lazyload,
  Tabbar,
  TabbarItem,
  Dialog,
  Field,
  Cell,
  CellGroup,
  TreeSelect,
  Image,
  ImagePreview,
  Sidebar,
  SidebarItem,
  Popup,
  Row,
  List,
  Col,
  Tab, 
  Tabs
} from 'vant'


// 全局注册

// Object.keys(custom).forEach(key => { Vue.filter(key, custom[key])})

Vue.prototype.$axios = Axios
Axios.defaults.withCredentials = true
Axios.defaults.baseURL = '/'
Axios.defaults.headers.post['Content-Type'] = 'application/json';
// import 'lib-flexible/flexible'
Vue.config.productionTip = false
Vue.prototype.$md5 = md5
Vue.prototype.$reData = request
// Vue.prototype.BScroll = BScroll
Vue.prototype.$GetRequest = GetRequest

Vue.use(Swipe)
  .use(SwipeItem)
  .use(Button)
  .use(Toast)
  .use(NoticeBar)
  .use(Collapse)
  .use(CollapseItem)
  .use(Lazyload)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Dialog)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(TreeSelect)
  .use(Image)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Popup)
  .use(Row)
  .use(Col)
  .use(NumberKeyboard)
  .use(Tab)
  .use(Tabs) 
  .use(List) 
  .use(Rate)
  .use(ImagePreview)


  


// 测试环境下
Vue.prototype.$appid = 'wxb6757d58711fa83d' // 测试环境下appid
Vue.prototype.$zfbappid = '2019012363089737' // 测试环境支付宝
Vue.prototype.$url = 'http://saotest.chinaniceshop.com' // 测试域名的改变
// Vue.prototype.$urlB = 'http://yitest.chinaniceshop.com'
Vue.prototype.$imgUrl = 'https://testing.chinaniceshop.com/' // 测试环境 // 数据库数据图片地址
Vue.prototype.$wxUrl = 'http://yitest.chinaniceshop.com' // 测试环境下// 公众号域名地址

// 正式环境下
// Vue.prototype.$appid = 'wxbe38314d097d760d' // 正式环境appid
// Vue.prototype.$zfbappid = '2019070565721682' // 正式环境下
// Vue.prototype.$url = 'http://yd.chinaniceshop.com'
// Vue.prototype.$imgUrl = 'http://ydhl.chinaniceshop.com/' // 正式环境
// Vue.prototype.$wxUrl = 'http://ydhl-wx.chinaniceshop.com' // 正式环境下
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,  // 这样就能全局使用vuex了
  components: { App },
  template: '<App/>'
})
