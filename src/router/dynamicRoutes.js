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
        component: () => import(/* webpackChunkName: "table" */ '@/views/network-security/Table.vue'),
        meta: { icon: 'icon-table', title: '表格显示' }
      },
      {
        path: '/upload-export',
        name: 'upload-export',
        component: () => import(/* webpackChunkName: "upload-export" */ '@/views/event/UploadExport.vue'),
        meta: { icon: 'icon-upload', title: '上传导出' }
      },
      {
        path: '/editor',
        name: 'editor',
        component: () => import(/* webpackChunkName: "editor" */ '@/views/Editor.vue'),
        meta: { icon: 'icon-edit', title: '文本编辑' }
      },
      {
        path: '/systemManagement', // 系统管理
        name: 'systemManagement',
        component: () => import(/* webpackChunkName: "parent" */ '@/views/Parent.vue'), // 为了使子路由可以显示，里面只有一个router-view即可。如果子路由还有嵌套，需要同样操作。
        meta: { icon: 'icon-sys', title: '系统管理' },
        children: [
          {
            path: '/userManagement',
            name: 'userManagement',
            component: () =>
              import(/* webpackChunkName: "userManagement" */ '@/views/sys-management/UserManagement.vue'),
            meta: { title: '用户管理' }
          },
          {
            path: '/roleManagement',
            name: 'roleManagement',
            component: () =>
              import(/* webpackChunkName: "roleManagement" */ '@/views/sys-management/RoleManagement.vue'),
            meta: { title: '角色管理' }
          },
          {
            path: '/permissionManagement',
            name: 'permissionManagement',
            component: () =>
              import(/* webpackChunkName: "permissionManagement" */ '@/views/sys-management/PermissionManagement.vue'),
            meta: { title: '权限管理' }
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
  const menuList = (store.state.loginResponse.user && store.state.loginResponse.user.menuList) || [];
  return filterRoutes(dynamicRoutesMap, menuList);
};

export default dynamicRoutes;
