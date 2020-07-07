import Vue from 'vue'
import router from './router'
import store from './store/index'
import App from './App.vue'

import VueCookies from 'vue-cookies'
import VueLazyLoad  from 'vue-lazyload'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'


// mock开关
const mock = false;
if(mock){
  require('./mock/api');
}

Vue.use(VueLazyLoad,{
  // preLoad: 1.3,
  // 加载显示图片
  loading: '/imgs/loading-svg/loading-bars.svg'
});
Vue.use(VueCookies)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
