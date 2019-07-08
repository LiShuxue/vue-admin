import axios from 'axios'
import API from './api'
import store from '@/store'
import router from '@/router'
import { showLoading, hideLoading } from '@/utils'

axios.defaults.timeout = 20 * 1000
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

axios.interceptors.request.use(config => {
  showLoading()
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
  hideLoading()
  // 401, token失效
  if (response.data && response.data.code === 401) {
    store.dispatch('logout')
    router.push({ name: 'login' })
  }
  if (response.data && response.data.code !== 200) {
    return Promise.reject(response.data)
  }
  return response.data
}, error => {
  hideLoading()
  return Promise.reject(error)
})

export default axios
