#! /usr/bin/env node

const {program} = require('commander')
const packageJson = require('../package.json')
const inquirer = require('inquirer')
const templates = require('./templates')
const fs = require('fs-extra')
const { downloadTemplate } = require('./downloadGithub')
const path = require("path");
const { ESLint } = require("eslint");
const { execSync } = require('child_process');
const ora = require('ora') // 引入ora


// 定义当前版本
program.version(`v${packageJson.version}`)
program.on('--help', () => {}) // 添加--help
// create 命令
program
    .command('create [projectName]') // [projectName]是可选 <projectName>是必填
    .option('-t, --template <template>', '模版名称') // 配置项 --template xxx
    .description('👨🏻‍💻创建代码模版')
    .action(async (projectName, options) => {
        // coolbo create <projectName> -t <templateName>
        // eg: coolbo create HelloVue -t vue3
        // 1. 根据用户输入的模版查找是否有这个模板
        const project = templates.find(template => template.name.includes(options.template))
        // 2. 如果有模板
        let projectTemplate = project ? project.value : undefined
        // 3. 判断用户是否输入了 projectName
        if(!projectName) {
            const { name } = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: '请输入项目名称'
            })
            projectName = name
        }

        // 4. 如果没有传入模板
        if(!projectTemplate) {
            const { template } = await inquirer.prompt({
                type: 'list',
                name: 'template',
                message: '请选择创建模版',
                choices: templates
            })
            projectTemplate = template
        }

        // 5. 判断当前是否有这个文件夹，是否覆盖
        const dest = path.join(process.cwd(), projectName)
        if(fs.pathExistsSync(dest)) {
            const { force } = await inquirer.prompt({
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
        if(errorCount === 0) {
            console.log('👏少侠好实力，一个bug都没有！')
        }else if(errorCount <= 2) {
            console.log('✊就差一点了，加油修复吧！')
        }else {
            console.log('👊这么多bug，你是要上天吗！')
        }
        // process.exit(hasErrors ? 1 : 0);
    })

// 推送 git
program
    .command('commit [commitText]')
    .option('-p, --push', '提交并推送')
    .description('📤提交Github')
    .action(async (commitText, options) => {
        const pushLoading = ora('🤖正在推送...')
        // coolbo commit -p
        if(!commitText && options.push) {
            pushLoading.start()
            execSync('git push', { stdio: 'inherit' });
            pushLoading.succeed('💎推送 Git 成功！')
        }else {
            // coolbo commit 'test'
            if(!commitText) {
                const { text } = await inquirer.prompt({
                    type: 'input',
                    name: 'text',
                    message: '请输入提交信息'
                })
                commitText = text
            }
            execSync('git add .', { stdio: 'inherit' });
            execSync(`git commit -m "${commitText}"`, { stdio: 'inherit' });
            console.log('🔭提交成功！使用 coolbo commit -p 进行推送！')
            // coolbo commit 'test' -p
            if(options.push) {
                pushLoading.start()
                execSync('git push', { stdio: 'inherit' });
                pushLoading.succeed('💎推送 Git 成功！')            }
        }
    })
// 解析用户执行命令传入参数
program.parse(process.argv)