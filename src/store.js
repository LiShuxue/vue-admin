import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    username: ''
  },

  getters: { },

  mutations: {
    saveToken (state, token) {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    saveUsername (state, username) {
      state.username = username
      sessionStorage.setItem('username', username)
    }
  },

  actions: {
    login ({ commit }, payload) {
      commit('saveToken', payload.token)
      commit('saveUsername', payload.username)
    },
    logout ({ commit }) {
      commit('saveToken', '')
      commit('saveUsername', '')
    }
  }
})
