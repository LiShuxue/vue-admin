import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    access_token: '',
    refresh_token: ''
  },
  getters: { },
  mutations: {
    saveAccessTokenMutation (state, token) {
      state.access_token = token
    },
    saveRefreshTokenMutation (state, token) {
      state.refresh_token = token
    },
    saveUsernameMutation (state, username) {
      state.username = username
    }
  },
  actions: {
    saveAccessTokenAction ({ commit }, payload) {
      sessionStorage.setItem('access_token', payload)
      commit('saveAccessTokenMutation', payload)
    },
    saveRefreshTokenAction ({ commit }, payload) {
      sessionStorage.setItem('refresh_token', payload)
      commit('saveRefreshTokenMutation', payload)
    },
    saveUsernameAction ({ commit }, payload) {
      sessionStorage.setItem('username', payload)
      commit('saveUsernameMutation', payload)
    }
  }
})
