import Vue from 'vue';
import ElementUI from 'element-ui';

import './styles/common.scss';
import './styles/element-variables.scss'

import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueI18n from 'vue-i18n';
import messages from './i18n/language';

import store from './store';


import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import '@/permission'

import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(router);
Vue.use(VueI18n);

Vue.component('v-icon', Icon)

const i18n = new VueI18n({
  locale: 'zh', // 设置地区
  messages, // 设置地区信息
});

new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
