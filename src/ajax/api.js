import axios from './config'

// require auth api call
const list = { type: 'get', url: '/private/list' }
const logout = { type: 'post', url: '/private/logout' }

// not require auth api call
const login = { type: 'post', url: '/public/login' }

// 导出webservice接口的信息，供别处使用
export default {
  requireAuth: {
    list,
    logout
  },

  notRequireAuth: {
    login
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

export function getList() {
  return axios({
    method: list.type,
    url: list.url
  })
}
