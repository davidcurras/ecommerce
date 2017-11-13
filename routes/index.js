const user = require('./user')
const general = require('./general')
const static = require('./static')

module.exports = [].concat(user, general, static)
