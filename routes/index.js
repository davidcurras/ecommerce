const filter = require('./filter')
const user = require('./user')
const general = require('./general')
const category = require('./category')
const static = require('./static')

module.exports = [].concat(filter, general, user, static, category)
