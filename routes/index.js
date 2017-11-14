const filter = require('./filter')
const user = require('./user')
const general = require('./general')
const category = require('./category')
const order = require('./order')
const static = require('./static')
const product = require('./product')


module.exports = [].concat(filter, user, general, category, order, static, product)
