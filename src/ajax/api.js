import axios from './config';

// 用户登陆退出
const login = { type: 'post', url: '/login' };
const logout = { type: 'post', url: '/logout' };

const userList = { type: 'get', url: '/users' };

// 导出webservice接口的信息，供别处使用
export default {
  // 不需要在请求头中加token的接口
  notRequireAuth: {
    login
  },

  // 需要在请求头中加token的接口
  requireAuth: {
    logout,
    userList
  }
};

// 导出请求后端的方法供View中使用
export function userLogin(data) {
  return axios({
    method: login.type,
    url: login.url,
    data: data
  });
}
export function userLogout(data) {
  return axios({
    method: logout.type,
    url: logout.url,
    data
  });
}

export function getUserList() {
  return axios({
    method: userList.type,
    url: userList.url
  });
}
