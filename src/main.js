import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './ajax/config'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'normalize.css'

Vue.config.productionTip = false
Vue.prototype.axios = axios

if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
