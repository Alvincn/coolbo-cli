const downloadGitRepo = require('download-git-repo')
const ora = require('ora') // 引入ora
const loading = ora('🤖 正在下载模版...')
const downloadTemplate = async (repo, dest, name) => {
  loading.start()
  downloadGitRepo(repo, dest, {}, (err) => {
    if (err) {
      loading.fail('创建模版失败：' + err.message) // 失败loading
    } else {
      loading.succeed('🎖️ 创建模版成功!') // 成功loading
      console.log('Continue:')
      console.log('1.cd ' + name)
      console.log('2.npm install')
      console.log('3.npm run dev ')
    }
  })
}

module.exports = {
  downloadTemplate,
}
