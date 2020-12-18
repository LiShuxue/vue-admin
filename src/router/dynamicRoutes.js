import store from '@/store';

const dynamicRoutesMap = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    redirect: 'intro',
    children: [
      {
        path: '/intro',
        name: 'intro',
        component: () => import(/* webpackChunkName: "intro" */ '@/views/Intro.vue'),
        meta: { icon: 'icon-home', title: '系统简介' }
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
        meta: { icon: 'icon-dashboard', title: '图表面板' }
      },
      {
        path: '/table',
        name: 'table',
        component: () => import(/* webpackChunkName: "tablegrid" */ '@/views/TableGrid.vue'),
        meta: { icon: 'icon-table', title: '表格显示' }
      },
      {
        path: '/upload-export',
        name: 'upload-export',
        component: () => import(/* webpackChunkName: "upload-export" */ '@/views/UploadExport.vue'),
        meta: { icon: 'icon-upload', title: '导入导出' }
      },
      {
        path: '/editor',
        name: 'editor',
        component: () => import(/* webpackChunkName: "editor" */ '@/views/Editor.vue'),
        meta: { icon: 'icon-edit', title: '文本编辑' }
      },
      {
        path: '/sys-manage', // 系统管理
        name: 'sys-manage',
        component: () => import(/* webpackChunkName: "parent" */ '@/views/Parent.vue'),
        meta: { icon: 'icon-xitongguanli', title: '系统管理' },
        children: [
          {
            path: '/user',
            name: 'user',
            component: () => import(/* webpackChunkName: "user" */ '@/views/User.vue'),
            meta: { icon: 'icon-admin', title: '用户管理' }
          },
          {
            path: '/permission',
            name: 'permission',
            component: () => import(/* webpackChunkName: "permission" */ '@/views/Permission.vue'),
            meta: { icon: 'icon-xitongguanli', title: '权限管理' }
          }
        ]
      }
    ]
  }
];

// 如果权限列表包含这个路由，则有权限。 或者是前端定义的固定路由， 比如home， 这些没有meta标签， 也有权限访问
const hasPermission = (permissionList, route) => {
  if (!route.meta || (route.meta && permissionList.includes(route.meta.title))) {
    return true;
  } else {
    return false;
  }
};

// 过滤出用户可访问的路由，路由可能还包含子路由，所以子路由也要过滤
const filterRoutes = (routeList, permissionList) => {
  const dynamicRoutes = [];

  routeList.forEach(route => {
    const tmpRoute = {
      ...route
    };

    if (hasPermission(permissionList, tmpRoute)) {
      if (tmpRoute.children) {
        tmpRoute.children = filterRoutes(tmpRoute.children, permissionList);
      }
      dynamicRoutes.push(tmpRoute);
    }
  });

  return dynamicRoutes;
};

const dynamicRoutes = () => {
  const menuList = store.state.loginResponse.user.menuList || [];
  return filterRoutes(dynamicRoutesMap, menuList);
};

export default dynamicRoutes;
