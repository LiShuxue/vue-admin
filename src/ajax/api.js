import axios from './config'

// 用户登陆退出
const login = { type: 'post', url: '/sys/login' }
const logout = { type: 'post', url: '/sys/logout' }

// 门店管理相关接口
const storeSave = { type: 'post', url: '/sys/org/save' }
const storeDelete = { type: 'post', url: '/sys/org/delete' }
const storeUpdate = { type: 'post', url: '/sys/org/update' }
const storeList = { type: 'get', url: '/sys/org/list' }
const oneStore = { type: 'get', url: '/sys/org/info/' }

// 导出webservice接口的信息，供别处使用
export default {
  // 不需要在请求头中加token的接口
  notRequireAuth: {
    login
  },

  // 需要在请求头中加token的接口
  requireAuth: {
    logout,
    storeSave,
    storeDelete,
    storeUpdate,
    storeList,
    oneStore
  }
}

// 导出请求后端的方法供View中使用
export function userLogin(data) {
  return axios({
    method: login.type,
    url: login.url,
    data: data
  })
}
export function userLogout() {
  return axios({
    method: logout.type,
    url: logout.url
  })
}

export function saveStore(data) {
  return axios({
    method: storeSave.type,
    url: storeSave.url,
    data: data
  })
}
export function deleteStore(data) {
  return axios({
    method: storeDelete.type,
    url: storeDelete.url,
    data: data
  })
}
export function updateStore(data) {
  return axios({
    method: storeUpdate.type,
    url: storeUpdate.url,
    data: data
  })
}
export function getStoreList() {
  return axios({
    method: storeList.type,
    url: storeList.url
  })
}
export function getStoreDetail(id) {
  return axios({
    method: oneStore.type,
    url: oneStore.url + id
  })
}
