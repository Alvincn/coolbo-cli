# Coolbo-cli
🌈Integrate common commands to quickly build projects, check, submit, etc., simplify project building, and focus on project development.

**Version**: 0.0.6

[简体中文](./README.md) | **[English](./README.en.md)**

## Install
### Global installation
npm:`npm install -g coolbo-cli`

yarn:`yarn global add coolbo-cli`
### Using npx
Create a template:`npx create coolbo-cli <name> [-t|--template]`

Example:`npx create coolbo-cli demo1 -template vue3`

## Command
### create
Used to quickly create templates. Templates are obtained from Github and updated in real time.

**Usage：**
1. create
    ```bash
    coolbo create
    ``` 
    Enter project name:
    ```bash[README.md](README.md)
    ? 请输入项目名称
    ``` 
    Select a template:
    ```bash
    ? 请选择创建模版
    ``` 
2. create [projectName]
    ```bash
    coolbo create demo1
    ``` 
    Select a template:
    ```bash
    ? 请选择创建模版
    ```

3. create [projectName] -t [template]
    ```bash
    coolbo create demo1 -t vue3
    ``` 
   The template uses fuzzy matching, keywords are enough.
### lint
Use Eslint for code inspection and quick fixes.

**Usage：**
1. lint
    ```bash
    coolbo lint
    ``` 
   Conduct code review.
2. lint -f
    ```bash
    coolbo lint -f | --fix
    ``` 
   Code review and repair.
3. lint -n
    ```bash
    coolbo lint -n
    ``` 
   Conduct nuxt code review.

**Rules:**
1. Require spaces around =
2. Force indentation to 2
3. Force single or double quotes
4. Require or disallow trailing commas
5. Require === and !==
6. Disallow multiple spaces
7. Disallow var, use let and const
8. Disallow unused variables
9. Force consistent spaces around arrows in arrow functions
10. Force consistent spacing within braces
11. Force consistent spacing within array brackets
12. Force consistent spacing in // or /* comments

### commit
Submit to Git, integrating git add, git commit, and git push

> Before using commit, you need to run lint first. If it fails the check, it will not be submitted.

**Usage：**
1. commit
    ```bash
    coolbo commit 
    ``` 
    Enter submission information:
    ```bash
   ? 请输入提交信息
    ``` 
   Push:
   ```bash
    coolbo commit -p 
    ``` 

2. commit [text]
    ```bash
    coolbo commit update:commit
    ``` 
   Push:
   ```bash
   coolbo commit -p 
   ``` 

3. commit [text] -p
    ```bash
    coolbo commit update:commit -p
    ``` 
   Commit and push

### pull
Pull the code from Git.

**Usage：**
1. pull
    ```bash
    coolbo pull 
    ``` 


### config
View/configure the template source. The template in create comes from Github. You can configure your own Github and the template will be obtained from your Github.
The default source is: **coolbo-cn**.

**Usage：**
1. config
    ```bash
    coolbo config 
    ```
   Get the current Git username.
2. config -u
    ```bash
    coolbo config -u
    ```
    Enter your Git username:
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
    Reset to default Git source.

### help
Read Help

**Usage：**
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
