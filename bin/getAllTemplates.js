const axios = require('axios')
const getAllTemplates = async (username) => {
  let result = await axios.get(`https://api.github.com/users/${username}/repos`)
  return result.data.map(item => {
    return {
      name: item.name,
      value: `https://github.com:${username}/${item.name}`,
    }
  })
}
// eslint-disable-next-line no-undef
module.exports = {
  getAllTemplates,
}
