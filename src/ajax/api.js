// require auth api call
const list = { type: 'get', url: '/private/list' }
const logout = { type: 'post', url: '/private/logout' }

// not require auth api call
const login = { type: 'post', url: '/public/login' }

export default {
  requireAuth: {
    list,
    logout
  },

  notRequireAuth: {
    login
  }
}
