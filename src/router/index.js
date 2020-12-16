import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import constantRoutes from './constantRoutes';
import dynamicRoutes from './dynamicRoutes';

Vue.use(Router);

// 页面刷新时，重新赋值login response。保证页面刷新之后不用重新登陆，只有关闭页面再打开才需要重新登录
if (
  sessionStorage.getItem('loginResponse') &&
  sessionStorage.getItem('loginResponse') !== 'undefined' &&
  sessionStorage.getItem('loginResponse') !== 'null'
) {
  store.commit('saveLoginResponse', JSON.parse(sessionStorage.getItem('loginResponse')));
}

const createRouter = () =>
  new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    isAddDynamicRoutes: false, // 是否已经动态添加路由
    routes: constantRoutes
  });

const router = createRouter();

router.beforeEach((to, from, next) => {
  if (store.state.loginResponse.token) {
    // 如果没有动态添加过路由（可能是首次登陆，或者浏览器刷新了页面，或者已经退出登陆），就添加动态路由
    if (!router.options.isAddDynamicRoutes) {
      addDynamicRoute();
      // hack method to ensure that addRoutes is complete
      // set the replace: true, so the navigation will not leave a history record
      next({ ...to, replace: true });
    } else {
      if (to.name === 'login') {
        next({ path: '/home' });
      } else {
        next();
      }
    }
  } else {
    if (to.name === 'login') {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 把要跳转的地址作为参数传到下一步
      });
    }
  }
});

// 动态挂载路由
const addDynamicRoute = () => {
  let routes = dynamicRoutes();
  router.addRoutes(routes);
  store.commit('saveDynamicRoutes', routes);
  router.options.isAddDynamicRoutes = true;
};
// 删除动态挂载的路由
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRoute() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
  router.options.isAddDynamicRoutes = false;
}

export default router;
