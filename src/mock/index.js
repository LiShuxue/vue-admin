import Mock from 'mockjs';
import common from './modules/common';

useMock(common);

function useMock(modules) {
  for (let key in modules) {
    Mock.mock(new RegExp(modules[key].url), modules[key].type, options => {
      console.log('\n');
      console.log('%cmock拦截, 请求: ', 'color:blue', options);
      console.log('%cmock拦截, 响应: ', 'color:blue', modules[key].data);
      return modules[key].data;
    });
  }
}
