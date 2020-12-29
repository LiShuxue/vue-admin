import Vue from 'vue';
import Vuex from 'vuex';
import { resetRoute } from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginResponse: {},
    dynamicRoutes: []
  },

  getters: {},

  mutations: {
    saveLoginResponse(state, res) {
      if (res) {
        state.loginResponse = res;
        sessionStorage.setItem('loginResponse', JSON.stringify(res));
      }
    },
    saveDynamicRoutes(state, routes) {
      state.dynamicRoutes = routes;
    }
  },

  actions: {
    login({ commit }, payload) {
      commit('saveLoginResponse', payload);
    },
    logout({ commit }) {
      commit('saveLoginResponse', {});
      resetRoute();
    }
  }
});
