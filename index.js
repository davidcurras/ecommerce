const hapi = require('hapi')
const inert = require('inert')
const routes = require('./routes')

const server = new hapi.Server()

server.connection({
  host: 'localhost',
  port: 8000
})

server.register(inert, (err) => {
  if (err) throw err
  server.route(routes)
})

server.start((err) => {
  if(err) throw err
  console.log('Started at ' + server.info.uri)
})
