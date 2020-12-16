import Vue from 'vue';
import Vuex from 'vuex';
import router, { resetRoute } from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabList: [],
    loginResponse: {},
    dynamicRoutes: []
  },

  getters: {},

  mutations: {
    pushTab(state, tab) {
      state.tabList.push(tab);
    },
    updateTabList(state, tabList) {
      state.tabList = tabList;
    },
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
      commit('updateTabList', []);
      resetRoute();
    },
    deleteTabAction({ state, commit }, payload) {
      // 当第一个是"系统简介"，并且tabList只有这个的时候， 不允许被删除
      // 否则， 才允许被删除
      if (!(state.tabList.length === 1 && state.tabList[0] === 'intro')) {
        let index = 0;
        state.tabList.forEach((item, i) => {
          if (item === payload) {
            index = i;
          }
        });

        // 如果删除的是最后一个
        if (index === state.tabList.length - 1) {
          state.tabList.splice(index, 1);
          commit('updateTabList', state.tabList);
          // 如果tabList被删完了，跳转到系统简介页面
          if (state.tabList.length === 0) {
            router.push('intro');
          } else {
            // 否则跳转到上一个
            router.push(state.tabList[index - 1]);
          }
        } else {
          // 删除的不是最后一个
          // 如果当前路由是你正准备删的路由
          if (router.currentRoute.name === payload) {
            // 如果是第一个
            if (index === 0) {
              if (state.tabList.length > 1) {
                router.push(state.tabList[index + 1]);
              } else {
                router.push('intro');
              }
            } else {
              // 否则跳转到上一个
              router.push(state.tabList[index - 1]);
            }
            state.tabList.splice(index, 1);
            commit('updateTabList', state.tabList);
          } else {
            // 否则， 直接从tabList删除
            state.tabList.splice(index, 1);
            commit('updateTabList', state.tabList);
          }
        }
      }
    }
  }
});
