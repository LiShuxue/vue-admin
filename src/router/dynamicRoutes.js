import store from '@/store'

const dynamicRoutesMap = [{
  path: '/home',
  name: 'home',
  component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  redirect: 'intro',
  children: [{
    path: '/intro',
    name: 'intro',
    component: () => import((/* webpackChunkName: "intro" */ '@/views/Intro.vue')),
    meta: { icon: 'icon-home', title: '系统简介' }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import((/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')),
    meta: { roles: ['admin'], icon: 'icon-dashboard', title: '图表面板' }
  },
  {
    path: '/parent',
    name: 'parent',
    component: () => import(/* webpackChunkName: "store" */ '@/views/Parent.vue'), // 为了使子路由可以显示，需要添加一个Store.vue，里面只有一个router-view即可。如果子路由还有嵌套，需要同样操作。
    meta: { icon: 'icon-store', title: '二级菜单' },
    children: [{
      path: '/children1',
      name: 'children1',
      component: () => import((/* webpackChunkName: "children1" */ '@/views/Children1.vue')),
      meta: { roles: ['admin'], title: '子菜单1' }
    },
    {
      path: '/children2',
      name: 'children2',
      component: () => import((/* webpackChunkName: "children2" */ '@/views/Children2.vue')),
      meta: { roles: ['customer'], title: '子菜单2' }
    }]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import((/* webpackChunkName: "admin" */ '@/views/Admin.vue')),
    meta: { roles: ['admin'], icon: 'icon-admin', title: '管理员列表' }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import((/* webpackChunkName: "user" */ '@/views/User.vue')),
    meta: { roles: ['admin', 'customer'], icon: 'icon-user', title: '用户管理' }
  },
  {
    path: '/input',
    name: 'input',
    component: () => import((/* webpackChunkName: "input" */ '@/views/Input.vue')),
    meta: { icon: 'icon-form', title: '表单输入' }
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import((/* webpackChunkName: "editor" */ '@/views/Editor.vue')),
    meta: { roles: ['customer'], icon: 'icon-edit', title: '文本编辑' }
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
