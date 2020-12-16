module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-trailing-spaces': 'off', // 一行结束后面不要有空格:关闭
    'space-before-blocks': 'off', // 不以新行开始的块 "{" 前面要不要有空格
    'space-before-function-paren': 'off', // 函数定义时括号前面要不要有空格
    'arrow-spacing': 'off', // =>的前&后括号
    'keyword-spacing': 'off', // 关键字后面的空格，如if else
    semi: 'off' // 语句强制分号结尾:关闭
  }
};
