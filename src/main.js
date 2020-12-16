import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'normalize.css';

Vue.config.productionTip = false;

Vue.prototype.hasPermission = permission => {
  const permissionList = (store.state.loginResponse.user && store.state.loginResponse.user.permissionList) || [];
  if (permissionList.includes(permission)) {
    return true;
  }
  return false;
};

// 本地运行用mock。production因为部署在远程，目前没有真实后台，所以也暂时用mock，如果有真实后台，需要去掉production
if (process.env.VUE_APP_ENV === 'mock' || process.env.VUE_APP_ENV === 'production') {
  require('@/mock');
}

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
