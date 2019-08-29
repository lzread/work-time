import Vue from 'vue';
import ElementUI from 'element-ui';

import './style/common.css';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueI18n from 'vue-i18n';
import messages from './i18n/language';

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(router);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zh', // 设置地区
  messages, // 设置地区信息
});

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
