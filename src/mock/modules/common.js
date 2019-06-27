const Mock = require('mockjs')
const Random = Mock.Random

// 登录
const login = {
  url: '/public/login',
  type: 'post',
  data: {
    'msg': 'success',
    'code': 1,
    'expire': Random.natural(60 * 60 * 1, 60 * 60 * 12),
    'token': Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32),
    'username': Random.name()
  }
}

// 退出
const logout = {
  url: '/private/logout',
  type: 'post',
  data: {
    'msg': 'success',
    'code': 1
  }
}

export default {
  login,
  logout
}
