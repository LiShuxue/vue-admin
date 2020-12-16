import Vue from 'vue';
import Vuex from 'vuex';
import { resetRoute } from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    username: '',
    userRoles: [],
    dynamicRoutes: []
  },

  getters: {},

  mutations: {
    saveToken(state, token) {
      state.token = token;
      sessionStorage.setItem('token', token);
    },
    saveUsername(state, username) {
      state.username = username;
      sessionStorage.setItem('username', username);
    },
    saveUserRoles(state, roles) {
      state.userRoles = roles;
      // session storage 不能存数组，只能存字符串。所以用+拼接数组的内容存起来，解析的时候再把它转换成数组
      sessionStorage.setItem('userRoles', roles.join('+'));
    },
    saveDynamicRoutes(state, routes) {
      state.dynamicRoutes = routes;
    }
  },

  actions: {
    login({ commit }, payload) {
      commit('saveToken', payload.token);
      commit('saveUsername', payload.username);
      commit('saveUserRoles', payload.roles);
    },
    logout({ commit }) {
      commit('saveToken', '');
      commit('saveUsername', '');
      commit('saveUserRoles', []);
      resetRoute();
    }
  }
});
