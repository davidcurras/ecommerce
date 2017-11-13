const _ = require('lodash')
const data = require('../data')

const routes = [
  {
    method: 'GET',
    path: '/general',
    handler: (request, reply) => {
      console.log('GET /general')
      reply(data.generals)
    }
  }
]

module.exports = routes
