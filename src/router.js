import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

// 页面刷新时，重新赋值token 和 username。保证页面刷新之后不用重新登陆，只有关闭页面再打开才需要重新登录
if (window.sessionStorage) {
  if (window.sessionStorage.getItem('access_token')) {
    store.commit('saveAccessTokenMutation', window.sessionStorage.getItem('access_token'))
  }
  if (window.sessionStorage.getItem('refresh_token')) {
    store.commit('saveRefreshTokenMutation', window.sessionStorage.getItem('refresh_token'))
  }
  if (window.sessionStorage.getItem('username')) {
    store.commit('saveUsernameMutation', window.sessionStorage.getItem('username'))
  }
}

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      redirect: '/intro',
      children: [
        { path: '/intro', name: 'intro', component: () => import((/* webpackChunkName: "intro" */ './views/Intro.vue')) },
        { path: '/dashboard', name: 'dashboard', component: () => import((/* webpackChunkName: "dashboard" */ './views/Dashboard.vue')) },
        { path: '/admin', name: 'admin', component: () => import((/* webpackChunkName: "admin" */ './views/Admin.vue')) },
        { path: '/user', name: 'user', component: () => import((/* webpackChunkName: "user" */ './views/User.vue')) },
        { path: '/input', name: 'input', component: () => import((/* webpackChunkName: "input" */ './views/Input.vue')) }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(store.state.access_token || sessionStorage.getItem('access_token')) {
    if(to.name === 'login') {
      next({ path: '/home' })
    } else {
      next()
    }
  } else {
    if(to.name === 'login') {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 把要跳转的地址作为参数传到下一步
      })
    }
  }
})

export default router
