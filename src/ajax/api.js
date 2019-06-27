// require auth api call
const list = 'private/list'
const logout = 'private/logout'

// not require auth api call
const login = 'public/login'

export default {
  requireAuth: {
    list,
    logout
  },

  notRequireAuth: {
    login
  }
}
