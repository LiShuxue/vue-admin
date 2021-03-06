import Mock from 'mockjs';
import API from '@/ajax/api';
const Random = Mock.Random;

// 登录
const login = {
  url: API.notRequireAuth.login.url,
  type: API.notRequireAuth.login.type,
  data: {
    token: Random.string('abcdefghijklmnopqrstuvwxyz0123456789', 32),
    user: {
      id: 1,
      name: '张三',
      role: '角色',
      permissionList: ['按钮1', '按钮2', '按钮3', '按钮4', '按钮5'],
      menuList: ['系统简介', '图表面板', '表格显示', '导入导出', '文本编辑', '系统管理', '用户管理', '权限管理']
    }
  }
};

// 退出
const logout = {
  url: API.requireAuth.logout.url,
  type: API.requireAuth.logout.type
};

export default {
  login,
  logout
};
