import axios from 'axios'
import API from './api'
import store from '@/store'
import router from '@/router'

axios.defaults.timeout = 20 * 1000
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

axios.interceptors.request.use(config => {
  for (let key in API.requireAuth) {
    // 需要携带token
    if (config.url.includes(API.requireAuth[key].url)) {
      config.headers.Authorization = `Bearer ${store.state.token}`
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // 401, token失效
  if (response.data && response.data.code === 401) {
    this.$store.dispatch('logout')
    router.push({ name: 'login' })
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default axios
