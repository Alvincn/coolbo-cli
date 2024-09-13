import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';


export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      // 要求 = 左右必须有空格
      'space-infix-ops': ['error', { 'int32Hint': false }],
      // 强制缩进为2
      'indent': ['error', 2],
      // 强制使用单引号或双引号
      'quotes': ['error', 'single'],
      // 要求或禁止末尾逗号
      'comma-dangle': ['error', 'always-multiline'],
      // 要求使用 === 和 !==
      'eqeqeq': ['error', 'always'],
      // 禁止多个空格
      'no-multi-spaces': ['error'],
      // 要求使用 let 或 const 而不是 var
      'no-var': ['error'],
      // 禁止出现未使用过的变量
      'no-unused-vars': ['error'],
      // 强制箭头函数的箭头前后使用一致的空格
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      // 在大括号内强制保持一致的间距
      'object-curly-spacing': ['error', 'always'],
      // 在数组方括号内强制保持一致的间距
      'array-bracket-spacing': ['error', 'never'],
      // 强制在注释中 // 或 /* 使用一致的空格
      'spaced-comment': ['error', 'always'],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
];
