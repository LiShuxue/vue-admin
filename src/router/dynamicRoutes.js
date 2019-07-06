import store from '@/store'

const dynamicRoutesMap = [{
  path: '/home',
  name: 'home',
  component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  redirect: '/intro',
  children: [{
    path: '/intro',
    name: 'intro',
    component: () => import((/* webpackChunkName: "intro" */ '@/views/Intro.vue'))
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import((/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')),
    meta: { roles: ['admin'] }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import((/* webpackChunkName: "admin" */ '@/views/Admin.vue')),
    meta: { roles: ['admin'] }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import((/* webpackChunkName: "user" */ '@/views/User.vue')),
    meta: { roles: ['admin', 'customer'] }
  },
  {
    path: '/input',
    name: 'input',
    component: () => import((/* webpackChunkName: "input" */ '@/views/Input.vue'))
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import((/* webpackChunkName: "editor" */ '@/views/Editor.vue')),
    meta: { roles: ['customer'] }
  }]
}]

// 如果route没有指定roles, 或者用户的roles在route所指定的roles里面，则有权限访问此路由
const hasPermission = (userRoles, route) => {
  if (route.meta && route.meta.roles) {
    return userRoles.some(userRole => route.meta.roles.includes(userRole))
  } else {
    return true
  }
}

// 过滤出用户可访问的路由，路由可能还包含子路由，所以子路由也要过滤
const filterRoutes = (routes, roles) => {
  const dynamicRoutes = []

  routes.forEach(route => {
    const tmpRoute = {
      ...route
    }

    if (hasPermission(roles, tmpRoute)) {
      if (tmpRoute.children) {
        tmpRoute.children = filterRoutes(tmpRoute.children, roles)
      }
      dynamicRoutes.push(tmpRoute)
    }
  })

  return dynamicRoutes
}

const dynamicRoutes = () => {
  return filterRoutes(dynamicRoutesMap, store.state.userRoles)
}

export default dynamicRoutes
