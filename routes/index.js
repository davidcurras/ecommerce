const filter = require('./filter')
const user = require('./user')
const general = require('./general')
const category = require('./category')
const static = require('./static')
const product = require('./product')

module.exports = [].concat(filter, general, product, user, static, category)
