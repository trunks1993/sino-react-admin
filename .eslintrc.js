/*
 * @Author: wangzhijian
 * @Date: 2022-04-22 23:48:13
 * @LastEditTime: 2022-04-23 02:30:32
 */
module.exports = {
  parser: '@typescript-eslint/parser', // 定义ESLint的解析器
  extends: [
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ], // 定义文件继承的子规范
  plugins: ['@typescript-eslint'], // 定义了该eslint文件所依赖的插件
  env: {
    // 指定代码的运行环境
    browser: true,
    node: true,
  },
  settings: {
    // 自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    indent: [2, 2, { SwitchCase: 1 }],
    'no-multi-spaces': 2, // 禁止出现多个空格
    'no-var': 2, // 不能使用var
    'arrow-spacing': 2, // 箭头函数两边必须有空格
    'prefer-const': 2, // 必须优先使用const
    'no-extra-boolean-cast': 2, // 禁止不必要的布尔转换
    'use-isnan': 2, // 要求使用 isNaN() 检查 NaN
    'block-scoped-var': 2, // 强制把变量的使用限制在其定义的作用域范围内
    // complexity: ["warn", 10], // 限制圈复杂度
    eqeqeq: ['error', 'always'], // 强制使用=== !==
    'no-alert': 2,
    'no-caller': 2,
    'no-eval': 2,
    'no-proto': 'warn',
    'no-redeclare': 'error', // 禁止多次声明同一变量
    'no-else-return': 2, // 禁止 if 语句中 return 语句之后有 else 块
    'no-global-assign': 2, // 禁止对原生对象或只读的全局对象进行赋值
    'no-implicit-globals': 'error', // 禁止在全局范围使用变量和函数声明
    // "no-magic-numbers": "warn", // 禁用魔术数字
    'no-mixed-spaces-and-tabs': 'error', // 禁止使用 空格 和 tab 混合缩进
    'block-spacing': 'error', // 禁止或强制在代码块中开括号前和闭括号后有空格
    // camelcase: [
    //   "error",
    //   { ignoreDestructuring: true, allow: ["UNSAFE_componentWillMount"] },
    // ], // 要求使用骆驼拼写法
    'eol-last': ['error', 'always'], // 要求或禁止文件末尾保留一行空行
    'func-call-spacing': 'error', // 禁止在函数标识符和其调用之间有空格
    'implicit-arrow-linebreak': ['error', 'beside'], // 箭头函数返回位置
    'jsx-quotes': ['error', 'prefer-double'], // JSX 属性中使用一致的双引号
    'key-spacing': ['error', { beforeColon: false }], // key: value
    'keyword-spacing': ['error', { before: true }], // 强制关键字周围空格的一致性
    'no-trailing-spaces': 'error', // 禁用行尾空白
    'spaced-comment': ['error', 'always'], // 要求或禁止在注释前有空白
    'space-infix-ops': 'error', // 要求中缀操作符周围有空格
    'space-in-parens': ['error', 'never'], // 禁止或强制圆括号内的空格
    'space-before-function-paren': ['error', 'never'], // 要求或禁止函数圆括号之前有一个空格
    semi: 'error', // 要求或禁止使用分号代替 ASI
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'], // 强制在花括号中使用一致的空格
    'nonblock-statement-body-position': ['error', 'beside'], // 强制单个语句的位置
    'react/jsx-tag-spacing': 2, // 总是在自动关闭的标签前加一个空格，正常情况下也不需要换行
    'react/jsx-pascal-case': 2, // React模块名使用帕斯卡命名，实例使用骆驼式命名
    'react/self-closing-comp': 2, // 对于没有子元素的标签来说总是自己关闭标签
    'react/jsx-boolean-value': 1, // 如果属性值为 true, 可以直接省略
    '@typescript-eslint/no-explicit-any': ['off'],
  },
};
