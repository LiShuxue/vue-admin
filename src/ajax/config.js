import axios from 'axios';
import { Message } from 'element-ui';
import API from './api';
import store from '@/store';
import router from '@/router';
import { showLoading, hideLoading } from '@/utils';

axios.defaults.timeout = 20 * 1000;
axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

axios.interceptors.request.use(
  config => {
    showLoading();
    for (let key in API.requireAuth) {
      // 需要携带token
      if (config.url.includes(API.requireAuth[key].url)) {
        config.headers.Authorization = `Bearer ${store.state.loginResponse.token}`;
      }
    }
    return config;
  },
  error => {
    handleError(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    hideLoading();
    return response.data;
  },
  error => {
    handleError(error.response || error);
    return Promise.reject(error.response || error);
  }
);

export const handleError = error => {
  hideLoading();
  if (!error.status) {
    // 非http错误
    Message.error({
      showClose: true,
      message: error.message
    });
  } else if (error.status === 401) {
    store.dispatch('logout');
    router.push({ name: 'login' });
  } else if (error.status === 404) {
    Message.error({
      showClose: true,
      message: '404 Not Found'
    });
  } else if (error.status === 500) {
    Message.error({
      showClose: true,
      message: '500 Server Internal Error'
    });
  } else if (error.status === 503) {
    Message.error({
      showClose: true,
      message: '503 Service Unavailable'
    });
  } else {
    Message.error({
      showClose: true,
      message: 'Unknown Error'
    });
  }
};

export default axios;
