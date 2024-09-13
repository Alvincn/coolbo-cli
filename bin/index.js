#! /usr/bin/env node

const {program} = require('commander')
const packageJson = require('../package.json')
const inquirer = require('inquirer')
const fs = require('fs-extra')
const {downloadTemplate} = require('./downloadGithub')
const path = require("path");
// ESLint
const {ESLint} = require("eslint");
// 命令行执行
const {execSync} = require('child_process');
// 进度条
const ora = require('ora') // 引入ora
const {getAllTemplates} = require('./getAllTemplates.js')
const {getConfigFromFile, writeConfig} = require("./writeConfig");

// 定义当前版本
program.version(`v${packageJson.version}`)
program.on('--help', () => {}) // 添加--help

// create 命令
program
    .command('create [projectName]') // [projectName]是可选 <projectName>是必填
    .option('-t, --template <template>', '模版名称') // 配置项 --template xxx
    .description('👨🏻‍💻创建代码模版')
    .action(async (projectName, options) => {
        const getLoading = ora('🤖正在获取模板...')
        // coolbo create <projectName> -t <templateName>
        // eg: coolbo create HelloVue -t vue3
        // 1. 根据用户输入的模版查找是否有这个模板
        getLoading.start()
        let user = await getConfigFromFile()
        const templates = await getAllTemplates(user.username)
        getLoading.succeed('🎖️获取模板成功！当前模版来源：' + user.username)
        const project = templates.find(template => template.name.includes(options.template))
        // 2. 如果有模板
        let projectTemplate = project ? project.value : undefined
        // 3. 判断用户是否输入了 projectName
        if (!projectName) {
            const {name} = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: '请输入项目名称'
            })
            projectName = name
        }

        // 4. 如果没有传入模板
        if (!projectTemplate) {
            const {template} = await inquirer.prompt({
                type: 'list',
                name: 'template',
                message: '请选择创建模版',
                choices: templates
            })
            projectTemplate = template
        }

        // 5. 判断当前是否有这个文件夹，是否覆盖
        const dest = path.join(process.cwd(), projectName)
        if (fs.pathExistsSync(dest)) {
            const {force} = await inquirer.prompt({
                type: 'confirm',
                name: 'force',
                message: '目录已存在，是否覆盖？',
            })
            // 如果覆盖就删除文件夹继续往下执行，否的话就退出进程
            force ? fs.removeSync(dest) : process.exit(1)
        }

        // 5. 根据 github 下载模板
        await downloadTemplate(projectTemplate, dest, projectName)
    })

// lint 命令
program
    .command('lint')
    .option('-f, --fix', '是否修复')
    .description('🔍Lint代码检查')
    .action(async (options) => {
        const eslint = new ESLint({
            fix: options.fix,
        });
        const results = await eslint.lintFiles(["src/**/*.{js,ts,vue,jsx,tsx}"]);

        if (options.fix) {
            await ESLint.outputFixes(results);
        }

        const formatter = await eslint.loadFormatter("stylish");
        const resultText = formatter.format(results);

        console.log(resultText);

        // const hasErrors = results.some(result => result.errorCount > 0);
        const errorCount = results.reduce((accumulator, currentResult) => {
            return accumulator + currentResult.errorCount;
        }, 0);
        if (errorCount === 0) {
            console.log('👏少侠好实力，一个bug都没有！')
        } else if (errorCount <= 2) {
            console.log('✊就差一点了，加油修复吧！')
        } else {
            console.log('👊这么多bug，你是要上天吗！')
        }
        // process.exit(hasErrors ? 1 : 0);
    })

// 推送 git
program
    .command('commit [commitText]')
    .option('-p, --push', '提交并推送')
    .description('📤提交Git')
    .action(async (commitText, options) => {
        const pushLoading = ora('🤖正在推送...')
        // lint 检查
        const eslint = new ESLint();
        const results = await eslint.lintFiles(["src/**/*.{js,ts,vue,jsx,tsx}"]);
        const hasErrors = results.some(result => result.errorCount > 0);
        if(hasErrors) {
            console.log('❌先运行[coolbo lint]检查无误后，再提交哦！')
            process.exit(1);
        }
        // coolbo commit -p
        if (!commitText && options.push) {
            pushLoading.start()
            console.log()
            execSync('git push', {stdio: 'inherit'});
            pushLoading.succeed('🎖️推送 Git 成功！')
        } else {
            // coolbo commit 'test'
            if (!commitText) {
                const {text} = await inquirer.prompt({
                    type: 'input',
                    name: 'text',
                    message: '请输入提交信息'
                })
                commitText = text
            }
            console.log()
            execSync('git add .', {stdio: 'inherit'});
            console.log()
            execSync(`git commit -m "${commitText}"`, {stdio: 'inherit'});
            if (!options.push) {
                console.log('🔭提交成功！使用[coolbo commit -p]进行推送！')
            }
            // coolbo commit 'test' -p
            if (options.push) {
                pushLoading.start()
                console.log()
                execSync('git push', {stdio: 'inherit'});
                pushLoading.succeed('🎖️推送 Git 成功！')
            }
        }
    })

// 拉取 git
program
    .command('pull')
    .description('📥拉取Git')
    .action(async () => {
        const pullLoading = ora('🤖正在拉取...')
        pullLoading.start()
        console.log()
        execSync('git pull', {stdio: 'inherit'})
        pullLoading.succeed('🎖️拉取 Git 成功！')
    })

// 配置 Git 模版用户
program
    .command('config')
    .option('-u --user [gitName]', '配置用户')
    .option('-r --reset', '重置模版')
    .description('👾获取 Git 模板用户名')
    .action(async (options) => {
        if(options.reset) {
            return await writeConfig('coolbo-cn')
        }
        if(Object.keys(options).length === 0) {
            let user = await getConfigFromFile()
            console.log('🎖️当前 Git 用户为：' + user.username + `${user.username === 'coolbo-cn'? ' -> default': ' -> custom'}`)
            return
        }
        if(options.user && typeof options.user === "boolean") {
            const {name} = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: '请输入 Git 模板用户名'
            })
            options.user = name
        }else {
            await writeConfig(options.user)
        }
    })
// 解析用户执行命令传入参数
program.parse(process.argv)
