const hapi = require('hapi')
const data = require('./data')

var server = new hapi.Server()

server.connection({
  host: 'localhost',
  port: 8000
})

server.route({
  method: 'GET',
  path: '/user',
  handler: (request, reply) => {
    reply(data.users)
  }
})
