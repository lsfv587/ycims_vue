import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题

import './assets/css/icon.css';
import './directives';
import JsonExcel from 'vue-json-excel'


Vue.config.productionTip = false
Vue.component('downloadExcel', JsonExcel)
Vue.use(ElementUI, {
  size: 'mini'
});
import routerGuard from './tool/routerGuard'

routerGuard.reloadPage()
routerGuard.routerGuard()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
