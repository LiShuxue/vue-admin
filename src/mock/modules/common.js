import Mock from 'mockjs'
import API from '@/ajax/api'
const Random = Mock.Random

// 登录
const login = {
  url: API.notRequireAuth.login.url,
  type: API.notRequireAuth.login.type,
  data: {
    'msg': 'success',
    'code': 1,
    'expire': Random.natural(60 * 60 * 1, 60 * 60 * 12),
    'token': Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32),
    'username': Random.name(),
    'roles': ['admin']
  }
}

// 退出
const logout = {
  url: API.requireAuth.logout.url,
  type: API.requireAuth.logout.type,
  data: {
    'msg': 'success',
    'code': 1
  }
}

export default {
  login,
  logout
}
