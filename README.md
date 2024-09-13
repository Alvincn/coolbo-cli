# Coolbo-cli
🌈集成常用命令，快速搭建项目、检查、提交等，简化项目搭建，专注于项目开发。

**版本**: 0.0.2

**[简体中文](./README.md)** | [English](./README.en.md)

## 安装
### 全局安装
npm:`npm install -g coolbo-cli`

yarn:`yarn global add coolbo-cli`
### 使用npx
创建模版：`npx create coolbo-cli <name> [-t|--template]`

示例：`npx create coolbo-cli demo1 -template vue3`

## 命令
### create
用于快速创建模板，模版从Github获取，实时更新。

**使用：**
1. create
    ```bash
    coolbo create
    ``` 
   输入项目名:
    ```bash
    ? 请输入项目名称
    ``` 
   选择模板:
    ```bash
    ? 请选择创建模版
    ``` 
2. create [projectName]
    ```bash
    coolbo create demo1
    ``` 
   选择模板:
    ```bash
    ? 请选择创建模版
    ```
   
3. create [projectName] -t [template]
    ```bash
    coolbo create demo1 -t vue3
    ``` 
   模版使用模糊匹配，关键词即可。
### lint
使用 Eslint 进行代码检查，快速修复。

**使用：**
1. lint
    ```bash
    coolbo lint
    ``` 
   进行代码检查
2. lint -f
    ```bash
    coolbo lint -f | --fix
    ``` 
   代码检查并修复
3. lint -n 
    ```bash
    coolbo lint -n
    ``` 
   检查 nuxt 项目

**规则：**
1. 要求 = 左右必须有空格
2. 强制缩进为2
3. 强制使用单引号或双引号
4. 要求或禁止末尾逗号
5. 要求使用 === 和 !==
6. 禁止多个空格
7. 禁止出现 var，使用 let 和 const
8. 禁止出现未使用过的变量
9. 强制箭头函数的箭头前后使用一致的空格
10. 在大括号内强制保持一致的间距
11. 在数组方括号内强制保持一致的间距
12. 强制在注释中 // 或 /* 使用一致的空格

### commit
提交到 Git，集成 git add、git commit、git push

> 使用 commit 前需要先执行 lint，检查不通过不予提交

**使用：**
1. commit
    ```bash
    coolbo commit 
    ``` 
   输入提交信息：
    ```bash
   ? 请输入提交信息
    ``` 
   提交：
   ```bash
    coolbo commit -p 
    ``` 

2. commit [text]
    ```bash
    coolbo commit update:commit
    ``` 
   提交：
   ```bash
   coolbo commit -p 
   ``` 
   
3. commit [text] -p
    ```bash
    coolbo commit update:commit -p
    ``` 
   提交并推送

### pull
从 Git 拉取代码。

**使用：**
1. pull
    ```bash
    coolbo pull 
    ```

### config
查看/配置模版来源，create中模版来源于 Github，你可以配置自己的 Github，将会从你的 Github 获取模版。
默认来源于：**coolbo-cn**

**使用：**
1. config
    ```bash
    coolbo config 
    ```
   获取当前 Git 用户名
2. config -u
    ```bash
    coolbo config -u
    ```
   输入 Git 用户名：
    ```bash
    ? 请输入 Git 模板用户名 
    ```
3. config -u [gitName]
    ```bash
    coolbo config -u coolbo-cn
    ```
   
4. config -r
    ```bash
    coolbo config -r
    ```
   重置为默认 Git 来源

### help
查看帮助

**使用：**
1. help
    ```bash
    coolbo help 
    ```

2. -h
    ```bash
    coolbo -h 
    ``` 
3. [command] -h
    ```bash
    coolbo lint -h
    ``` 
