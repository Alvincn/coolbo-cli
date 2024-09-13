const axios = require('axios')
const getAllTemplates = async (username) => {
    let result = await axios.get(`https://api.github.com/users/${username}/repos`)
    return result.data.map(item => {
        return {
            name: item.name,
            value: `https://github.com:${username}/${item.name}`
        }
    })
}
module.exports = {
    getAllTemplates
}