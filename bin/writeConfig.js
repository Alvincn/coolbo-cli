const fs = require('fs-extra')
const writeConfig = async (username) => {
    try {
        await fs.writeJsonSync(__dirname + '/config/config.json', {
            username: username
        })
        if(username === 'coolbo-cn') {
            console.log('🎖️重置成功！当前 Git 用户为：coolbo-cn')
        }else {
            console.log('🎖️配置成功！当前 Git 用户为：' + username)
        }
    } catch(err) {
        console.log('❌配置失败')
    }
}

const getConfigFromFile = async () => {
    try {
        return await fs.readJsonSync(__dirname + '/config/config.json')
    }catch (err) {
        return {
            username: 'coolbo-cn'
        }
    }

}

module.exports = {
    writeConfig,
    getConfigFromFile
}
